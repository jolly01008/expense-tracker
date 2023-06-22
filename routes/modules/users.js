const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login',( req,res ) => { 
  res.render('login')
})

router.post('/login',passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

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
        return bcrypt
          .genSalt(10)
          .then(salt =>  bcrypt.hash(password , salt))
          .then(hash => User.create({
            name,
            email,
            password : hash
          }))
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router