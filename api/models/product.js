const mongoose = require('mongoose');

// product schema 
const productSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    name : String,
    price : Number
});

module.exports = mongoose.model('Product',productSchema);