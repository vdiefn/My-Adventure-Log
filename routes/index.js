const express = require('express')
const router = express.Router()
const divingController = require('../controllers/diving-controller')
const upload = require('../middleware/multer')

//新增紀錄
router.get('/dives/create', divingController.createPage)
router.post('/dives', upload.single('image'), divingController.createDiving)

// 瀏覽一筆資料
router.get('/dives/:id', divingController.getDive)


// 瀏覽全部紀錄
router.get('/dives', divingController.getDives)



router.get('/', (req, res) => res.redirect('/dives'))

module.exports = router

