import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['all', 'subscribed'],
        default: 'all',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
