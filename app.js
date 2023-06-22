const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended:true })) 

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('hbs', exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set('view engine','hbs')

app.use(session({
  secret:'ThisisMySecret',
  resave: false,
  saveUninitialized: true
 }))

usePassport(app)

app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user   //req.user是反序列化取出的user資訊
  next()
})

app.use(routes)



app.listen( port, () => {
  console.log(`App is running on  http://localhost:${port}`)
})