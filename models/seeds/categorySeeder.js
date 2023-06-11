const db = require('../../config/mongoose')
const Category = require('../category')

const categories = require('../seedsData/category.json')

db.once('open', () => {
  Promise.all([Category.create(categories)] 
  )
  .then(() =>{
      console.log('categories seed done!')
      db.close()
    })
   .catch(error => console.log(error))
})