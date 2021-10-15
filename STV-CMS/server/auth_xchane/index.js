"use strict";

var express = require("express");
var passport = require("passport");
var config = require("../config/environment");
//xchane user model
var User = require("../api/user/user.model");
var XUser = require("../api/xchaneuser/xchane.user.model");

// Passport Configuration
// require("../auth/local/passport").setup(User, XUser, config, false);
require("./facebook/passport").setup(User, config);
require("./google/passport").setup(User, config);

var router = express.Router();

router.use("/local", require("./local"));
router.use("/facebook", require("./facebook"));
router.use("/google", require("./google"));

module.exports = router;
