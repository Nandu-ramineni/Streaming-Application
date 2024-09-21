import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './Database/db.js';
import cors from 'cors';
import UserRoutes from './Routes/userRoutes.js';
import videoRoutes from './Routes/videoRoutes.js';
import SubscriptionRoutes from './Routes/subscriptionRoutes.js';
import bodyParser from 'body-parser';
import AdminRoutes from './Routes/adminRoutes.js';
import WatchRoutes from './Routes/watchListRoutes.js';
import NotifyRoutes from './Routes/notificationsRoutes.js';
import PaymentRoutes from './Routes/paymentRoutes.js';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user',UserRoutes);
app.use('/video',videoRoutes);
app.use('/subscription',SubscriptionRoutes);
app.use('/admin',AdminRoutes);
app.use('/watchlist',WatchRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/notifications', NotifyRoutes);
app.use('/payments', PaymentRoutes);
const PORT = process.env.PORT || 7000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.DB_URL || `mongodb+srv://${USERNAME}:${PASSWORD}@stream.4clxkvo.mongodb.net/?retryWrites=true&w=majority&appName=Stream`;
dbConnection(URL);
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});