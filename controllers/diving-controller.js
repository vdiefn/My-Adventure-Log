const Diving = require("../models/diving")

const divingController = {
  getDives: (req, res) => {
    return Diving.find()
    .lean()
    .then(dives => res.render('dives', { dives }))
    .catch(err => console.log(err))
  },
  createPage: (req, res) => {
    return res.render( 'create' )
  },
  createDiving: (req, res) => {
    const { date, subject, location, divingType, weather, surfaceTemp, underwaterTemp, divingTime, maxDepth, residualPressure, visibility, note } = req.body
    if ( !date ) throw new Error('請填上日期！')
    if ( !location ) throw new Error('請加入潛水地點！')
    Diving.create({
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
      note
    })
    .then(() => {
      
      res.redirect('/dives')
    })
    .catch(err => console.log(err))
  }
}

module.exports = divingController