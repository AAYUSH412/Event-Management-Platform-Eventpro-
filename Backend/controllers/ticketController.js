import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';
import TicketType from '../models/TicketType.js';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


const getExistingSeats = async (eventId, ticketType) => {
  const existingTickets = await Ticket.find({ 
    eventId,
    'tickets.type': ticketType 
  });

  return existingTickets.flatMap(ticket => 
    ticket.tickets
      .filter(t => t.type === ticketType)
      .flatMap(t => t.seatNumbers)
  );
};

// Helper function to generate next available seat numbers
const generateSeatNumbers = (existingSeats, type, quantity) => {
  const seatNumbers = [];
  let seatCounter = 1;

  while (seatNumbers.length < quantity) {
    const seatNumber = `${type.toUpperCase()}-${seatCounter}`;
    if (!existingSeats.includes(seatNumber)) {
      seatNumbers.push(seatNumber);
    }
    seatCounter++;
  }

  return seatNumbers;
};

export const createTicket = async (req, res) => {
  try {
    const { userId, eventId, tickets, totalAmount } = req.body;

    // Verify event exists and has enough seats
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // First check ticket type availability
    for (const ticket of tickets) {
      const ticketType = await TicketType.findOne({ 
        eventId: eventId,
        type: ticket.type 
      });

      if (!ticketType) {
        return res.status(404).json({ 
          message: `Ticket type ${ticket.type} not found` 
        });
      }

      if (ticketType.availableQuantity < ticket.quantity) {
        return res.status(400).json({ 
          message: `Not enough ${ticket.type} tickets available` 
        });
      }
    }

    // Update ticket type quantities and generate seat numbers
    const ticketsWithSeats = await Promise.all(tickets.map(async (ticket) => {
      // Update ticket type availability
      const ticketType = await TicketType.findOne({ 
        eventId: eventId,
        type: ticket.type 
      });

      // Get existing seat numbers for this ticket type
      const existingSeats = await getExistingSeats(eventId, ticket.type);
      
      // Generate new seat numbers avoiding existing ones
      const seatNumbers = generateSeatNumbers(existingSeats, ticket.type, ticket.quantity);

      // Decrease available quantity
      ticketType.availableQuantity -= ticket.quantity;
      await ticketType.save();

      return {
        ...ticket,
        seatNumbers
      };
    }));

    // Create ticket booking
    const ticketDoc = await Ticket.create({
      userId,
      eventId,
      tickets: ticketsWithSeats,
      totalAmount
    });

    // Update event's available seats
    const totalTickets = tickets.reduce((sum, t) => sum + t.quantity, 0);
    event.availableSeats -= totalTickets;
    await event.save();

    await ticketDoc.populate('eventId');
    res.status(201).json(ticketDoc);

  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Add a rollback function for failed payments
export const rollbackTicketBooking = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Restore ticket type quantities
    for (const bookedTicket of ticket.tickets) {
      const ticketType = await TicketType.findOne({
        eventId: ticket.eventId,
        type: bookedTicket.type
      });

      if (ticketType) {
        ticketType.availableQuantity += bookedTicket.quantity;
        await ticketType.save();
      }
    }

    // Restore event seats
    const event = await Event.findById(ticket.eventId);
    if (event) {
      const totalTickets = ticket.tickets.reduce((sum, t) => sum + t.quantity, 0);
      event.availableSeats += totalTickets;
      await event.save();
    }

    // Delete the ticket
    await ticket.remove();

    res.json({ message: 'Ticket booking rolled back successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tickets for a user
export const getTickets = async (req, res) => {
  try {
    const { userId } = req.query;
    const tickets = await Ticket.find({ userId })
                               .populate('eventId')
                               .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single ticket
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
                              .populate('eventId');
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { paymentStatus, paymentId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.paymentStatus = paymentStatus;
    ticket.paymentId = paymentId;

    // If payment is completed, update event seats
    if (paymentStatus === 'completed') {
      const event = await Event.findById(ticket.eventId);
      if (event) {
        const totalTickets = ticket.tickets.reduce((sum, t) => sum + t.quantity, 0);
        event.availableSeats -= totalTickets;
        await event.save();
      }
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Create order
export const createOrder = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId).populate('eventId');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const options = {
      amount: ticket.totalAmount * 100, // Convert to paisa
      currency: 'INR',
      receipt: ticketId,
    };

    const order = await razorpay.orders.create(options);
    ticket.razorpayOrderId = order.id;
    await ticket.save();

    res.json({
      orderId: order.id,
      amount: ticket.totalAmount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Update ticket status
      const ticket = await Ticket.findOne({ razorpayOrderId: razorpay_order_id });
      if (ticket) {
        ticket.paymentStatus = 'completed';
        ticket.razorpayPaymentId = razorpay_payment_id;
        await ticket.save();

        // Update event seats
        const event = await Event.findById(ticket.eventId);
        if (event) {
          const totalTickets = ticket.tickets.reduce((sum, t) => sum + t.quantity, 0);
          event.availableSeats -= totalTickets;
          await event.save();
        }
      }
      res.json({ status: 'success' });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};