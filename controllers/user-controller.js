const User = require('../models/user')


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
      if (nameCheck) throw new Error ('此名稱已被使用！')
      if (emailCheck) throw new Error ('此信箱已被註冊！')
      if ( password !== passwordCheck) throw new Error ('密碼和確認密碼不一致！')
      return User.create({
        name,
        email,
        password
      })
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