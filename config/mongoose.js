const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI) //程式碼跑到這行。會與資料庫連線

const db = mongoose.connection

db.on('error' ,() => {
  console.log('mongodb error!')
})

db.once('open' ,() => {
  console.log('mongodb connected!')
})

module.exports = db