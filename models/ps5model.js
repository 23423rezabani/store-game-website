const express = require('express')
const mongoose = require('mongoose')

const uir = mongoose.connect('mongodb+srv://reza:test12345@nodecourse.dosiufs.mongodb.net/node-course?retryWrites=true&w=majority&appName=nodecourse',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
     console.log("mongodb is connected");
}).catch((err)=>{
 console.log(err)

})


const ps5gameschema = mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    descreaption:String
})
const ps5game = mongoose.model('ps5game',ps5gameschema,'ps5products')

module.exports = ps5game