"use strict";

var express = require("express");
var controller = require("./xchane.user.controller");
var config = require("../../config/environment");
var auth = require("../../auth/auth.service");

var router = express.Router();

router.get("/", auth.hasRole("admin"), controller.index);
router.get("/settings", auth.hasRole("admin"), controller.getSettings);
router.delete("/:id", auth.hasRole("admin"), controller.destroy);
router.get("/me", auth.isAuthenticated(), controller.me);
router.put("/:id/password", auth.isAuthenticated(), controller.changePassword);

router.put("/:id/activate", auth.hasRole("admin"), controller.activate);
router.get("/:id", controller.show);
router.post("/", controller.create);
router.post("/login", controller.login);

module.exports = router;
