const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { imgurFileHandler } = require('../helpers/file-helpers')
const Diving = require('../models/diving')
const divingCountCalculator = require('../divingCountCalculator')

const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: (req, res) => {
    res.redirect('/')
  },
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    const errors = []
    if (!name || !email || !password || !passwordCheck) {
      errors.push({ message: '所有欄位都是必填的！' })
    }  
    if ( password !== passwordCheck ) { 
      errors.push({ message: '密碼與確認密碼不相符！' })
    }  
    if (errors.length) {
      return res.render('register', { errors, name, email})
    }
    return Promise.all([
      User.findOne({ name }),
      User.findOne({ email })
    ])
    .then(([ nameCheck ,emailCheck]) => {
      if (nameCheck) {
        errors.push({ message: '此名稱已被註冊！' })
        return res.render('register', { errors, email })
      }
      if (emailCheck) {
        errors.push({ message: '此信箱已被註冊！'})
        return res.render('register', { errors, name })  
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
      .then(() => res.redirect('/login'))
      .catch(err => next(err))
    })
  },
  logout: (req, res, next) => {
    req.logout(function(err) {
      if(err) {return next(err) }
      req.flash('success_msg', '你已經成功登出了！')
      res.redirect('/login')
    })
  },
  getSettingPage: async (req, res, next) => {
    const id = req.user._id
    return Promise.all([
      Diving.find({ 'userId': id }),
      User.findById(id)
    ])
      .then(([dives, user]) => {
        const totalCount = divingCountCalculator(dives)
        res.render('setting', { user: user.toJSON(), totalCount })
      })

      .catch(err => next(err))
  },
  editSettingPage: (req, res, next) => {
    const id = req.user._id
    return User.findById(id)
      .lean()
      .then((user) => res.render('editSetting', { user }))
      .catch(err => console.log(err))
  },
  editSetting: (req, res, next) => {
    const id = req.user._id

    const { name, email, password, passwordCheck, dateOfBirth, issuedDate, issuedLocation } = req.body
    const { file } = req
    if (!name) throw new Error('名稱為必填欄位！')
    if (!email) throw new Error('Email為必填欄位！')
    if (password !== passwordCheck) throw new Error('密碼和確認密碼不相符！')

    Promise.all([
      imgurFileHandler(file),
      User.findById(id),
      User.findOne({ email: email }),
      User.findOne({ name:name })
    ])
      .then(async([ filePath, user, emailCheck, nameCheck]) => {
        if (emailCheck && emailCheck._id.toString() !== id.toString()) throw new Error('此信箱已被註冊！')
        if (nameCheck && nameCheck._id.toString() !== id.toString()) throw new Error('此名稱已被使用！')
        user.name = name
        user.email = email
        user.password = await bcrypt.hash(password, 10) || user.password
        user.image = filePath || user.image
        user.dateOfBirth = dateOfBirth || user.dateOfBirth
        user.issuedDate = issuedDate || user.issuedDate
        user.issuedLocation = issuedLocation || user.issuedLocation
        return user.save()
      })
      .then(() => {
        req.flash('success_msg', '已成功更新使用者資訊！')
        res.redirect(`/users/${id}`)
      })
    .catch(err => next(err))
  }
  

}


module.exports = userController