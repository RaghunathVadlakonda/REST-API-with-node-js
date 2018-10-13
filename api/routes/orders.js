const express = require('express');
const router = express.Router();

// this route for shows all orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "GET request to /orders"
    });
});

//this post route for adding order
router.post('/',(req, res, next) => {
    res.status(201).json({
        message : "order created!"
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