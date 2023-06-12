const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login',( req,res ) => { 
  res.render('login')
})

router.post('/login',( req,res ) => {
})

router.get('/register',( req,res ) => { 
  res.render('register')
})

router.post('/register',( req,res ) => {
  console.log('post register')
  const { name,email,password,confirmPassword } = req.body
  console.log('req.body:',req.body)
  User.findOne({ email })
    .then(user => {
      if(user){ 
        console.log('這位使用者已經註冊過了')
        return res.render('register',{ name , email , password , confirmPassword })
      }
        return User.create({ name, email, password })
        .then(() => res.redirect('/users/login'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router