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
  },
  userId: { // 關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  } 
})

module.exports = mongoose.model('Diving', divingSchema)