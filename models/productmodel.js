const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const uir = mongoose.connect('mongodb+srv://reza:test12345@nodecourse.dosiufs.mongodb.net/node-course?retryWrites=true&w=majority&appName=nodecourse',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, 
  socketTimeoutMS: 45000
}).then(()=>{
     console.log("mongodb is connected");
})

const productschema = mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    descreaption:String
})


const product = mongoose.model('product',productschema,"jsonproducts")



module.exports = product
