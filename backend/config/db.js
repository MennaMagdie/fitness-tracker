const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/fitness-tracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code
    });
    process.exit(1);
  }
};

module.exports = connectDB; 