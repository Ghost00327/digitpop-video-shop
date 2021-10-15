'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	name: String,
	description: String,
	verify: { type: Boolean, default: false },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	media: {
		url               : String,
		original_filename : String,
		duration 		  : Number,
		public_id         : String,
		secure_url        : String,
    signature         : String,
    bytes              : Number
	},
	thumbnail: {
		url               : String,
		original_filename : String,
		public_id         : String,
		secure_url        : String,
		signature         : String
	},
	stats: {
		watchCount: { type: Number, default: 0 },
		videoClickCount : { type: Number, default: 0 },
		videoWatchCount: { type: Number, default: 0 },
		videoPauseCount: { type: Number, default: 0 },
		buyNowClickCount: { type: Number, default: 0 },
		productCount: { type: Number, default: 0}
	},
	productGroupTimeLine : [ { type: Schema.Types.ObjectId, ref: 'ProductGroup' } ],
	createdBy	 : { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt    : { type: Date },
	updatedAt    : { type: Date },
	isPrivate: { type: Boolean, default: false },
	active: { type: Boolean, default: false },
	testing: { type: Boolean, default: false }
});

ProjectSchema.pre('save', function(next){
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
