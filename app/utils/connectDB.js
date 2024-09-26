import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log('Database already connected.');
    return;
  }
  try {
    const mongoURI = process.env.MONGOURI;
    console.log('Connecting to:', mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log the current database name
    console.log('Connected to database:', mongoose.connection.name);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

export default connectDB;
