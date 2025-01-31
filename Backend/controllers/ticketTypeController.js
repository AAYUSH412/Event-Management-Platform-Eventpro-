import TicketType from '../models/TicketType.js';
import Event from '../models/Event.js';

// Get ticket types for a specific event
export const getTicketTypes = async (req, res) => {
  try {
    const { eventId } = req.query;
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    const ticketTypes = await TicketType.find({ eventId });
    res.json(ticketTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create ticket types for an event
export const createTicketType = async (req, res) => {
  try {
    const { eventId, ticketTypes } = req.body;

    // Verify event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create ticket types
    const createdTypes = await Promise.all(
      ticketTypes.map(type => TicketType.create({
        ...type,
        eventId,
        availableQuantity: type.maxQuantity
      }))
    );

    res.status(201).json(createdTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update ticket type
export const updateTicketType = async (req, res) => {
  try {
    const ticketType = await TicketType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!ticketType) {
      return res.status(404).json({ message: 'Ticket type not found' });
    }
    
    res.json(ticketType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};