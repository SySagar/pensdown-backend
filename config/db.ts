import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DBConnect = async () => {
    try {
      const connection = await mongoose.connect(`${process.env.DATABASE_URL}`);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

export default DBConnect;