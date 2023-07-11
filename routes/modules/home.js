const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/' , async (req,res) => {

  const userId = req.user._id
  let totalAmount = 0
  return Category.find()
    .lean()
    .then((categories) => {
      return Record.find({userId})
        .populate('categoryId')  //以categoryId欄位，把Record跟Category資料庫關聯
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach((record) => {
            record.date = record.date.toISOString().slice(0, 10)
            totalAmount += record.amount
          })
          return res.render('index' , { records,  totalAmount ,categories})
        })
        .catch(err => console.log(err))
    })
})

// 下拉式選單按類別排序
router.post('/', (req, res) => {
  const userId = req.user._id
  const { categoryId } = req.body
  if (categoryId === "all") {
    return res.redirect('/')
  }
  return Category.find()
    .lean()
    .then((categories) => {
      return Record.find({ userId, categoryId })
        .populate('categoryId') //以'categoryId'欄位把Record跟Category資料庫關聯
        .lean()
        .sort({ date: 'desc' })
        .then((records) => {
          let totalAmount = 0
          records.forEach((record) => {
            totalAmount += record.amount
            record.date = record.date.toISOString().slice(0,10)
          })
          return res.render('index', { records, categories, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router

