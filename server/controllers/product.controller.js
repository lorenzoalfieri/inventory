const Product = require("../models/product.model");

exports.product_create = function(req, res) {
  console.log(req.body.name, req.body.quantity);
  let product = new Product({
    name: req.body.name,
    quantity: req.body.quantity
  });

  product.save(function(err) {
    if (err) {
      console.log("failed : ", err);
      return next(err);
    }
    res.send("Product Created successfully");
  });
};

exports.products_list = function(req, res) {
  Product.find({}, function(err, products) {
    if (err) return next(err);
    res.send(products);
  });
};

exports.product_details = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_update = function(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) return next(err);
    res.send("Product udpated.");
  });
};

exports.product_delete = function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
