'use strict';

var express = require('express');
var controller = require('./redemption.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.post('/', controller.request);
module.exports = router;

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });