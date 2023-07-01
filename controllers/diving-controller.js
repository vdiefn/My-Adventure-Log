const { localFileHandler } = require("../helpers/file-helpers")
const Diving = require("../models/diving")
const divingCountCalculator = require('../divingCountCalculator')


const divingController = {
  getDives: (req, res) => {
    return Diving.find()
    .lean()
    .then(dives => {
      totalCount = divingCountCalculator(dives)
      return res.render('dives', { dives, totalCount })
    })
    .catch(err => console.log(err))
  },
  createPage: (req, res) => {
    return res.render( 'create' )
  },
  createDiving: (req, res) => {
    const { date, subject, location, divingType, weather, surfaceTemp, underwaterTemp, divingTime, maxDepth, residualPressure, visibility, note } = req.body
    const { file } = req
    if ( !date ) throw new Error('請填上日期！')
    if ( !location ) throw new Error('請加入潛水地點！')
    localFileHandler(file)
      .then(filePath => Diving.create({
      date, 
      subject, 
      location, 
      divingType, 
      weather, 
      surfaceTemp, 
      underwaterTemp, 
      divingTime, 
      maxDepth, 
      residualPressure, 
      visibility, 
      note,
      image: filePath || null
    }))
    .then(() => {
      
      res.redirect('/dives')
    })
    .catch(err => console.log(err))
  },
  getDive: (req, res) => {
    const id = req.params.id
    Diving.findById(id)
      .lean()
      .then(dive => {
        if (!dive) throw new Error ("record didn't exist!")
        res.render('dive', { dive })
      })
      .catch(err => console.log(err))
  }
}

module.exports = divingController