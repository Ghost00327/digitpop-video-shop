'use strict';

var express = require('express');
var controller = require('./product.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id/count/buynowclick', controller.increaseClickBuyNowCount);
router.put('/:id/count/click', controller.increaseClickCount);

router.get('/search/:keyword', controller.search);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/update/images', auth.isAuthenticated(), controller.updateImages);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.put('/:id/reset/stats', auth.isAuthenticated(), controller.resetStats);

module.exports = router;
