import express from 'express';
import { processPremiumPayment, getPremiumStatus } from '../controllers/PremiumPaymentController';

const router = express.Router();

router.post('/pay', processPremiumPayment);
router.get('/status/:userId', getPremiumStatus);

export default router;
