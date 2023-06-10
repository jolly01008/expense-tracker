const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name:{ type: String , required: true},
  email:{ type: String, requried: true},
  password:{ type: String, requried: true},
  createAt:{ type:Date, default: Date.now}
})

module.exports = mongoose.model('User',userSchema)