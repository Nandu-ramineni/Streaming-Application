import express from 'express';
import multer from 'multer';
import { getVideoById, getVideoController,  uploadVideoController } from '../Controllers/videoController.js';


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadVideoController);
router.get('/stream',getVideoController);
router.get('/stream/:id',getVideoById);
// router.get('/stream/:fileName', streamVideoController);
router.get('/uploads/:videoName',(req,res)=>{
    const videoName = req.params.videoName;
    res.headersSent('Content-Type','video/mp4');
    res.sendFile(path.join(__dirname,'..','uploads',videoName));
})
export default router;
