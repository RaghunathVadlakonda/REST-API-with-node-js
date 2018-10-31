const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Order = require('../models/order');
const Product = require('../models/product');

// this route for shows all orders
router.get('/', (req, res, next) => {  
    Order.find()
    .select('quantity product _id')
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
});

//this post route for adding order
router.post('/',(req, res, next) => {

    Product.findById(req.body.productId)
    .then(product => {
        if(!product) {
            res.status(404).json({
                message : 'product not found'
            });
        }
     const order = new Order({  
        _id : mongoose.Types.ObjectId(),
         product : req.body.productId,
         quantity : req.body.quantity
    });
     return order.save();
})
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : 'Created order successfully',
            createdOrder : {
            _id : result._id,
            product : result.product,
            quantity:result.quantity
        },
     })
   
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
});
router.get('/:orderId',(req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .select('quantity _id product')
    .exec()
    .then(doc => {
        console.log("fetching from database", doc);
            res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
    


router.delete('/:orderId',(req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id : id })
    .exec()
    .then(result => {
       res.status(200).json({
           message : 'order deleted'
       });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

module.exports = router;