const express = require('express');
const addBasket = require('../controller/basketControlle');

const router = express.Router();

router.post('/add-to-bascket',addBasket.addBasket);
router.post('/create-payment',addBasket.verifyproduct);
router.post('/verify-payment',addBasket.verifypay);
router.get('/Delete-product/:id',addBasket.deletebasket);

module.exports = router;