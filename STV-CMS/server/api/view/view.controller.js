"use strict";

var View = require("./view.model");
var Project = require("../project/project.model");

var validationError = function (res, err) {
  return res.status(422).json(err);
};

/**
 * Creates a new view
 */
exports.create = function (req, res, next) {
  Project.findById(req.body.id).exec(function (err, project) {
    console.log("project", project);
    if (err) {
      return handleError(res, err);
    }
    if (!project) {
      return res.status(404).send("Not Found");
    }

    var newView = new View();
    newView.project = project.id;
    newView.bytes = project.media.bytes;
    newView.createdBy = project.createdBy;
    newView.cycle = req.body.cycle;

    newView.save(function (err, view) {
      if (err) return validationError(res, err);
      res.json({ message: "view created", view: newView });
    });
  });
};
