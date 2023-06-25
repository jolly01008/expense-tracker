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

router.post('/new' , (req,res) => {
  console.log('req:',req)
  const userId = req.user._id
  const record = req.body
  console.log(req.body)
  return Record.create({...record , userId})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


router.get('/:id/edit' , (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  Category.find()
    .lean()
    .then((categories) => {
      return Record.findOne({ _id , userId })
        .populate('categoryId') //以'categoryIdy'欄位把Record跟Category資料庫關聯
        .lean()
        .then(record => {
          record.date = record.date.toISOString().slice(0 , 10)
          res.render('edit' , { record, categories })
        })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/:id' , (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = req.body
  console.log('edit record:',record)
  return Record.findOneAndUpdate({ _id , userId } , { ...record })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id' , (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOneAndDelete({ _id , userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router