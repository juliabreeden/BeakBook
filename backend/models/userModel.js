const mongoose = require('mongoose');

const userSchema = {
    username: String,
    password: String,
    _id: Number
}

const User = mongoose.model("User", userSchema);

module.exports = User;