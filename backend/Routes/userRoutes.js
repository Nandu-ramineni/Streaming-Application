import express from 'express';
import { deleteUserById, getUserById, getUsers, sendOtp, updateUserById, userLogin, userRegister, verifyOtp } from '../Controllers/userController.js';
import multer from 'multer';
import path from 'path';
const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage });

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/get',getUsers);
router.get('/get/:id',getUserById);
router.put('/update/:id',upload.single('image'),updateUserById);
router.delete('/delete/:id',deleteUserById);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..',imageName));
})
export default router;