import mongoose from 'mongoose';
import dotenv from 'dotenv';

const environmentFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({path: environmentFile});

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