const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    validate: {
      validator: async val => {
        const model = await mongoose.model('User', userSchema).findOne({username: val});
        return Promise.resolve(!model)
      },
      message: 'This username have already been taken',
    }
  },
  firstname: {
    type: String,
    required: 'Firstname is required',
    minlength: 1
  },
  lastname: {
    type: String,
    required: 'Lastname is required',
    minlength: 1
  },
  email: {
    type: String,
    validate: {
      validator: async val => {
        const model = await mongoose.model('User', userSchema).findOne({email: val});
        return Promise.resolve(!model)
      },
      message: 'This email have already been taken'
    }
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  last_seen: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;