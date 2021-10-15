"use strict";

var express = require("express");
var passport = require("passport");
// const userModel = require('../../api/user/user.model');
var auth = require("../auth.service");

var router = express.Router();

router.post("/", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    var error = err || info;
    console.log(user);
    if (error) return res.status(401).json(error);
    if (!user)
      return res
        .status(404)
        .json({ message: "Something went wrong, please try again." });
    if (user.email && !user.approved && user.role != "admin") {
      return res
        .status(403)
        .send({ code: "NOT_APPROVED", message: "You are not approved yet" });
    }
    if (user.message) {
      console.log("message:", user.message);
      return res.send({ message: user.message });
    }
    var token = auth.signToken(user._id, user.role);
    res.json({ user: user, token: token });
  })(req, res, next);
});

module.exports = router;
