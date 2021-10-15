"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  name: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  budgetType: String,
  budgetAmount: String,
  spentAmount: String,
  startDate: Date,
  endDate: Date,
  audienceId: String,
  verificationQuestion: String,
  verificationAnswer: String,
  verificationWrongAnswer1: String,
  verificationWrongAnswer2: String,
  verificationWrongAnswer3: String,
  verificationWrongAnswer4: String,
  notes: String,
  stats: {
	engagementCount: { type: Number, default: 0 },
	watchCount: { type: Number, default: 0 },
	videoClickCount : { type: Number, default: 0 },
	videoWatchCount: { type: Number, default: 0 },
	videoPauseCount: { type: Number, default: 0 },
	buyNowClickCount: { type: Number, default: 0 },
	productCount: { type: Number, default: 0},
	wrongAnswerCount: { type: Number, default: 0},
	completionCount: { type: Number, default: 0 }	
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean, default: false },
});
CampaignSchema.pre("save", function (next) {
  var now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Campaign", CampaignSchema);
