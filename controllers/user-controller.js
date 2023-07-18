const User = require('../models/user')
const bcrypt = require('bcryptjs')

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
      }
      if (emailCheck) {
        errors.push({ message: '此信箱已被註冊！'})  
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
      .then(() => res.redirect('/'))
      .catch(err => next(err))
    })
  },
  logout: (req, res, next) => {
    req.logout(function(err) {
      if(err) {return next(err) }
      req.flash('success_msg', '你已經成功登出了！')
      res.redirect('/login')
    })
    
  }
  

}


module.exports = userController