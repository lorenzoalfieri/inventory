const Product = require("../models/product.model");

exports.product_create = function(req, res) {
  let product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    unitType: req.body.unitType
  });

  product.save(function(err) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Product Created successfully!", product });
  });
};

exports.products_list = function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(products);
  });
};

exports.product_details = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(product);
  });
};

exports.product_update = function(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Product Udpated successfully!", product });
  });
};

exports.product_delete = function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Product Deleted successfully!", result });
  });
};
