const mongoose = require('mongoose')
const Schema = mongoose.Schema
const divingSchema = new Schema({
  date:{
    type: String,
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
    required: true
  },
  weather: {
    type: String
  },
  surfaceTemp: {
    type: String
  },
  underwaterTemp: {
    type: String
  },
  divingTime: {
    type: String,
    default: 40
  },
  maxDepth: {
    type: String
  },
  residualPressure: {
    type: String,
    default: 50
  },
  visibility: {
    type: String
  },
  image: {
    type: String
  },
  note: {
    type:String
  }
})

module.exports = mongoose.model('Diving', divingSchema)