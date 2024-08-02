import express from 'express';
import { createNotification, getAllNotifications, getFilteredNotifications } from '../Controllers/notificationController.js';

const router= express.Router();

router.post('/create', createNotification);
router.get('/all',  getAllNotifications);
router.get('/filter',  getFilteredNotifications);

export default router;