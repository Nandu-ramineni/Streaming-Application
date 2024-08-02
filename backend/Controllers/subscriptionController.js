import Subscription from "../Models/Subscription.js";
import User from "../Models/User.js";
import { generateInvoice } from "./invoiceController.js";

const calculateAmount = (plan, duration) => {
    const amounts = {
        Basic: { Monthly: 99, Quarterly: 299, Yearly: 499 },
        Flex: { Monthly: 150, Quarterly: 499, Yearly: 799 },
        Premium: { Monthly: 299, Quarterly: 699, Yearly: 1299 },
    };
    return amounts[plan][duration];
};

export const buySubscription = async (req, res) => {
    const { user, plan, duration, startDate, endDate, isActive, paymentId, paymentStatus } = req.body;
    try {
        const existingSubscription = await Subscription.findOne({ user });
        if (existingSubscription) {
            return res.status(400).json({ message: 'User already has a subscription' });
        }
        const amount = calculateAmount(plan, duration);
        const newSubscription = new Subscription({ user, plan, duration, amount, startDate, endDate, isActive, paymentId, paymentStatus });
        await newSubscription.save();
        const updatedUser = await User.findByIdAndUpdate(user, { subscription: newSubscription._id }, { new: true });

        if (paymentStatus === 'success') {
            generateInvoice(newSubscription, updatedUser, res);
        }
        
        res.status(201).json({ message: "Your Subscription is Active", newSubscription });
    } catch (error) {
        console.error('Error buying subscription:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
export const getSubscriptions = async (req, res) => {
    try {
        const subs = await Subscription.find().populate('user', 'username email');
        res.status(200).json({ subs });
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const getSubscriptionByUser = async (req, res) => {
    const { user } = req.params;
    try {
        const sub = await Subscription.findOne({ user });
        if (!sub) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({ sub });
    } catch (error) {
        console.error('Error fetching subscription by user:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const updateSubscription = async (req, res) => {
    const { user } = req.params;
    const { plan, duration, startDate, endDate, isActive } = req.body;
    try {
        const sub = await Subscription.findOne({ user });
        if (!sub) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const amount = calculateAmount(plan, duration);
        const updatedSub = await Subscription.findByIdAndUpdate(sub._id, { plan, duration, amount, startDate, endDate, isActive }, { new: true });

        res.status(200).json({ message: 'Subscription updated successfully', updatedSub });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const updatePaymentDetails = async (req, res) => {
    const { id } = req.params;
    const { paymentId, paymentStatus } = req.body;
    try {
        const sub = await Subscription.findById(id);
        if (!sub) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        sub.paymentId = paymentId;
        sub.paymentStatus = paymentStatus;
        await sub.save();
        if (paymentStatus === 'success') {
            const updatedUser = await User.findByIdAndUpdate(sub.user, { subscription: sub._id }, { new: true });
            generateInvoice(sub, updatedUser, res);
        }
        
        res.status(200).json({ message: 'Payment details updated successfully', updatedSub: sub });
    } catch (error) {
        console.error('Error updating payment details:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};


