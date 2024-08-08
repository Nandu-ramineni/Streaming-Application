import express from 'express';
import { buySubscription, getSubscriptionByUser, getSubscriptions, updatePaymentDetails, updateSubscription } from '../Controllers/subscriptionController.js';
import { downloadInvoice } from '../Controllers/invoiceController.js';
import { verifyToken } from '../Middleware/VerifyToken.js';

const router = express.Router();


router.post('/buy',verifyToken,buySubscription);
router.get('/get',getSubscriptions);
router.get('/get/:user',verifyToken,getSubscriptionByUser);
router.patch('/update/:user',updateSubscription);
router.put('/updateStatus/:id',updatePaymentDetails);
router.get('/downloadInvoice/:subscriptionId', downloadInvoice);

export default router;