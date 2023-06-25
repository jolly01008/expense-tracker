const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/' , async (req,res) => {
  // Record.find({})
  //   .lean()
  //   .sort({ _id: 'desc' })
  //   .then(records => res.render('index' , { records }))
  //   .then(records =>console.log('records:' , records))
  //   .catch(err => console.log(err))
  const userId = req.user._id
  let totalAmount = 0
  return Category.find()
    .lean()
    .then((categories) => {
      console.log('幹嘛用這個categories:',categories)
      return Record.find({userId})
        .populate('categoryId')  //以categoryId欄位，把Record跟Category資料庫關聯
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach((record) => {
            record.date = record.date.toISOString().slice(0, 10)
            totalAmount += record.amount
          })
          return res.render('index' , { records,  totalAmount })
        })
        .catch(err => console.log(err))
    })
})


module.exports = router

