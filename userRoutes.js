const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your .env file

// Validate JWT_SECRET is set
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in the .env file");
  process.exit(1); // Exit if the secret is missing
}

// Register a new user with hashed password
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Input validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword, role });
    
    // Respond with the newly created user (without password)
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ where: { email } });
      console.log('Logging in user:', email); // Log the email being used to log in

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
          { id: user.id, email: user.email }, 
          JWT_SECRET, 
          { expiresIn: '1h' }
      );

      res.json({ message: 'Login successful', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in user' });
  }
});



// Protect the profile route with middleware
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
      const user = await User.findByPk(req.user.id); // Fetch user by ID from decoded token
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Server error' });
  }
});



// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;
