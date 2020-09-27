const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    registerDate: {type: Date, required: true},
    address: { type: String, default: false },
    otp: { type: String, required: false }
  });

module.exports = mongoose.model('users', User)
