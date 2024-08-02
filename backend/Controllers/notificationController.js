import Notification from "../Models/Notifications.js";
import User from "../Models/User.js";
import Subscription from "../Models/Subscription.js";

export const createNotification = async (req, res) => {
    const { message, type } = req.body;
    try {
        const notification = new Notification({ message, type });
        ;
        let users;
        if (type === 'all') {
            users = await User.find();
        } else if (type === 'subscribed') {
            const subscriptions = await Subscription.find({ isActive: true }).populate('user');
            users = subscriptions.map(subscription => subscription.user);
        }
        const personalizedNotifications = users.map(user => {
            const personalizedMessage = message.replace('{username}', user.username);
            return new Notification({
                message: personalizedMessage,
                type,
                createdAt: new Date(),
            });
        });
        await notification.save() || await Notification.insertMany(personalizedNotifications);

        res.status(201).json({ message: 'Notification created and sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getFilteredNotifications = async (req, res) => {
    const { type } = req.query;
    try {
        const notifications = await Notification.find({ type });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};