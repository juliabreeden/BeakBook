const express = require('express');
const router = express.Router();
const User = require('../userModel')

router.post('/home', (req, res) => {
    console.log('good sign up route running');
    const username = req.body.username;
    const password = req.body.password;
    const _id = req.body._id;
    const newUser = new User({
        username,
        password,
        _id,
    });
    newUser.save();
    res.status(200);
    res.redirect('/home');
})
module.exports = router;