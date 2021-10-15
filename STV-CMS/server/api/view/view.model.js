'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ViewSchema = new Schema({
  bytes: Number,
  cycle: Number,
	project: { type: Schema.Types.ObjectId, ref: 'Project' },
	createdBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt    : { type: Date },
	updatedAt    : { type: Date }
});

ViewSchema.pre('save', function(next){
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('View', ViewSchema);
