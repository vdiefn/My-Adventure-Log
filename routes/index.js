const express = require('express')
const router = express.Router()
const divingController = require('../controllers/diving-controller')
const userController = require('../controllers/user-controller')
const upload = require('../middleware/multer')


// 修改資料
router.get('/dives/:id/edit', divingController.editPage)
router.put('/dives/:id', upload.single('image'), divingController.putDive)

//新增紀錄
router.get('/dives/create', divingController.createPage)
router.post('/dives', upload.single('image'), divingController.createDiving)

// 瀏覽一筆資料
router.get('/dives/:id', divingController.getDive)

// 刪除一筆資料
router.delete('/dives/:id', divingController.deleteDive)

// 瀏覽全部紀錄
router.get('/dives', divingController.getDives)

// 登入
router.get('/login', userController.loginPage)

// 註冊
router.get('/register', userController.registerPage)

router.get('/', (req, res) => res.redirect('/dives'))

module.exports = router

