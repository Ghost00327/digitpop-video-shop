'use strict';
var XchaneUser = require('../xchaneuser/xchane.user.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RedemptionSchema = new Schema({
	name: String,
	description: String,
	points: String,
	rewarder: String,
	createdBy	 : { type: Schema.Types.ObjectId, ref: 'XchaneUser' },
	createdAt    : { type: Date },
	updatedAt    : { type: Date }
});

RedemptionSchema.pre('request', function(next){
//  User has submitted a request to redeem their points for a reward.  Check the rating of the reward 
//  
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});


module.exports = mongoose.model('Redemption', RedemptionSchema);