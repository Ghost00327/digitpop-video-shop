'use strict';

var express = require('express');
var controller = require('./productGroup.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id/count/pause', controller.increasePauseCount);
router.put('/:id/count/click', controller.increaseClickCount);
router.put('/:id/count/buynowclick', controller.increaseBuyNowClickCount);

router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/deleteProduct', auth.isAuthenticated(), controller.updateDeleteProduct);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.put('/:id/reset/stats', auth.isAuthenticated(), controller.resetStats);

module.exports = router;