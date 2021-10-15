/**
 * Main application routes
 */

"use strict";

var errors = require("./components/errors");
var path = require("path");

module.exports = function (app) {
  // Insert routes below
  app.use("/api/categories", require("./api/category"));
  app.use("/api/projects", require("./api/project"));
  app.use("/api/campaigns", require("./api/campaign"));
  app.use("/api/productGroups", require("./api/productGroup"));
  app.use("/api/products", require("./api/product"));
  app.use("/api/users", require("./api/user"));
  app.use("/api/engagements", require("./api/engagement"));
  app.use("/api/views", require("./api/view"));
  app.use("/api/xchaneuser", require("./api/xchaneuser"));
  app.use("/api/engagement", require("./api/engagement"));
  app.use("/api/redemption", require("./api/redemption"));
  app.use("/auth", require("./auth"));
  // app.use("/xchane", require("./auth_xchane"));

  // app.use("/auth/local", require("./auth/local"));
  // app.use("/xchane/local", require("./auth_xchane/local"));
  // app.use("/api/xchaneuser/login", require("./api/xchaneuser"));
  // All undefined asset or api routes should return a 404
  app
    .route("/:url(api|auth|components|app|bower_components|assets)/*")
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route("/*").get(function (req, res) {
    res.sendFile(path.resolve(app.get("appPath") + "/index.html"));
  });
};
