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
  },
  editPage: (req, res) => {
    const id = req.params.id
    Diving.findById(id)
      .lean()
      .then(dive => {
        res.render('edit', { dive })
      })
      .catch(err => console.log(err))
  },

  putDive: (req, res) => {
    const { date, subject, location, divingType, weather, surfaceTemp, underwaterTemp, divingTime, maxDepth, residualPressure, visibility, note } = req.body
    const { file } = req
    if (!date) throw new Error('請填上日期！')
    if (!location) throw new Error('請加入潛水地點！')
    const id = req.params.id
    Promise.all([
      Diving.findById(id),
      localFileHandler(file)
    ])
      .then(([dive, filePath]) => {
        dive.date = date
        dive.subject = subject
        dive.location = location
        dive.divingType = divingType
        dive.weather = weather
        dive.surfaceTemp = surfaceTemp
        dive.underwaterTemp = underwaterTemp
        dive.divingTime = divingTime
        dive.maxDepth = maxDepth
        dive.residualPressure = residualPressure
        dive.visibility = visibility
        dive.note = note
        dive.image = filePath || dive.image
        console.log(dive)
        return dive.save()
        
      })
      .then(() => res.redirect(`/dives/${id}`))
      .catch(err => console.log(err))
  },
    deleteDive: (req, res) => {
    const id = req.params.id
    return Diving.findById(id)
      .then(dive => {
      if (!dive) throw new Error("This record doesn't exist!")
      dive.deleteOne()
      })
    .then(() => res.redirect('/dives'))
    .catch(err => console.log(err))
  }
}

module.exports = divingController