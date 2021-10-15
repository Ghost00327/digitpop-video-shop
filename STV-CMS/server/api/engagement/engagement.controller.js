"use strict";

var _ = require("lodash");
var Engagement = require("./engagement.model");
var Campaign = require("../campaign/campaign.model");
var XchaneUser = require("../xchaneuser/xchane.user.model");
var mongoose = require("mongoose");

exports.new = function (req, res) {
  console.log("test");
};

// Creates a new engagement in the DB.
exports.create = function (req, res) {
  console.log(
    "In Engagement controller create.  Active campaigns are : " +
      JSON.stringify(req.body)
  );
  // Get list of campaigns?
  //var campaigns = CampaignController.getActiveCampaigns();

  var query = {};

  var tempCampaigns = [];

  Campaign.find(query)
    // sorting from oldest to newest
    .sort([["_id", 1]])
    .populate("project")
    .populate("createdBy", { name: 1 })
    .exec(function (err, campaigns) {
      console.log(
        "In Campaign query, campaigns before filter are : " +
          JSON.stringify(campaigns)
      );
      if (err) {
        return handleError(res, err);
      }
      campaigns = campaigns.filter((campaign) => campaign.active == true);

      Engagement.find({ createdBy: req.body._id })
        // sorting from newest to oldest
        .sort([["_id", -1]])
        .exec(function (err, engagements) {
          if (err) {
            return handleError(res, err);
          }

          var selectedCampaign = null;
          var foundSelectedCampaign = false;
          var count = 0;

          var foundFlag = false;

          for (const campaignElement of campaigns) {
            foundFlag = false;
            for (const engagementElement of engagements) {
              if (
                campaignElement.id == engagementElement.campaign &&
                engagementElement.complete && engagementElement.correct
              ) {
                foundFlag = true;
                break;
              }
            }

            if (!foundFlag) {
              selectedCampaign = campaignElement;

              // Why set both createdBy and xchaneUser to same value??
              req.body.createdBy = req.body._id;
              req.body.campaign = selectedCampaign.id;
              req.body.xchaneUser = req.body._id;
              req.body.project = selectedCampaign.project.id;

              var id = new mongoose.Types.ObjectId();
              console.log("id is : " + id);
              req.body._id = id;

              Engagement.create(req.body, function (err, engagement) {
                // console.log(
                //   "In create engagement, req.body is : " +
                //     JSON.stringify(req.body)
                // );
                if (err) {
                  console.log("Error is :" + err);
                  return handleError(res, err);
                }
                return res.status(201).json(engagement);
              });
            }

            if (selectedCampaign != null) {
              break;
            }
          }

          if (selectedCampaign == null) {
            return res.status(404).send("No active campaign found");
          }
        });
    });
};

exports.getEngagement = function (req, res) {
  Engagement.findById(req.params.id)
    .populate("campaign")
    .exec(function (err, engagement) {
      console.log("engagement", engagement);
      if (err) {
        return handleError(res, err);
      }
      if (!engagement) {
        return res.status(404).send("Not Found");
      }
      res.json(engagement);
    });
};

// Get list of engagements
exports.index = function (req, res) {
  Engagement.find(query)
    // sorting from newest to oldest
    .sort([["_id", -1]])
    .populate("createdBy", { name: 1 })
    .exec(function (err, engagements) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(engagements);
    });
};

// // Answer verification
// exports.answer = function (req, res) {
//   console.log("Answer : " + req.body.answer);
//   console.log("Engagement Id : " + req.body.engagementId);

//   var engagement;

//   Campaign.findById(req.body.campaignId).exec(function (err, campaign) {
//     console.log("campaign", campaign);

//     if (campaign.verificationAnswer == req.body.answer) {
//       Engagement.findById(req.body.engagementId)
//         .populate("campaign")
//         .populate("xchaneuser")
//         .exec(function (err, engagement) {
//           console.log("engagement", engagement);

//           if (err != null || engagement == null) {
//             return res.status(404).send(err);
//           }

//           engagement.complete = true;
//           engagement.save();
//           console.log("Saved engagement.");

//           XchaneUser.findById({ _id:  engagement.createdBy }).exec(function (err, user) {
//             console.log("engagement", user);

//             user.credits += engagement.creditValue;

//             var conditions = { _id: engagement.createdBy._id };
//             XchaneUser.update(conditions, user).then((doc) => {
//               if (!doc) {
//                 console.log("Err : " + err);
//                 handleError(err);
//               } else {
//                 console.log("Updated user obj : " + JSON.stringify(doc));
//               }

//               console.log("User credit saved");
//               return res.status(200).json(engagement);

//               // saved!
//             });

//             /*user.save(function (err, updatedObject) {
//                                     if (err) {
//                                         console.log("Err : " + err);
//                                         handleError(err);
//                                     }
//                                     else
//                                     {
//                                         console.log("Updated user obj : " + JSON.stringify(updatedObject));
//                                     }
//                                     console.log("User credit saved");
//                                     // saved!
//                                 })*/
//             console.log("Saved User.");
//           });
//         });
//     } else {
//       // Can a wrong answer even get to the backend??
//       // It should because we have to record a failed engagement
//     }

//     if (err) {
//       return handleError(res, err);
//     }
//   });
// };

// Answer verification
exports.answer = function (req, res) {
  console.log("Answer : " + req.body.answer);
  console.log("Engagement Id : " + req.body.engagementId);

  var engagement;

  Campaign.findById(req.body.campaignId).exec(function (err, campaign) {
    console.log("campaign", campaign);

    Engagement.findById(req.body.engagementId)
      .populate("campaign")
      .populate("xchaneuser")
      .exec(function (err, engagement) {
        console.log("engagement", engagement);

        if (err != null || engagement == null) {
          return res.status(404).send(err);
        }

        if (campaign.verificationAnswer == req.body.answer) {
          engagement.complete = true;
          engagement.correct = true;
          engagement.creditsEarned = engagement.creditValue;
          engagement.save();
          console.log("Saved engagement.");

          XchaneUser.findById(engagement.xchaneUser).exec(
            function (err, user) {
              if (err) {
                return handleError(res, err);
              }

              console.log("engagement", user);

              user.credits += engagement.creditValue;

              var conditions = { _id: engagement.createdBy._id };
              XchaneUser.update(conditions, user).then((doc) => {
                if (!doc) {
                  console.log("Err : " + err);
                  handleError(err);
                } else {
                  console.log("Updated user obj : " + JSON.stringify(doc));
                }

                console.log("User credit saved");
                return res.status(200).json(engagement);
              });

              console.log("Saved User.");
            }
          );
        } else {
          engagement.complete = true;
          engagement.correct = false;
          engagement.creditsEarned = 0;
          engagement.save();

          return res.status(200).json(engagement);
        }
      });
  });

  function handleError(res, err) {
    return res.status(500).send(err);
  }
};
