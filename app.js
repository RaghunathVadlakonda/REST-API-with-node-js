const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//connecting to mongodb with mongoose

mongoose.connect('mongodb://Raghunath:'+ process.env.MONGO_ATLAS_PW + '@node-rest-shopping-shard-00-00-xqotk.mongodb.net:27017,node-rest-shopping-shard-00-01-xqotk.mongodb.net:27017,node-rest-shopping-shard-00-02-xqotk.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shopping-shard-0&authSource=admin&retryWrites=true',
{
    useNewUrlParser: true 
}
);

// DeprecationWarning
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
}
    next();
});

//routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//error handling 
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//error handling in application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
        message : error.message
         }
    });
});


module.exports = app;