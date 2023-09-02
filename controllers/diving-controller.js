const { imgurFileHandler } = require("../helpers/file-helpers")
const Diving = require("../models/diving")
const divingCountCalculator = require('../divingCountCalculator')
const dayjs = require('dayjs')


const divingController = {
  getDives: (req, res, next) => {
    const userId = req.user._id
    const filterYear = req.query.filterYear

    if ( filterYear === '2023'){
      return Diving.find({ 
        userId,
        date: { $gte: new Date('2023-01-01'), $lte: new Date('2023-12-31')}
      })
      .lean()
        .sort({ date: 'desc' })
      .then(dives => {
        totalCount = divingCountCalculator(dives)
        return res.render('dives', { dives, totalCount })
      })
        .catch(err => next(err))
    } else if (filterYear === '2022'){
      return Diving.find({
        userId,
        date: { $gte: new Date('2022-01-01'), $lte: new Date('2022-12-31') }
      })
        .lean()
        .sort({ date: 'desc' })
        .then(dives => {
          totalCount = divingCountCalculator(dives)
          return res.render('dives', { dives, totalCount })
        })
        .catch(err => next(err))
    } else if (filterYear === '2021'){
      return Diving.find({
        userId,
        date: { $gte: new Date('2021-01-01'), $lte: new Date('2021-12-31') }
      })
        .lean()
        .sort({ date: 'desc' })
        .then(dives => {
          totalCount = divingCountCalculator(dives)
          return res.render('dives', { dives, totalCount })
        })
        .catch(err => next(err))
    }
    else {
      return Diving.find({
        userId,
      })
        .lean()
        .sort({ date: 'desc' })
        .then(dives => {
          totalCount = divingCountCalculator(dives)
          return res.render('dives', { dives, totalCount })
        })
        .catch(err => next(err))
    } 
  },
  createPage: (req, res) => {
    return res.render( 'create' )
  },
  createDiving: (req, res, next) => {
    const userId = req.user._id
    const { date, subject, location, divingType, weather, surfaceTemp, underwaterTemp, divingTime, maxDepth, residualPressure, visibility, note } = req.body
    const { file } = req
    if ( !date ) throw new Error('請填上日期！')
    if ( !location ) throw new Error('請加入潛水地點！')
    if ( !divingType ) throw new Error('請選擇潛水方式！')
    imgurFileHandler(file)
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
    .catch(err => next(err))
  },
  getDive: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.id
    Diving.findOne({ _id, userId })
      .lean()
      .then(dive => {
        if (!dive) throw new Error("該筆資料不存在！")
        res.render('dive', { dive })
      })
      .catch(err => next(err))
  },
  editPage: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.id
    Diving.findOne({ _id, userId })
      .lean()
      .then(dive => {
        res.render('edit', { dive })
      })
      .catch(err => next(err))
  },

  putDive: (req, res, next) => {
    const userId = req.user._id
    const { date, subject, location, divingType, weather, surfaceTemp, underwaterTemp, divingTime, maxDepth, residualPressure, visibility, note } = req.body
    const { file } = req
    if (!date) throw new Error('請填上日期！')
    if (!location) throw new Error('請加入潛水地點！')
    if (!divingType) throw new Error('請選擇潛水方式！')
    const _id = req.params.id
    Promise.all([
      Diving.findOne({ _id, userId }),
      imgurFileHandler(file)
    ])
      .then(([dive, filePath]) => {
        dive.date = date || dive.date
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
      .catch(err => next(err))
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
  },
  getStory: (req, res) => {
    const userId = req.user._id
    const filterYear = req.query.filterYear
    if (filterYear === '2023') {
      return Diving.find({
        userId,
        date: { $gte: new Date('2023-01-01'), $lte: new Date('2023-12-31') }
      })
        .lean()
        .then(dives => {
          return res.render('story', { dives })
        })
        .catch(err => next(err))
    } else if (filterYear === '2022') {
      return Diving.find({
        userId,
        date: { $gte: new Date('2022-01-01'), $lte: new Date('2022-12-31') }
      })
        .lean()
        .then(dives => {
          totalCount = divingCountCalculator(dives)
          return res.render('story', { dives })
        })
        .catch(err => next(err))
    } else if (filterYear === '2021') {
      return Diving.find({
        userId,
        date: { $gte: new Date('2021-01-01'), $lte: new Date('2021-12-31') }
      })
        .lean()
        .then(dives => {
          totalCount = divingCountCalculator(dives)
          return res.render('story', { dives })
        })
        .catch(err => next(err))
    } else {
      return Diving.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then(dives => {
          return res.render('story', { dives })
        })
        .catch(err => console.log(err))
      }    
    
  },
  searchDives: (req, res, next) => {
    const keyword = req.query.keyword
    return Diving.find()
      .lean()
      .then(dives => {
        const result = dives.filter(dive => {
          return dive.subject.toLowerCase().includes(keyword.toLowerCase()) ||
          dive.location.toLowerCase().includes(keyword.toLowerCase()) ||
          dive.divingType.toLowerCase().includes(keyword.toLowerCase())
        })
        totalCount = divingCountCalculator(result)
        res.render('dives', { dives: result, keyword, totalCount })
      })
      .catch(err => next(err))
  },
  searchStory: (req, res, next) => {
    const keyword = req.query.keyword
    return Diving.find()
      .lean()
      .then(dives => {
        const result = dives.filter(dive => {
          return dive.subject.toLowerCase().includes(keyword.toLowerCase()) ||
            dive.location.toLowerCase().includes(keyword.toLowerCase()) ||
            dive.divingType.toLowerCase().includes(keyword.toLowerCase())
        })
        res.render('story', { dives: result, keyword })
      })
      .catch(err => next(err))
  }    
}

module.exports = divingController