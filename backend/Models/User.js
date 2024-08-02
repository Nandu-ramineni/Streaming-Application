import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
    },
    image:{
        type: String,
    },
    subscription:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        default: null
    },
    watchList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
}, {timestamps: true});


const User = mongoose.model('User', userSchema);
export default User;