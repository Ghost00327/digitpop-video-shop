'use strict';

var express = require('express');
var controller = require('./engagement.controller');
//var auth = require('../../auth_xchane/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getEngagement);
//router.post('/', auth.isAuthenticated(), controller.create);
router.post('/', controller.create);
router.post('/answer', controller.answer);

//router.put('/:id', auth.isAuthenticated(), controller.update);
//router.patch('/:id', auth.isAuthenticated(), controller.update);
//router.delete('/:id', auth.isAuthenticated(), controller.destroy);


module.exports = router;

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


 