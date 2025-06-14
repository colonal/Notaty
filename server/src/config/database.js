import mongoose from 'mongoose';
import { getEnvForce } from './env.js';


const connectDB = async () => {
    try {
        await mongoose.connect(getEnvForce('MONGO_URL'));
        console.log('Database connection established successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

export default connectDB; 