const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,'./uploads/');
    },
    filename: (req, file, cb) => {
        req.newFileName = new Date().toISOString() + file.originalname;
        cb(null,req.newFileName);
    }
});

const fileFilter = (req, file, callback) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  };


const upload = multer({storage : storage,limits: {
    fileSize: 1024 * 1024 * 5
},
    fileFilter : fileFilter
  });



const Product = require('../models/product');

// this route for shows all products
router.get('/', (req, res, next) => {
   Product.find()
// select - which fields we want display   
   .select('name price _id productImage')
   .exec()
   .then(docs =>{
        
    const response = {
        count: docs.length,
        products : docs.map(doc => {
            return {
                name : doc.name,
                price : doc.price,
                productImage : doc.productImage,
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
router.post('/',checkAuth, upload.single('productImage'),(req, res, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.newFileName
    });
// save data in database
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Created product successfully",
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3001/products/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    });
  
});

// this productId route for particuler shows one product based on productId
// fetching product data from database with id
router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("fetching from database", doc);
        if(doc){
            res.status(200).json({
                product : doc,
                request : {
                    type : 'GET',
                    url :  'http://localhost:3001/products' + doc._id
                }
            });
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
        res.status(200).json({
            message : 'product updated',
            request : {
                type : 'GET',
                url : 'http://localhost:3001/products/' + id

            }

        });
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
        res.status(200).json({
            message : 'product deleted',
            request : {
                type : 'POST',
                url : 'http://localhost:3001/products/',
                body : { name : "String", price  : "Number"}

            }
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