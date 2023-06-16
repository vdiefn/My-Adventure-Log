const mongoose = require('mongoose')
const Schema = mongoose.Schema
const divingSchema = new Schema({
  date:{
    type: Date,
    required: true
  },
  subject: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  divingType: {
    type: String,
  },
  weather: {
    type: String
  },
  surfaceTemp: {
    type: Number
  },
  underwaterTemp: {
    type: Number
  },
  divingTime: {
    type: Number
  },
  maxDepth: {
    type: Number
  },
  residualPressue: {
    type: Number
  },
  visibility: {
    type: Number
  },
  image: {
    type: String
  },
  note: {
    type:String
  }
})

module.exports = mongoose.model('Diving', divingSchema)