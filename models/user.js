const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    minlength: [2, 'The Name field length should be minimum 2 symbols'],
    maxlength: [30, 'The Name field length should be maximum 30 symbols'],
  },
  about: {
    type: String,
    required: [true, 'The About field is required'],
    minlength: [2, 'The About field length should be minimum 2 symbols'],
    maxlength: [30, 'The About field length should be maximum 30 symbols'],
  },
  avatar: {
    type: String,
    required: [true, 'The Avatar field is required'],
  },
});

module.exports = mongoose.model('user', userSchema);
