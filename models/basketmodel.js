const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    image: String,
    name: String,
    price: Number,
    description: String,
    quantity: { type: Number, default: 1 }
});

const Basket = mongoose.model('Basket', basketSchema, 'basket');

module.exports = Basket;
