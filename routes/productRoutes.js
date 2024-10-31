const express = require('express')
const datamain = require('../controller/productController')
const router = express.Router();

router.get('/',datamain.datamain);
router.get('/game/:id',datamain.productgame);
router.get('/ps5/:id',datamain.ps5gameee);
router.get('/playstation-game',datamain.ps5gamepage);
router.get('/xbox/:id',datamain.xboxgame);
router.get('/giftcard/:id',datamain.giftcardcontroller);
router.get('/search',datamain.searchgame);


module.exports = router;    