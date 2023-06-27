const express = require('express');
const router = express.Router();
const User = require('../userModel');
const cookieParser = require('cookie-parser');

router.post('/home', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const _id = req.body._id;
  const newUser = new User({
    username,
    password,
    _id,
  });
  newUser.save()
  .then(() => {
    console.log('User saved to the database');
  })
  .catch(error => {
    console.error('Error saving user:', error);
  });
  res.cookie('userId', user._id, { httpOnly: true });
  res.end(); // End the request without sending any response
});

module.exports = router;
