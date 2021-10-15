'use strict';

var _ = require('lodash');
var Ad = require('./ad.model');

exports.getNextAd = function (req, res) {
  var populateDetails = req.params.populateDetails || req.body.populateDetails;
  if (req.body.populateDetails) { delete req.body.populateDetails; }
  console.log('populateDetails', populateDetails, req.params.id);
  
    Ad.findById(req.params.id)
      .exec(function (err, ad) {
        console.log('ad', ad);
        if (err) { return handleError(res, err); }
        if (!ad) { return res.status(404).send('Not Found'); }
        res.json(ad);
      });
  
};


// Get list of ads
exports.index = function (req, res) {
  

  Ad.find(query)
    // sorting from newest to oldest
    .sort([['_id', -1]])
    .populate('createdBy', { name: 1 })
    .exec(function (err, ads) {
      if (err) { return handleError(res, err); }
      
      return res.status(200).json(ads);
    });
};


// Updates an existing ad in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.__v) { delete req.body.__v; }
  Ad.findById(req.params.id)
    .exec(function (err, ad) {
      if (err) { return handleError(res, err); }
      if (!ad) { return res.status(404).send('Not Found'); }
     
      // var updated = _.merge(project, req.body);
      ad.name = req.body.name;
      ad.campaignId = req.body.campaignId;
      ad.adUrl = req.body.adUrl;


      // console.log('updated', project);
      campaign.save(function (err) {
        console.log('update err', err);
        if (err) { return handleError(res, err); }
        returnCampaign(req, res);
      });
    });
};





function handleError(res, err) {
  return res.status(500).send(err);
}