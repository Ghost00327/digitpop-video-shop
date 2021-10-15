'use strict';

var express = require('express');
var controller = require('./project.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);

router.get('/:id/:populateDetails', controller.show);
// Add a route here, or change the above route, to add an xchane flag
router.put('/:id/count/videowatch', controller.increaseVideoWatchCount);
router.put('/:id/count/videopause', controller.increaseVideoPauseCount);
router.put('/:id/count/videoclick', controller.increaseVideoClickCount);
router.put('/:id/count/watch', controller.increaseWatchCount);

router.get('/myprojects', auth.isAuthenticated(), controller.getMyProjects);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/email', controller.email);
router.put('/:id/updateProductGroups', auth.isAuthenticated(), controller.updateProductGroups);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.put('/:id/reset/stats', auth.isAuthenticated(), controller.resetStats);

module.exports = router;

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
