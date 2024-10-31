const basket = require('../models/basketmodel');
const product = require('../models/productmodel');
const xbox = require('../models/xboxmodel')
const giftcard = require('../models/giftmodel');
const ps5game = require('../models/ps5model')
const mongoose = require( 'mongoose');



const datamain =  async (req, res) => {
    try {
      const userId = req.session.userId;
      const products = await product.find().limit(10);
      const xboxgame = await xbox.find().limit(10);
      const basketItems = userId ? await basket.find({ userId }) : [];
      const giftcards = await giftcard.find().limit(10);
  
      const basketTotal1 = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
     console.log({
        userId,
        products,
        basketItems,
        basketTotal1,
        xboxgame,
        giftcards,
      });
      res.render('store', { products, basketItems, basketTotal1, xboxgame, giftcards });
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to load data");
    }
  };

  const ps5gamepage = async(req,res)=>{
    try{
  
      const uniqueps5game =  await ps5game.find();
      res.render('ps5game',{uniqueps5game});
  
    }catch(err) {
      console.log(err,'not load')
    }
  
  }
  

  const productgame =  async (req, res) => {
    const productid = req.params.id;
  
    // Check if product ID is valid
    if (! mongoose.Types.ObjectId.isValid(productid)) {
      return res.status(400).send('Invalid product ID');
    }
  
    try {
      const productsgame = await product.findById(productid);
      const microgame = await xbox.findById(productid);
      
      if (productsgame|| microgame ) {
        res.render('game', { productsgame,microgame });
        
      } else {
        res.status(404).send('Product not found');
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

  
const ps5gameee =  async (req, res) => {
    const ps5id = req.params.id;
   
    // Check if product ID is valid
    if (! mongoose.Types.ObjectId.isValid(ps5id)) {
      return res.status(400).send('Invalid product ID');
    }
  
    try {
      
      const ps5gameid = await ps5game.findById(ps5id); 
    
      if(ps5gameid) {
        res.render('game',{ps5gameid})
      }else{
        res.status(500).send('not found ps5 game')
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  
  

    const xboxgame = async (req,res)=>{
    const xboxid = req.params.id;
  
  
    if (! mongoose.Types.ObjectId.isValid(xboxid)) {
      return res.status(400).send('Invalid product ID');
    }
  
  
  
    try{
     
     const xbgame = await xbox.findById(xboxid) 
    if(xbgame) {
      
      res.render('game',{xbgame})
    }else{
      console.log('xbox game not found')
    }
    
    
    }catch(err) {
     console.log('xbgame not found :',err )
    }
  }


  const giftcardcontroller = async(req,res)=>{
    const {id} =req.params;
  
    if (! mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid product ID');
    }
  
  
    try{
     const gift = await giftcard.findById(id);
  
       
       res.render('game',{gift});
    
    }catch(err) {
      console.log(err)
     res.status(404).json({message:err.message})
    }
  
  }



  const searchgame = async(req,res)=>{
    const searchterm = req.query.term.toLowerCase();
    
    try{
   
      const searchitem = await product.find({name:{$regex:new RegExp(searchterm,'i')}});
      const xboxsearch = await xbox.find({name:{$regex:new RegExp(searchitem,'i')}});
      const ps5search = await ps5game.find({name:{$regex:new RegExp(searchterm,'i')}});
    console.log(xboxsearch)
     res.render('game',{searchitem,ps5search,xboxsearch})
  
    }catch(err) {
     console.log(err)
    }
  }
  
  
  module.exports = {
    datamain,
    productgame,
    ps5gameee,
    xboxgame,
    ps5gamepage,
    giftcardcontroller,
    searchgame,
  }