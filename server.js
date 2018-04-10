var express = require('express');
var app = express();
var product = require('./productRoute.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');

var WishList = require('./models/wishList');
var Product = require('./models/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded: false}));

app.use('/product', product); 

app.post('/wishlist', function(req,res){
   var wishList = new WishList();
    wishList.title = req.body.title;
    
    wishList.save(function(err, newWishList) {
       if(err)
            res.status(500).send({error: "could not create wishlist"});
        else
            res.send(newWishList);
    });
});

app.get('/wishlist', function(req, res){
   WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists) {
       if(err)
           res.status(500).send({error:"Could not fetch wishlists"});
       else
           res.status(200).send(wishLists);
       
   });
});

app.put('/wishlist/product/add', function(req, res){
    Product.findOne({_id: req.body.productId}, function(err, product){
       if(err)
           res.status(500).send({error:"Could not add item to wishlist"});
        else
            WishList.update({_id:req.body.wishListId}, {$addToSet: {products: product._id}}, function(err, wishList) {
                if(err)
                    res.status(500).send({error:"Could not add item to wishlist"});
                else
                    res.send(wishList);
            });
    });  
});

app.listen(3000, function() {
   console.log("Swag Shop API running on port 3000...");
});