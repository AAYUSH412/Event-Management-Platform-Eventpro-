import Event from '../models/Event.js';
import { imagekit } from '../middleware/upload.js';

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const file = req.file;
    const { 
      title, 
      description, 
      date, 
      time, 
      location, 
      price, 
      category, 
      availableSeats 
    } = req.body;

    // Upload image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file.buffer.toString('base64'),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: '/events'
    });

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      price: Number(price),
      image: uploadResponse.url,
      imageId: uploadResponse.fileId,
      category,
      availableSeats: Number(availableSeats)
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    let imageData = { image: event.image, imageId: event.imageId };

    if (req.file) {
      // Delete old image
      await imagekit.deleteFile(event.imageId);

      // Upload new image
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: '/events'
      });

      imageData = {
        image: uploadResponse.url,
        imageId: uploadResponse.fileId
      };
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...imageData },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete image from ImageKit
    await imagekit.deleteFile(event.imageId);
    await event.remove();

    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};