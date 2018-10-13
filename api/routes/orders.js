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
    res.status(200).json({
        message : "POST request to /orders"
    });
});

module.exports = router;