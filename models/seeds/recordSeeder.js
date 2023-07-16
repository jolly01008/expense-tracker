const db = require('../../config/mongoose')

const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const userData = require('../seedsData/user.json')
const recordData = require('../seedsData/record.json')
const SEED_USERS = require('../seedsData/user.json')
const SEED_RECORDS = require('../seedsData/record.json')

const bcrypt = require('bcryptjs')

//user records 分配
SEED_USERS[0].recordsList = [0 , 1 , 2 , 4]
SEED_USERS[1].recordsList = [3]

db.once('open', async () => {
  try{
    //"先"撈出資料庫的所有資料
    const categoryData = await Category.find({})
    return Promise.all(
      //create user: 目前有2個user使用map進行
      SEED_USERS.map( async (user) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const createdUser = await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
        console.log(`${createdUser} created!`)
        //處理 records 與 users的關係
        const userRecords = user.recordsList.map(index => {
          //將所有資料依[index]非配給不同user
          const record = SEED_RECORDS[index]
          //把不同的user._id 記錄到各自的records中
          record.userId = createdUser._id
          //處理records與category的關係
          const referenceCategory = categoryData.find((data) => {
            //找到第一筆data.name與record.category 完全相同並用return返回資訊紀錄在referenceCategory
            return data.name === record.category
          })
          //紀錄 categoryId 並回傳
          record.categoryId = referenceCategory._id
          return record
        })
        await Record.create(userRecords)
      })
    )
    .then(() => {
      console.log('all done')
      process.exit()
    })
    .catch(err => console.log(err))
  }catch(err){
    console.log(err)}
})