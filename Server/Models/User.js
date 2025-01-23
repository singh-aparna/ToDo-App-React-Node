const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    username: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true }
}))

module.exports = User;