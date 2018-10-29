const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Order = require('../models/order');

// this route for shows all orders
router.get('/', (req, res, next) => {  
    res.status(200).json({
        message : "GET request to /orders"
    });
});

//this post route for adding order
router.post('/',(req, res, next) => {
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
         product : req.body.productId,
         quantity : req.body.quantity
    });
    order
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
        //     message : "Created order successfully",
        //     createdOrder : result
        // });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.get('/:orderId',(req, res, next) => {
   res.status(200).json({
       message : "order get with orderid",
       orderId : req.params.orderId
   });
});

router.delete('/:orderId',(req, res, next) => {
    res.status(200).json({
        message : "order deleted",
        orderId : req.params.orderId
    });
 });

module.exports = router;