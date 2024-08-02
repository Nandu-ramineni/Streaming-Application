import mongoose from 'mongoose';

const watchSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    watched:{
        type: Boolean,
        default: false
    }
})

const Watchlist = mongoose.model('Watchlist', watchSchema);
export default Watchlist;