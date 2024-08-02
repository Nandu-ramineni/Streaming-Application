import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from 'dotenv';

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);

export const userRegister = async(req,res) => {
    const {username,email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "User registered successfully", user: newUser, token });
    } catch (error) {
        res.status(500).json({message: "Something went wrong",message:error.message})
    }
}

export const userLogin = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: 'Invalid email'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({message: 'Invalid password'});
        }
        const token = jwt.sign({email: user.email, id: user._id}, process.env.jwt_secret, {expiresIn: '1h'});
        res.status(200).json({message:"Login Successful", user, token});
    } catch (error) {
        
    }
}

export const getUsers = async(req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message: "Something went wrong",message:error.message})
    }
}

export const getUserById = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Something went wrong",message:error.message})
    }
}

export const deleteUserById = async(req,res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong",message:error.message})
    }
}

export const updateUserById = async(req,res) => {
    const id = req.params.id;
    const {phoneNumber} = req.body;
    try {
        const user = await User.findById(id);
        user.phoneNumber = phoneNumber;
        const image = req.file ? req.file.filename : undefined;
        if(image){
            user.image = image;
        }
        await user.save();
        res.status(200).json({message: "User updated successfully", user});
    } catch (error) {
        res.status(500).json({message: "Something went wrong",message:error.message})
    }
}
export const sendOtp = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to: `+91 ${phoneNumber}`, channel: 'sms' });
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    try {
        const verification_check = await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: `+${phoneNumber}`, code: otp });
        if (verification_check.status === 'approved') {
            res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to verify OTP", error: error.message });
    }
};
