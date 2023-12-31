const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended:true })) 

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('hbs', exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set('view engine','hbs')

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
 }))
app.use(methodOverride('_method'))
usePassport(app)

app.use(flash())
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user   //req.user是反序列化取出的user資訊
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)



app.listen( port, () => {
  console.log(`App is running on  http://localhost:${port}`)
})