import express from 'express';
import {  adminLogin, getMaintenanceMode, isMaintenanceMode } from '../Controllers/adminController.js';

const router = express.Router();

// router.post('/add',addAdmin);
router.post('/login',adminLogin);
router.post('/maintenance',isMaintenanceMode);
router.get('/isMaintenance',getMaintenanceMode);

export default router;