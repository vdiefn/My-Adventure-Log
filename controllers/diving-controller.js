const { localFileHandler } = require("../helpers/file-helpers")
const Diving = require("../models/diving")
const divingCountCalculator = require('../divingCountCalculator')


const divingController = {
  getDives: (req, res, next) => {
    const userId = req.user._id
    return Diving.find({ userId })
    .lean()
    .sort({ _id: 'asc'})
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
    const userId = req.user._id
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
      image: filePath || null,
      userId
    }))
    .then(() => {
      
      res.redirect('/dives')
    })
    .catch(err => console.log(err))
  },
  getDive: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Diving.findOne({ _id, userId })
      .lean()
      .then(dive => {
        if (!dive) throw new Error("該筆資料不存在！")
        res.render('dive', { dive })
      })
      .catch(err => console.log(err))
  },
  editPage: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Diving.findOne({ _id, userId })
      .lean()
      .then(dive => {
        res.render('edit', { dive })
      })
      .catch(err => console.log(err))
  },

  putDive: (req, res) => {
    const userId = req.user._id
    const { date, subject, location, divingType, weather, surfaceTemp, underwaterTemp, divingTime, maxDepth, residualPressure, visibility, note } = req.body
    const { file } = req
    if (!date) throw new Error('請填上日期！')
    if (!location) throw new Error('請加入潛水地點！')
    const _id = req.params.id
    Promise.all([
      Diving.findOne({ _id, userId }),
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
        return dive.save()
        
      })
      .then(() => res.redirect(`/dives/${_id}`))
      .catch(err => console.log(err))
  },
    deleteDive: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Diving.findOne({ _id, userId })
      .then(dive => {
      if (!dive) throw new Error("該筆資料不存在！")
      dive.deleteOne()
      })
    .then(() => res.redirect('/dives'))
    .catch(err => console.log(err))
  }
}

module.exports = divingController