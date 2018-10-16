const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// this route for shows all products
router.get('/', (req, res, next) => {
   Product.find()
// select - which fields we want display   
   .select('name price _id')
   .exec()
   .then(docs =>{
        
    const response = {
        count: docs.length,
        products : docs.map(doc => {
            return {
                name : doc.name,
                price : doc.price,
                _id : doc._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3001/products/' + doc._id
                }
            }
        })
        
       };
       res.status(200).json(response);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error : err
       });
   });
});

//this post route for adding product
router.post('/',(req, res, next) => {
    const product = new Product({
        // _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price 
    });
// save data in database
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "POST request to /products",
            createdProduct : product
        });
    })
    .catch(err => 
        console.log(err));
        res.status(500).json({
            error : err
        })
        
  
});

// this productId route for particuler shows one product based on productId
// fetching product data from database with id
router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("fetching from database", doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message : "Not A Valid id entered"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
});

// this route for updating one product
router.patch('/:productId',(req, res, next) => {
    const id = req.params.productId;
//updateOps - update operations     
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id : id},{$set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});    

// deleting product 
router.delete('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id:id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
    
    
module.exports = router;