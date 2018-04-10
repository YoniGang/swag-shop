var express = require('express');
var router = express.Router();

var Product = require('./models/product');



router.post('/', function(req, res){
    var product = new Product(req.body);
    product.save(function(err, savedProduct){
        if(err)
            res.status(500).send({error:"Could not save product"});
        else
            res.send(savedProduct);
    });
});

router.get('/', function(req,res){
    Product.find({}, function(err, products){
        if(err)
            res.status(500).send({error:"Could not fetch product"});
        else
            res.send(products);
    });
});

module.exports = router;