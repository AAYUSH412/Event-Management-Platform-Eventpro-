import express from 'express';
import {
  getPaymentDetails,
  createPayment,
  verifyPayment,
  getPaymentStatus
} from '../controllers/paymentController.js';

const router = express.Router();

router.get('/:ticketId', getPaymentDetails);
router.post('/create/:ticketId', createPayment);
router.post('/verify', verifyPayment);
router.get('/status/:ticketId', getPaymentStatus);

export default router;