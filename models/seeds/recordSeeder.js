const db = require('../../config/mongoose')

const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const userData = require('../seedsData/user.json')
const recordData = require('../seedsData/record.json')

const bcrypt = require('bcryptjs')

db.once('open', () => {
  Promise.all(
    //把每個使用者密碼bcrypt之後，存到資料庫
    userData.map(user =>{
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password,salt) )
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash })
          )
        .then(user => {
          //userId拿來，標記在每筆recordData上，表示屬於"資料庫內的哪個使用者"
          const userId = user._id
          return Promise.all(
            //拿recordData每一筆的category去比對，哪筆與Category的name相符
            recordData.map(record =>{
              return Category.findOne({name: record.category})
                .lean()
                .then((category) => {
                  //比對後相符的category，取得它的category._id
                  const categoryId = category._id
                  const newRecord = Object.assign({},record,{userId},{categoryId})
                  return Record.create(newRecord)
                })
                .catch(error => console.log(error))
            })
          )
        })
     })
  )
  .then(() => {
    console.log('records seed done!')
    db.close() })
  .catch(error => console.log(error))
})