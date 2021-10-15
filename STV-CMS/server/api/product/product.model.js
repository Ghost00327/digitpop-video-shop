"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var ProductImageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: String,
  original_filename: String,
  public_id: String,
  secure_url: String,
  signature: String,
});

module.exports = mongoose.model("ProductImage", ProductImageSchema);

var ProductSchema = new Schema({
  name: String,
  subtitle: String,
  description: String,
  makeThisYourLookURL: String,
  price: Number,
  sizes: [String],
  colors: [String],
  reviews: [
    {
      title: String,
      text: String,
      rating: { type: Number, min: 0, max: 5 },
    },
  ],
  images: [
    {
      url: String,
      original_filename: String,
      public_id: String,
      secure_url: String,
      signature: String,
    },
  ],
  stats: {
    clickCount: { type: Number, default: 0 },
    clickBuyNowCount: { type: Number, default: 0 },
  },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", ProductSchema);
