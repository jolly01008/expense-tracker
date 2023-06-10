const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema(
    {
      name:{ type: String, required: true },
      date:{ type: Date, required: true },
      amount:{ type: Number, required: true }
      userId:{ type:Schema.type.ObjectId, ref:'User', index: true, required: true }
      categoryld:{ type:Object.type.userId, ref:'Category', index: true , required:true }
    }
)

module.exports = mongoose.model('Record',RecordSchema) //mongoose.model( 想創建的collection名稱 , 欲使用的Schema)