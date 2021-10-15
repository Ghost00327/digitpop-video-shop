'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RewardSchema = new Schema({
	name: String,
  points: { type: Number, default: 0 },
	createdBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt    : { type: Date },
	updatedAt    : { type: Date }
});

RewardSchema.pre('save', function(next){
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Reward', RewardSchema);