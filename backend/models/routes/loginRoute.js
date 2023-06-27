const express = require('express');
const router = express.Router();
const User = require('../userModel');
const cookieParser = require('cookie-parser');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username and password
    const user = await User.findOne({ username, password });

    if (user) {
      console.log('users cookie is:', user._id);
      // If the user is found, send a success response
      res.cookie('testCookie', 'testValue');
      res.cookie('userId', user._id, { httpOnly: true });
      res.status(200).json({ message: 'Login successful!' });
    } else {
      // If the user is not found, send an error response
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Server error!' });
  }
});

module.exports = router;
