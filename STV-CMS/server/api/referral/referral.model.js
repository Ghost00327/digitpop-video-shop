'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReferralSchema = new Schema({
  referer: String,
  receiver: String,
  reward: String,
	createdBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt    : { type: Date },
	updatedAt    : { type: Date }
});

var ReferralSchema = new Schema({
  ReferralSchema.pre('save', function(next){
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Referral', ReferralSchema);