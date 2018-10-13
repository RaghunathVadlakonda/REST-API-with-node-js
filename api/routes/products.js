const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "GET request to /products"
    });
});

router.post('/',(req, res, next) => {
    res.status(200).json({
        message : "POST request to /products"
    });
});

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
    
    




module.exports = router;