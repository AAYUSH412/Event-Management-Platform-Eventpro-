import mongoose from 'mongoose';

const ticketTypeSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eventlist',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  benefits: [String],
  availableQuantity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

ticketTypeSchema.index({ eventId: 1, type: 1 }, { unique: true });

const TicketType = mongoose.model('TicketType', ticketTypeSchema);
export default TicketType;