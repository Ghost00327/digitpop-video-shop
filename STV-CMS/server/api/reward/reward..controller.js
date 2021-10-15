'use strict';

var _ = require('lodash');
var Reward = require('./reward.model');


function handleError(res, err) {
  return res.status(500).send(err);
}