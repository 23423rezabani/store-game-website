const basket = require('../models/basketmodel');
const product = require('../models/productmodel');
const xbox = require('../models/xboxmodel')
const giftcard = require('../models/giftmodel');
const mongoose = require( 'mongoose');



const sandboxRequestUrl = 'https://sandbox.zarinpal.com/pg/v4/payment/request.json';
const sandboxVerifyUrl = 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json';
const sandboxStartPayUrl = 'https://sandbox.zarinpal.com/pg/StartPay/';
// const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', false, sandboxUrl);




const addBasket =  async (req, res) => {
    if (!req.session || !req.session.userId) {
      console.error('کاربر وارد نشده است');
      return res.status(401).send('کاربر وارد نشده است');
    }
  
    try {
      const { id, image, name, price, description } = req.body;
      const userId = req.session.userId;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('شناسه محصول نامعتبر:', id);
        return res.status(400).send('شناسه محصول نامعتبر');
      }
  
      const existingBasketProduct = await basket.findOne({ userId, productId: id });
  
      if (existingBasketProduct) {
        existingBasketProduct.quantity += 1;
        await existingBasketProduct.save();
      } else {
        const basketProduct = new basket({
          userId,
          productId: id,
          image,
          name,
          price,
          description
        });
        await basketProduct.save();
      }
      
  
      // Fetch updated data for rendering
      const products = await product.find().limit(10);
      const xboxgame = await xbox.find().limit(10);
      const basketItems = await basket.find({ userId });
      const giftcards = await giftcard.find().limit(10);
      const basketTotal1 = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      res.render('store', { products, basketItems, basketTotal1, xboxgame, giftcards });
      res.redirect('/')
    } catch (err) {
      console.error('خطا در اضافه کردن محصول به سبد:', err);
      res.status(500).send('خطا در اضافه کردن محصول به سبد');
    }
  };



  

const verifyproduct =  async (req, res) => {
    if (!req.session.token) {
      return res.render('login');
    }
  
    try {
      const findproduct = await basket.find({});
      const basketTotal = findproduct.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      const data = {
        merchant_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // مرچنت کد تستی
        amount: basketTotal * 100, // مبلغ تراکنش به ریال (ضرب در 10 برای تبدیل تومان به ریال)
        callback_url: 'http://127.0.0.1:3000/verify-payment', // آدرس برگشتی پس از پرداخت موفق
        description: 'خرید از فروشگاه',
       
      };
     
      console.log('Request data:', data); // لاگ کردن داده‌های ارسال شده
  
      const response = await axios.post(sandboxRequestUrl, data, { timeout: 30000 }); // اضافه کردن تایم‌اوت
      
      console.log('Zarinpal Response:', response); // لاگ کردن وضعیت و پاسخ زرین پال
  
      if (response.data.data.code === 100) {
        res.redirect(`${sandboxStartPayUrl}${response.data.data.authority}`);
      } else {
        res.status(400).send(`خطا در ایجاد تراکنش: ${response.data.errors.code} - ${response.data.errors.message}`);
      }
    } catch (err) {
      if (err.response) {
        // سرور پاسخ داده اما با وضعیت خطا
        // console.log(err)
        console.error('Server responded with an error:', err.response.status, err.response.data);
         res.status(500).send(`the server is response but with this error   ${err.response.status} - ${err.response.data}`);
      } else if (err.request) {
        // درخواست ارسال شده ولی پاسخی دریافت نشده
        console.error('No response received:', err.request);
        res.status(500).send('خطا در ارتباط با سرور زرین پال');
      } else {
        // خطای دیگر
        console.error('Error creating payment:', err.message);
        res.status(500).send(`خطای سرور: ${err.message}`);
      }
    }
  };
  
 const verifypay =  async(req,res)=>{
    const authority = req.body.Authority;
    const data = {
      merchant_id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // مرچنت کد تستی
      authority: authority,
      amount: req.body.Amount // مبلغ تراکنش به ریال
    };
    try {
       
      const response = await axios.post(sandboxVerifyUrl, data);
  
      if (response.data.code === 100) {
        res.send('پرداخت با موفقیت انجام شد.');
      } else {
        res.send(`خطا در تایید تراکنش: ${response.data.errors.code} - ${response.data.errors.message}`);
      }
    } catch (err) {
      res.status(500).send('خطا در تایید پرداخت', err);
    }
  }

  const deletebasket =  async (req, res) => {
    const proid = req.params.id;
    const userId = req.session.userId; 
  
    console.log('User ID:', userId); 
  
    try {
        const result = await basket.findOneAndDelete({ _id: proid, userId: userId }); // بررسی userId در حذف
  
        if (!result) {
            return res.status(404).json({ message: 'محصولی در سبد خرید پیدا نشد' });
        }
  
        res.redirect('/');
    } catch (err) {
        console.error('خطا در حذف محصول:', err);
        res.status(500).json({ message: 'خطا در حذف محصول' });
    }
  };
  
  

  module.exports = {
    addBasket,
    verifyproduct,
    verifypay,
    deletebasket  
} 
  