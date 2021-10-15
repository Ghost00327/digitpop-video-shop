'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/settings', auth.hasRole('admin'), controller.getSettings);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/activate', auth.hasRole('admin'), controller.activate);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/welcome', auth.isAuthenticated(), controller.welcome);
router.get('/:id/subscription', controller.subscription);
router.get('/:id/icon', controller.icon);
router.get('/:id/:cycle/usage', controller.usage);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
