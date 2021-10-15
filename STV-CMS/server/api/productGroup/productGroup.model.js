'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductGroupSchema = new Schema({
	title: { type: String, required: 'Title is required' },
	subtitle: { type: String, required: 'Subtitle is required' },
	description: { type: String, required: 'Description is required' },
	thumbnail: {
		url               : String,
		original_filename : String,
		public_id         : String,
		secure_url        : String,
		signature         : String
	},
	time: { type: Number, min: 0, required: 'StartTime is required' },
	makeThisYourLookURL: String,
	products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
	stats: {
		clickCount: { type: Number, default: 0 },
		pauseCount: { type: Number, default: 0 },
		buyNowCount: { type: Number, default: 0 }
	},
	active: { type: Boolean, default: true }
});

module.exports = mongoose.model('ProductGroup', ProductGroupSchema);