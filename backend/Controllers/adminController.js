import Admin from "../Models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const addAdmin = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const admin = new Admin({ username });
//         const hashedPassword = await bcrypt.hash(password, 12);
//         admin.password = hashedPassword;
//         await admin.save();
//         res.status(201).json({ message: 'Admin added successfully'});
//     } catch (error) {
//         res.status(409).json({ error: error.message });
//     }
// }

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Username' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ adminId: admin._id }, process.env.jwt_secret, { expiresIn: "2h" });
        const adminId = admin._id;
        const userName = admin.username;
        return res.status(200).json({ message: "admin logged in successfully", token, adminId, username });
    } catch (error) {
        console.error("Error authenticating admin:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const isMaintenanceMode = async (req, res) => {
    const {maintenanceMode} = req.body;
    try {
        const admin = await Admin.findOne();
        admin.maintenanceMode = maintenanceMode;
        await admin.save();
        res.status(200).json({ message: 'Maintenance mode updated successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export const getMaintenanceMode = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        res.status(200).json({ maintenanceMode: admin.maintenanceMode });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}