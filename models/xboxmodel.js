const mongoose = require('mongoose')
const { schema } = require('./usermodel')

const uir = mongoose.connect('mongodb+srv://reza:test12345@nodecourse.dosiufs.mongodb.net/node-course?retryWrites=true&w=majority&appName=nodecourse',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
     console.log("mongodb is connected");
}).catch((err)=>{
 console.log(err)

})

const dataget =  mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    descreaption:String
})

const xbox =mongoose.model('xbox',dataget,'xboxgames')

module.exports = xbox