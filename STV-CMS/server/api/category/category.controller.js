/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 */

'use strict';

var _ = require('lodash');
var Category = require('./category.model');

// Get list of categories
exports.index = function(req, res) {
  Category.find(function (err, categories) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categories);
  });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    res.status(201).send(category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    var updated = _.merge(category, req.body);
    // console.log(updated.images.length);
    updated.save(function (err, updatedCategoty) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(updatedCategoty);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}