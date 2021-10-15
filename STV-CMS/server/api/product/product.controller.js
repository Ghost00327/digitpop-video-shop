'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var ProductGroup = require('../productGroup/productGroup.model');
var async = require('async');
var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});


// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

exports.search = function(req, res) {
  if(!req.params.keyword) {
    return res.status(422).json({ message: 'keyword can not be empty.' });
  }

  client.itemSearch({
    keywords: req.params.keyword,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results){
    // console.log(results);
    return res.send(results);
  }).catch(function(err){
    console.log(err);
    return res.status(500).send(err);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  var productGroupId = req.body.productGroupId;
  console.log('productGroupId', productGroupId);
  async.waterfall([
    function(callback) {
      Product.create(req.body, function(err, product) {
        if(err) { return handleError(res, err); }
        callback(null, product);
      });
    }, function(product, callback) {
      ProductGroup.findById(productGroupId)
      .exec(function(err, productGroup) {
        if(err) { return handleError(res, err); }
        productGroup.products.push(product._id);
        console.log('productGroup.products', productGroup.products.length)
        // productGroup.markModified('products');
        productGroup.save(function(err, updatedProductGroup){
          if(err) { return handleError(res, err); }
          return res.json(product);
        });
      });
    }
  ], function(err) {
    if(err) {
      res.status(500).json(err);
    }
  });
};

exports.updateImages = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }

    product.images = req.body.images;
    // updated.markModified('images');
    product.save(function (err, updatedProduct) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(updatedProduct);
    });
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    // var updated = _.merge(product, req.body);
    // // console.log(updated.images.length);
    // //updated.images = req.body.images;
    // updated.sizes = req.body.sizes;
    // updated.colors = req.body.colors;
    // updated.markModified('sizes');
    // updated.markModified('colors');
    // updated.markModified('images');

    product.name = req.body.name;
    product.description = req.body.description;
    product.subtitle = req.body.subtitle;
    product.price = req.body.price;
    product.makeThisYourLookURL = req.body.makeThisYourLookURL;

    product.save(function (err, updatedProduct) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(updatedProduct);
    });
  });
};

var updateStats = function(req, res, updateVar) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }

    if(product.stats) {
      product.stats[updateVar] = (product.stats[updateVar] || 0) + 1;
    } else {
      product.stats = {};
      product.stats[updateVar] = 1;
    }

    product.save(function (err, updatedProduct) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(updatedProduct);
    });
  });
};

exports.increaseClickBuyNowCount = function(req, res) {
  return updateStats(req, res, 'clickBuyNowCount');
  // if(req.body._id) { delete req.body._id; }
  // Product.findById(req.params.id, function (err, product) {
  //   if (err) { return handleError(res, err); }
  //   if(!product) { return res.status(404).send('Not Found'); }

  //   if(product.stats) {
  //     product.stats.clickBuyNowCount = (product.stats.clickBuyNowCount || 0) + 1;
  //   } else {
  //     product.stats = {
  //       clickBuyNowCount: 1
  //     };
  //   }

  //   product.save(function (err, updatedProduct) {
  //     if (err) { return handleError(res, err); }
  //     return res.status(200).json(updatedProduct);
  //   });
  // });

};

exports.increaseClickCount = function(req, res) {
  return updateStats(req, res, 'clickCount');
};

exports.resetStats = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }

    product.stats = {
      clickCount: 0,
      clickBuyNowCount: 0
    };

    product.save(function (err, updatedProduct) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(updatedProduct);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
