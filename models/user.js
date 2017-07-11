const mongoose = require('mongoose');
const config = require('../config/db');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  }
});

const User = module.exports = mongoose.model('user', UserSchema);
