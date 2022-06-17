const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'The length should be minimum 2 symbols'],
    maxlength: [30, 'The length should be maximum 30 symbols'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'The length should be minimum 2 symbols'],
    maxlength: [30, 'The length should be maximum 30 symbols'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
