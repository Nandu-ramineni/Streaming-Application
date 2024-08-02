import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const RazorpayInstance = async (req, res) => {
    try {
        const { amount, orderId } = req.body;
        const options = {
            amount: amount * 100, 
            currency: 'INR',
            receipt: orderId,
            payment_capture: 1,
        };
        const order = await razorpayInstance.orders.create(options);
        if (!order) {
            return res.status(500).json({ message: 'Some error occurred while creating order' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: error.message });
    }
};

export const RazorpayResponse = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = hmac.digest('hex');
        if (digest !== razorpay_signature) {
            return res.status(403).json({ status: 'failure', message: 'Transaction is not legit!' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Transaction is valid',
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: error.message });
    }
};
