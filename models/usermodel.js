//connect to the mongodb with schema



// const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")

const mongoose = require('mongoose');
// const { required } = require('nodemon/lib/config');
const dburi = 'mongodb+srv://reza:test12345@nodecourse.dosiufs.mongodb.net/node-course?retryWrites=true&w=majority&appName=nodecourse'



mongoose.connect(dburi)
.then(()=> console.log("connect"))
.catch((err)=>console.log(err))



const schema = mongoose.Schema

const blogschema = new schema({
   email: {
    type:String,
    required:true
   },
   password: {
    type:String,
    required:true
   }
  
})



const collection = mongoose.model("users",blogschema)

module.exports = collection