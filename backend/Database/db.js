import mongoose from "mongoose";

export const dbConnection = async(URL) =>{
    try {
        await mongoose.connect(URL);
        console.log('Database connected');
    } catch (error) {
        console.log('Error while connecting to db:', error);
    }
}