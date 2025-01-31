import express from 'express';
import { 
  getTicketTypes, 
  createTicketType,
  updateTicketType 
} from '../controllers/ticketTypeController.js';

const router = express.Router();

router.get('/', getTicketTypes);
router.post('/', createTicketType);
router.put('/:id', updateTicketType);

export default router;