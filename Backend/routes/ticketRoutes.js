import express from 'express';
import { 
  createTicket, 
  getTickets, 
  getTicketById, 
  createOrder,
  verifyPayment,
  rollbackTicketBooking
} from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/:ticketId/order', createOrder);
router.post('/verify', verifyPayment);
router.delete('/:ticketId/rollback', rollbackTicketBooking); // Add this route

export default router;