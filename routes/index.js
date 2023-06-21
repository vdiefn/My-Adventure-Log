const express = require('express')
const router = express.Router()
const divingController = require('../controllers/diving-controller')

router.get('/dives', divingController.getDives)

router.get('/', (req, res) => res.redirect('/dives'))

module.exports = router

