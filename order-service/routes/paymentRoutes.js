import express from 'express';
import { processPaymentController, processRefundController, getPaymentDetailsController } from '../controller/paymentController.js';

const router = express.Router();

router.post('/process', processPaymentController);
router.post('/refund', processRefundController);
router.get('/order/:orderId', getPaymentDetailsController);

export default router;
