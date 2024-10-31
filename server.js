
const express = require('express');
const app = express()
const path = require("path")
const hbs = require("hbs")
const bodyparser = require('body-parser')
const session = require('express-session')








const product = require("./models/productmodel")

const ps5game = require('./models/ps5model')
const xbox = require("./models/xboxmodel")
const giftcard = require('./models/giftmodel')
const { json } = require('body-parser'); 


const Routhauth = require('./routes/authroutes');
const basketRoutes = require('./routes/basketRoutes')
const productrouter = require('./routes/productRoutes')








const templatepath = path.join(__dirname,'./templates')


app.use(session({
  secret: 'your-jwt-secret-key-expriense-utilites', // کلید مخفی برای رمزنگاری نشست‌ها
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    maxAge: 10 * 60 * 1000
  }
}));


app.use(express.json())
app.use(express.static(__dirname +'/public'));
app.set('view engine','hbs')
app.set('views',templatepath)
app.use(express.urlencoded({extends:true}))
app.use(bodyparser.json())
app.use('/api/auth/',Routhauth)
app.use('/api/basket',basketRoutes)
app.use('/',productrouter)







// app.get('/search',async(req,res)=>{
//   const searchterm = req.query.term.toLowerCase();
  
//   try{
 
//     const searchitem = await product.find({name:{$regex:new RegExp(searchterm,'i')}});
//     const xboxsearch = await xbox.find({name:{$regex:new RegExp(searchitem,'i')}});
//     const ps5search = await ps5game.find({name:{$regex:new RegExp(searchterm,'i')}});
//   console.log(xboxsearch)
//    res.render('game',{searchitem,ps5search,xboxsearch})

//   }catch(err) {
//    console.log(err)
//   }
// })



app.get('/xbox-game',async (req,res)=>{
try{
  const xgame = await xbox.find();
  res.render('xboxgame',{xgame});

}catch(err) {
 console.log(err)
}



})


app.get('/gift-card',async(req,res)=>{
  try{
    const getgiftcard = await giftcard.find();
    res.render('giftcard',{getgiftcard})  

  }catch(err) {
   console.log(err)
  }
})






app.get('/templates/login.hbs',(req,res)=>{
  res.render('login')
})

app.get('/templates/sign.hbs',(req,res)=>{
 
  res.render('sign')
})



app.listen(3000)










