import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: String,
        enum: ['Basic', 'Flex', 'Premium'],
        required: true
    },
    duration: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Yearly'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    invoice: {
        data: Buffer, 
        contentType: String 
    },
    paymentId: {
        type: String
    },
    paymentStatus: {
        type: String
    }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
