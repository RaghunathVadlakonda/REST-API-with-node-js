const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// this route for shows all products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "GET request to /products"
    });
});

//this post route for adding product
router.post('/',(req, res, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price 
    });
// save data in database
    product
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => 
        console.log(err));
        
    res.status(201).json({
        message : "POST request to /products",
        createdProduct : product
    });
});

// this productId route for particuler shows one product based on productId
router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message : "excutes when id is special",
            id : id
        });
            } else {
                     res.status(200).json({
                    message : "Hey this is productid!"
        });
    }
});

// this route for updating one product
router.patch('/:productId',(req, res, next) => {
    res.status(200).json({
        message : " updated product!"
    });
});    

// deleting product 
router.delete('/:productId',(req, res, next) => {
    res.status(200).json({
        message : " delete product!"
    });
});
    
    




module.exports = router;