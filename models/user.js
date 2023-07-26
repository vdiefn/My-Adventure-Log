const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: "https://i.imgur.com/w3dssj0.png"
  },
  dateOfBirth: {
    type: String
  },
  issuedDate: {
    type: String
  },
  issuedLocation: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)