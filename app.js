const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const path = require('path')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URI)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.sESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use(methodOverride('_method'))
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)
app.use('/upload', express.static(path.join(__dirname, 'upload')))


const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})