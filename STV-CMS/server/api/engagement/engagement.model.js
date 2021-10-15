'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var EngagementSchema = new Schema({
	name: String,
	campaign: String,
	project: String,
	xchaneUser: String,
	notes: String,
	creditValue: { type: Number, default: 100 },
	complete: { type: Boolean, default: false },
	correct: { type: Boolean, default: false },
	creditsEarned:  { type: Number, default: 0 },
	stats: {
		watchCount: { type: Number, default: 0 },
		videoClickCount: { type: Number, default: 0 },
		videoWatchCount: { type: Number, default: 0 },
		videoPauseCount: { type: Number, default: 0 },
		buyNowClickCount: { type: Number, default: 0 },
		productCount: { type: Number, default: 0 }
	},
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date },
	updatedAt: { type: Date },
	active: { type: Boolean, default: false }
});

EngagementSchema.pre('save', function (next) {
	var now = new Date();
	this.updatedAt = now;
	if (!this.createdAt) {
		this.createdAt = now;
	}
	next();
});

module.exports = mongoose.model('Engagement', EngagementSchema);