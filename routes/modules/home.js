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
  const records = await Record.find().lean().sort({date:"desc"})
  const formattedRecords = []
  let totalAmount = 0
  for(const record of records ){
    const category = await Category.findById(record.categoryId).lean()
    const formattedDate = new Date(record.date).toISOString().slice( 0 , 10 )
    totalAmount += record.amount
    formattedRecords.push({...record , categoryIcon: category.icon , date: formattedDate})
    // console.log('formattedRecords:',formattedRecords)
  }
  res.render('index',{ records: formattedRecords , totalAmount })
})


module.exports = router

