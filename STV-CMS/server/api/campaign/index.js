'use strict';

var express = require('express');
var controller = require('./campaign.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();



router.get('/', controller.index);


router.get('/:id/:populateDetails', controller.show);
router.put('/:id/count/impression', controller.increaseImpressionCount);
router.put('/:id/count/engagement', controller.increaseEngagementCount);
router.put('/:id/count/pause', controller.increasePauseCount);
router.put('/:id/count/buynow', controller.increaseBuyNowCount);


router.get('/activeCampaigns', auth.isAuthenticated(), controller.getActiveCampaigns);
router.get('/mycampaigns', auth.isAuthenticated(), controller.getMyCampaigns);
router.get('/mycampaignStats', auth.isAuthenticated(), controller.getMyCampaignStats);
router.post('/', auth.isAuthenticated(), controller.create);


router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
