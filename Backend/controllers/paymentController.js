import Ticket from '../models/Ticket.js';
import Payment from '../models/Payment.js';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Get payment details
export const getPaymentDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;
    
    const ticket = await Ticket.findById(ticketId)
      .populate('eventId')
      .select('eventId tickets totalAmount paymentStatus');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const paymentDetails = {
      eventTitle: ticket.eventId.title,
      eventDate: ticket.eventId.date,
      eventLocation: ticket.eventId.location,
      tickets: ticket.tickets.map(t => ({
        type: t.type,
        quantity: t.quantity,
        seatNumbers: t.seatNumbers,
        price: t.price
      })),
      totalAmount: ticket.totalAmount,
      paymentStatus: ticket.paymentStatus
    };

    res.json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create payment
export const createPayment = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId).populate('eventId');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const options = {
      amount: ticket.totalAmount * 100,
      currency: 'INR',
      receipt: ticketId,
      notes: {
        eventTitle: ticket.eventId.title,
        eventDate: ticket.eventId.date,
        ticketTypes: ticket.tickets.map(t => t.type).join(', ')
      }
    };

    const order = await razorpay.orders.create(options);
    
    // Create payment record
    await Payment.create({
      ticketId: ticket._id,
      orderId: order.id,
      amount: ticket.totalAmount,
      status: 'pending'
    });

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
    const crypto = await import('crypto');
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.default
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment record
      const payment = await Payment.findOne({ orderId: razorpay_order_id });
      if (payment) {
        payment.status = 'completed';
        payment.paymentId = razorpay_payment_id;
        payment.verifiedAt = new Date();
        await payment.save();
      }
      res.json({ status: 'success' });
    } else {
      // If payment verification fails, rollback the ticket booking
      const payment = await Payment.findOne({ orderId: razorpay_order_id });
      if (payment) {
        payment.status = 'failed';
        await payment.save();

        // Rollback ticket booking
        await fetch(
          `http://localhost:4000/api/tickets/${payment.ticketId}/rollback`,
          { method: 'DELETE' }
        );
      }
      res.json({ status: 'failed' });
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const payment = await Payment.findOne({ ticketId }).sort({ createdAt: -1 });
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      status: payment.status,
      amount: payment.amount,
      createdAt: payment.createdAt,
      verifiedAt: payment.verifiedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};