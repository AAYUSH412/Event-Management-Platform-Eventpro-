import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  imageId: { type: String, required: true },
  category: { type: String, required: true },
  availableSeats: { type: Number, required: true }
}, { timestamps: true });

const Event = mongoose.model('Eventlist', eventSchema);
export default Event;