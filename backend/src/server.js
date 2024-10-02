const express = require('express');
const cors = require('cors'); // Import the CORS module
const sequelize = require('./config/database'); // Ensure the path is correct
const userRoutes = require('./routes/userRoutes'); // Ensure the path is correct
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors()); // Allow all origins. You can restrict it later as needed.

// Middleware to parse JSON requests
app.use(express.json());

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Use user routes with /api prefix
app.use('/api', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
