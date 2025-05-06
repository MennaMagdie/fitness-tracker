const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const nutrition = require('./routes/nutrition');
const progress = require('./routes/progress');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const posts = require('./routes/posts');
const reminders = require('./routes/reminders');
const trainers = require('./routes/trainers');
const payments = require('./routes/payments');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/reminders', reminders);
app.use('/api/trainers', trainers);
app.use('/api/payments', payments);
app.use('/api/nutrition', nutrition);
app.use('/api/progress', progress);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 