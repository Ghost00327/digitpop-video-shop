'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: String,
	description: String,
  createdBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	active: { type: Boolean, default: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);