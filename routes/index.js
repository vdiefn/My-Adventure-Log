const express = require('express')
const router = express.Router()
const divingController = require('../controllers/diving-controller')
const userController = require('../controllers/user-controller')
const upload = require('../middleware/multer')
const passport = require('passport')
const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')



// 修改資料
router.get('/dives/:id/edit', authenticator, divingController.editPage)
router.put('/dives/:id', authenticator, upload.single('image'), divingController.putDive)

// 新增紀錄
router.get('/dives/create', authenticator, divingController.createPage)
router.post('/dives', authenticator, upload.single('image'), divingController.createDiving)

// 瀏覽一筆資料
router.get('/dives/:id', authenticator, divingController.getDive)

// 刪除一筆資料
router.delete('/dives/:id', authenticator, divingController.deleteDive)

// 瀏覽全部紀錄
router.get('/dives', authenticator, divingController.getDives)

// 瀏覽動態
router.get('/story', authenticator, divingController.getStory)

// 設定頁
router.get('/users/:id', authenticator, userController.getSettingPage)

// 修改設定頁
router.get('/users/:id/edit', authenticator, userController.editSettingPage)
router.put('/users/:id', authenticator, upload.single('image'), userController.editSetting)


// 登入
router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }), userController.login)

// 註冊
router.get('/register', userController.registerPage)
router.post('/register', userController.register)

// 登出
router.get('/logout', userController.logout)

router.get('/', (req, res) => res.redirect('/dives'))

router.use('/', generalErrorHandler) 

module.exports = router

