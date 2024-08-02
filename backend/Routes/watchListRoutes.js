import express from 'express';
import { addToWatchlist, getWatchlistByUser, deleteWatchListById } from '../Controllers/watchlistController.js';

const router = express.Router();

router.post('/add', addToWatchlist);
router.get('/get/:id', getWatchlistByUser);
router.post('/delete', deleteWatchListById); 

export default router;
