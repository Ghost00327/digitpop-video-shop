'use strict';

var nodemailer = require('nodemailer');
var _ = require('lodash');
var Referral = require('./referral.model');


function handleError(res, err) {
  return res.status(500).send(err);
}