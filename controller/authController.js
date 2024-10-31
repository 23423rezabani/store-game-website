const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const collection = require("../models/usermodel");



app.use(session({
    secret: 'your-jwt-secret-key-expriense-utilites', // کلید مخفی برای رمزنگاری نشست‌ها
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // در محیط تولید، از secure: true استفاده کنید
  }));


 const signup =async (req, res) => {

  const data = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const alreadyregister = await collection.findOne({ email: data.email });
    if (alreadyregister) {
      console.error('این ایمیل قبلاً ثبت‌نام شده است');
      return res.status(500).send('این ایمیل قبلاً ثبت‌نام شده است');
    }

    const blogData = new collection(data);
    const savedata = await blogData.save();

    const token = jwt.sign({ id: savedata._id }, 'your-jwt-secret-key-expriense-utilites', { expiresIn: '10m' });
    if (!req.session) {
      console.error('req.session is undefined');
      return res.status(500).send('مشکل در نشست');
    }
    req.session.token = token;
    req.session.userId = savedata._id; 

    console.log('Session after setting:', req.session); 

    res.redirect('/');
  } catch (error) {
    console.error('خطا در ذخیره داده:', error);
    res.status(500).send("خطا در ذخیره داده");
  }
};




 const login = async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email, password: req.body.password });
    if (check) {
      const token = jwt.sign({ id: check._id }, 'your-jwt-secret-key-expriense-utilites', { expiresIn: "10m" });
      req.session.token = token;
      req.session.userId = check._id;
      res.redirect('/');
    } else {
      res.status(404).send('کاربر یافت نشد');
    }
  } catch (err) {
    res.status(500).send('user not found');
  }
};

module.exports ={
  signup,
  login,
}