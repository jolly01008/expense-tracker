const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new' , (req,res)=>{
  return Category.find()
    .lean()
    .then(categories => res.render('new' , { categories }))
    .catch(err => console.log(err))
})

router.post('/new' , (req,res)=>{
  // const record = req.body
  // console.log('record:',record)
  // Record.create({...record})
  //   .then(() => res.redirect('/'))
  //   .catch(err = console.log(err))
  console.log('req:',req)
  const userId = req.user._id
  const record = req.body
  console.log(req.body)
  return Record.create({...record , userId})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


router.get('/edit' , (req,res)=>{
  res.render('edit')
})

module.exports = router