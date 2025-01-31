import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eventlist',
    required: true
  },
  tickets: [{
    type: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    seatNumbers: [{
      type: String,
      required: true
    }]
  }],
  totalAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;