var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./models/product');
var WishList = require('./models/wishList');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded: false}));

app.post('/product', function(req, res){
    var product = new Product(req.body);
    product.save(function(err, savedProduct){
        if(err)
            res.status(500).send({error:"could not save product"});
        else
            res.send(savedProduct);
    });
});

app.listen(3000, function() {
   console.log("Swag Shop API running on port 3000...");
});