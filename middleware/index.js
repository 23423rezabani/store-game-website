const jwt = require('jsonwebtoken');

 const verifytoken = (req,res)=>{
    const token = req.session.token;
 
 if (!token) {
   return res.status(401).send('دسترسی ممنوع: توکن ارائه نشده است');
 }

jwt.verify(token,'your-jwt-secret-key-expriense-utilites',(err,user)=>{
 if(err){
   return res.status(403).send('توکن نامعتیر است')
 }
 req.user = user;

})
}

module.exports = verifytoken