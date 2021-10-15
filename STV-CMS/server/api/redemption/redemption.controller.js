'use strict';

var nodemailer = require('nodemailer');
var _ = require('lodash');
var Reward = require('../reward/reward.model');
var Redemption = require('../redemption/redemption.model');
var XchaneUser = require('../xchaneuser/xchane.user.model');

exports.request = function (req, res) {

  // Lookup the cost of the redemption and the user's point balance 
  Reward.find({ 'name': req.body.rewarder })
    // sorting from newest to oldest
    .exec(function (err, rewarders) {
      if (err) { return handleError(res, err); }

      if (rewarders != null && rewarders.length == 1) {
        XchaneUser.findById(req.body.xchaneuser._id)
          // sorting from newest to oldest
          .exec(function (err, user) {
            if (err) { return handleError(res, err); }

            if (user != null) { 

              if(user.credits >= rewarders[0].points)
              {
                let redemption = new Redemption();
                redemption.points = rewarders[0].points;
                redemption.rewarder = req.body.rewarder;
                
                Redemption.create(redemption, function (err, redemption) {
                  console.log("In create engagement, req.body is : " + JSON.stringify(req.body));
                  if (err) {
                    console.log("Error is :" + err);
                    return handleError(res, err);
                  }

                  // Update the User's points here 
                  user.credits -= rewarders[0].points;
                  
                  user.save(function (err) {
                    if (err) { return handleError(res, err); }
                    return res.status(201).json(redemption);
                  });

                });
                console.log('Redemption Approved.');
              }
              else
              {
                return res.status(401).send("Insufficient points for reward.");
              }

            }


          });
      }
    });

  console.log("In Redemption controller, body of request : " + JSON.stringify(req.body));

  return res.status(200);


  /*req.body.createdBy = req.user._id;
  Project.create(req.body, function (err, project) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(project);
  });*/
};


function handleError(res, err) {
  return res.status(500).send(err);
}