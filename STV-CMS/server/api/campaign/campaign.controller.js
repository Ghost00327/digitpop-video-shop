'use strict';

var nodemailer = require('nodemailer');
var _ = require('lodash');
var Campaign = require('./campaign.model');
var Project = require('../project/project.model');

var returnCampaign = function (req, res) {
  var populateDetails = req.params.populateDetails || req.body.populateDetails;
  if (req.body.populateDetails) { delete req.body.populateDetails; }
  console.log('populateDetails', populateDetails, req.params.id);

    Campaign.findById(req.params.id)
      .populate('project')
      .exec(function (err, campaign) {
        console.log('campaign', campaign);
        if (err) { return handleError(res, err); }
        if (!campaign) { return res.status(404).send('Not Found'); }
        res.json(campaign);
      });

};

// Get list of campaigns
exports.getActiveCampaigns = function (req, res) {
  
  
  var query = {
  };

  Campaign.find(query)
    // sorting from oldest to newest
    .sort([['_id', 1]])
    .populate('createdBy', { name: 1 })
    .exec(function (err, campaigns) {
      console.log("In Campaign query, campaigns before filter are : " + JSON.stringify(campaigns))
      if (err) { return handleError(res, err); }
      //campaigns = campaigns.filter(campaign => campaign.active == 'true');

      var tempCampaigns = [];

      campaigns.forEach(element => {
        console.log("Evaluating campaign collection.  element.active is " + element.active)
        if(element.active == true)
        {
          tempCampaigns.push(element);
        }
      });

      return res.status(200).json(tempCampaigns);
    });


};


// Get list of campaigns
exports.index = function (req, res) {


  Campaign.find(query)
    // sorting from newest to oldest
    .sort([['_id', -1]])
    .populate('createdBy', { name: 1 })
    .exec(function (err, campaigns) {
      if (err) { return handleError(res, err); }

      campaigns.forEach(function (campaign) {
        populateCampaignStats(campaign);
      });
      return res.status(200).json(campaigns);
    });
};

function populateCampaignStats(campaign) {

}


// Get list of projects for loggedin user
exports.getMyCampaignStats = function (req, res) {

  var impressionCount = 0;
  var engagementCount = 0;
  var pauseCount = 0;
  var buyNowCount = 0;
  var salesCount = 0;

  console.log("Retrieving campaigns for user  : " + req.user._id);
  Campaign.find({ 'createdBy': req.user._id })
    // sorting from newest to oldest
    .sort([['_id', -1]])
    .exec(function (err, campaigns) {
      if (err) { return handleError(res, err); }
      campaigns.forEach(function (campaign) {
        impressionCount += campaign.stats.impressionCount;
        engagementCount += campaign.stats.engagementCount;
        pauseCount += campaign.stats.pauseCount;
        buyNowCount += campaign.stats.buyNowCount;
        salesCount += campaign.stats.salesCount;
      });

      var stats = {"impressionCount":impressionCount, "engagementCount":engagementCount,
      "pauseCount":pauseCount, "buyNowCount":buyNowCount, "salesCount":salesCount,
      };

      console.log("Returning aggregate campaign stats :  " + stats.toString());
      return res.status(200).json(stats);
    });
};


// Get list of projects for loggedin user
exports.getMyCampaigns = function (req, res) {

  console.log("Retrieving campaigns for user  : " + req.user._id);
  Campaign.find({ 'createdBy': req.user._id })
    // sorting from newest to oldest
    .sort([['_id', -1]])
    .exec(function (err, campaigns) {
      if (err) { return handleError(res, err); }
      campaigns.forEach(function (campaign) {

      });

      //console.log("Returning campaigns :  " + campaigns.toString());
      return res.status(200).json(campaigns);
    });
};

// Get a single campaign
exports.show = function (req, res) {
  returnCampaign(req, res);
};

// Creates a new project in the DB.
exports.create = function (req, res) {
  req.body.createdBy = req.user._id;
  Campaign.create(req.body, function (err, campaign) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(campaign);
  });
};



// Updates an existing campaign in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.__v) { delete req.body.__v; }
  Campaign.findById(req.params.id)
    .populate('project')
    .exec(function (err, campaign) {
      if (err) { return handleError(res, err); }
      if (!campaign) { return res.status(404).send('Not Found'); }

      // var updated = _.merge(project, req.body);
      campaign.name = req.body.name;
      campaign.verificationQuestion = req.body.verificationQuestion;
      campaign.verificationAnswer = req.body.verificationAnswer;
      campaign.verificationWrongAnswer1 = req.body.verificationWrongAnswer1;
      campaign.verificationWrongAnswer2 = req.body.verificationWrongAnswer2;
      campaign.verificationWrongAnswer3 = req.body.verificationWrongAnswer3;
      campaign.verificationWrongAnswer4 = req.body.verificationWrongAnswer4;
      campaign.project = req.body.project._id;
      campaign.active = req.body.active;

      // console.log('updated', project);
      campaign.save(function (err) {
        console.log('update err', err);
        if (err) { return handleError(res, err); }
        returnCampaign(req, res);
      });
    });
};

var updateStats = function (req, res, updateVar) {
  if (req.body._id) { delete req.body._id; }
  Campaign.findById(req.params.id, function (err, campaign) {
    if (err) { return handleError(res, err); }
    if (!campaign) { return res.status(404).send('Not Found'); }

    if (campaign.stats) {
        campaign.stats[updateVar] = (campaign.stats[updateVar] || 0) + 1;
    } else {
        campaign.stats = {};
        campaign.stats[updateVar] = 1;
    }

    campaign.save(function (err) {
      if (err) { return handleError(res, err); }
      returnCampaign(req, res);
    });
  });
};

exports.increaseImpressionCount = function (req, res) {
  return updateStats(req, res, 'impressionCount');
};

exports.increaseEngagementCount = function (req, res) {
  return updateStats(req, res, 'engagementCount');
};

exports.increasePauseCount = function (req, res) {
  return updateStats(req, res, 'pauseCount');
};

exports.increaseBuyNowCount = function (req, res) {
  return updateStats(req, res, 'buyNowCount');
};

exports.increaseVideoWatchCount = function (req, res) {
  return updateStats(req, res, 'videoWatchCount');
};

exports.increaseWatchCount = function (req, res) {
  return updateStats(req, res, 'watchCount');
};

exports.increaseVideoPauseCount = function (req, res) {
  return updateStats(req, res, 'videoPauseCount');
};

exports.increaseVideoClickCount = function (req, res) {
  return updateStats(req, res, 'videoClickCount');
};

exports.resetStats = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if (!category) { return res.status(404).send('Not Found'); }

    category.stats = {
      watchCount: 0,
      videoClickCount: 0,
      videoWatchCount: 0,
      videoPauseCount: 0
    };

    category.save(function (err) {
      if (err) { return handleError(res, err); }
      returnProject(req, res);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function (req, res) {
  //   Project.findById(req.params.id, function (err, project) {
  //     if(err) { return handleError(res, err); }
  //     if(!project) { return res.status(404).send('Not Found'); }
  //     project.remove(function(err) {
  //       if(err) { return handleError(res, err); }
  //       return res.status(204).send('No Content');
  //     });
  //   });
};

// Sends an email 
exports.verificationAnswer = function (req, res) {

  console.log("Verification Answer : " + req.body.verificationAnswer);
  console.log("Engagement Id : " + req.body.engagementId);

  /*req.body.createdBy = req.user._id;
  Project.create(req.body, function (err, project) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(project);
  });*/
};


function handleError(res, err) {
  return res.status(500).send(err);
}
