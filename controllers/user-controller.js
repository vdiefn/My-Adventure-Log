const User = require('../models/user')


const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
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
      .catch(err => console.log(err))
    })
  }
  

}


module.exports = userController