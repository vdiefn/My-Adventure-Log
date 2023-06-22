const express = require('express')
const router = express.Router()
const divingController = require('../controllers/diving-controller')

//新增紀錄
router.get('/dives/create', divingController.createPage)
router.post('/dives', divingController.createDiving)


// 瀏覽全部紀錄
router.get('/dives', divingController.getDives)

router.get('/', (req, res) => res.redirect('/dives'))

module.exports = router

