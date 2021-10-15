'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdSchema = new Schema({
	name: String,
  adUrl: String,
  campaignId: String,
	verification: String,
	engagedBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
	createdBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt    : { type: Date },
	updatedAt    : { type: Date }
});

AdSchema.pre('save', function(next){
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Ad', AdSchema);