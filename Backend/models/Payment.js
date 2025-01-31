import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: String,
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  verifiedAt: Date
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;