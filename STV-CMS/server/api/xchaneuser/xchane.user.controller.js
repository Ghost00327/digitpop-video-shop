"use strict";

var XchaneUser = require("./xchane.user.model");
var Token = require("./xchane.token.model");
var passport = require("passport");
var config = require("../../config/environment");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

var validationError = function (res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  XchaneUser.find({}, "-salt -hashedPassword", function (err, users) {
    if (err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

exports.getSettings = function (req, res) {
  res.send({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
};

/**
 * GET /confirmation
 */
exports.confirmationPost = function (req, res, next) {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("email", "Email cannot be blank").notEmpty();
  req.assert("token", "Token cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ remove_dots: false });

  // Check for validation errors
  var errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);

  // Find a matching token
  Token.findOne({ token: req.body.token }, function (err, token) {
    if (!token)
      return res.status(400).send({
        type: "not-verified",
        msg: "We were unable to find a valid token. Your token my have expired.",
      });

    // If we found a token, find a matching user
    XchaneUser.findOne(
      { _id: token._userId, email: req.body.email },
      function (err, user) {
        if (!user)
          return res
            .status(400)
            .send({ msg: "We were unable to find a user for this token." });
        if (user.approved)
          return res.status(400).send({
            type: "already-verified",
            msg: "This user has already been verified.",
          });

        // Verify and save the user
        user.approved = true;
        user.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }

          // Send Confirmation Email
          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(
            "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"
          );
          const msg = {
            to: newUser.email,
            from: "no-reply@digitpop.com",
            subject: "Welcome to DigitPop",
            templateId: "d-bae4fec4d9d043b4893711453ecd0736",
            dynamic_template_data: {
              subject: "Testing Templates",
              name: "Some One",
              city: "Denver",
            },
          };

          res.status(200).send("The account has been verified. Please log in.");
        });
      }
    );
  });
};

/**
 * POST /resend
 */
exports.resendTokenPost = function (req, res, next) {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("email", "Email cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ remove_dots: false });

  // Check for validation errors
  var errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);

  XchaneUser.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res
        .status(400)
        .send({ msg: "We were unable to find a user with that email." });
    if (user.approved)
      return res.status(400).send({
        msg: "This account has already been verified. Please log in.",
      });

    // Create a verification token, save it, and send email
    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    // Save the token
    token.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      // Send the email
      var transporter = nodemailer.createTransport({
        service: "Sendgrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
      var mailOptions = {
        from: "no-reply@codemoto.io",
        to: user.email,
        subject: "Account Verification Token",
        text:
          "Hello,\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          req.headers.host +
          "/confirmation/" +
          token.token +
          ".\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send("A verification email has been sent to " + user.email + ".");
      });
    });
  });
};

/**
 * Approves a user
 */
exports.approve = function (req, res, next) {
  console.log("In Xchane server controller, approve method.");
  var userdto = new XchaneUser(req.body);

  XchaneUser.findById(userdto.id).exec(function (err, user) {
    if (err) {
      console.log("Error retrieving user for update.");
      return handleError(res, err);
    }

    // Break Line
    user.approved = true;

    // console.log('updated', project);
    user.save(function (err) {
      console.log("update err", err);
      if (err) {
        return handleError(res, err);
      }

      // Generate
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(
        "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"
      );
      const msg = {
        to: user.email,
        from: "no-reply@digitpop.com",
        subject: "Email Verification for DigitPop",
        templateId: "d-a693f6a039454b0c9ec8c5a570652d30",
        dynamic_template_data: {
          subject: "Testing Templates",
          name: user.name,
          city: "Denver",
          Sender_Name: "Boggs Systems Corporation",
        },
      };

      sgMail
        .send(msg)
        .then(function (response) {
          return res.status(200).json(user); //.send('A verification email has been sent to ' + newUser.email + '.');
        })
        .catch(function (err) {
          return res.status(500).send({ msg: err.message });
        });
    });
  });
};

//// test login xchance user////

exports.login = function (req, res, next) {
  console.log("In Xchane server controller, login method.");
  var loginUser = new XchaneUser(req.body);

  // Check on refererrer code
  /* if (newUser.referrerCode == string.notEmpty) {

    XchaneUser.findOne({ referrerCode: newUser.referrerCode }, function (err, user) {
      if (err) { return res.status(500).send({ msg: err.message }); }
    });
  }; */

  // Make sure this account doesn't already exist
  XchaneUser.findOne({ email: loginUser.email }, function (err, user) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    if (!user) {
      // return res.status(400).send({
      //   msg: "The email has not registered as customer.",
      // });
      return res.status(200).send({
        msg: "The email has not registered as customer.",
      });
    }
    // Make sure user doesn't already exist
    if (user) {
      console.log("login user email is correct");
      if (!user.authenticate(loginUser.password)) {
        console.log("password incorrect");
        return res.status(200).send({
          msg: "user password incorrect.",
        });
      }
      if (user.authenticate(loginUser.password)) {
        console.log("password Correct");
        var auth = require("../../auth/auth.service");
        var token = auth.signToken(user._id, user.role);
        return res.status(200).json({ user: user, token: token });
      }
      // return res.status(400).send({
      //   msg: "The email address you have entered is already associated with another account.",
      // });
    }
    // Create and save the user
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log("In Xchane server controller, create method.");
  var newUser = new XchaneUser(req.body);

  newUser.provider = "local";
  newUser.role = "user";
  newUser.approved = true;

  // Check on refererrer code
  /* if (newUser.referrerCode == string.notEmpty) {

    XchaneUser.findOne({ referrerCode: newUser.referrerCode }, function (err, user) {
      if (err) { return res.status(500).send({ msg: err.message }); }
    });
  }; */

  // Make sure this account doesn't already exist
  XchaneUser.findOne({ email: newUser.email }, function (err, user) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }

    // Make sure user doesn't already exist
    if (user)
      return res.status(200).send({
        msg: "The email address you have entered is already associated with another account.",
      });

    // Create and save the user
    newUser.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      // Create a verification token for this user
      var token = new Token({
        _userId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      // Save the verification token
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        var verificationLink =
          "http://localhost:9002/api/xchaneuser/confirmationPost?token=" +
          token.token;

        return res.status(200).json(newUser);

        // Generate
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey("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");
        // const msg = {
        //   to: newUser.email,
        //   from: 'no-reply@digitpop.com',
        //   subject: 'Email Verification for DigitPop',
        //   templateId: 'd-bae4fec4d9d043b4893711453ecd0736',
        //   dynamic_template_data: {
        //     verificationLink: verificationLink,
        //     subject: 'Testing Templates',
        //     name: 'Some One',
        //     city: 'Denver',
        //   },
        // };

        // sgMail.send(msg).then(function (response) {
        //   return res.status(200).json(newUser);//.send('A verification email has been sent to ' + newUser.email + '.');
        // }).catch(function (err) {
        //   return res.status(500).send({ msg: err.message });
        // });
      });
    });
  });
};
/**
 * Get a single user
 */
exports.redeemPoints = function (req, res, next) {
  var userId = req.params.id;

  XchaneUser.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(404).send("Unauthorized");
    res.json(user);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  XchaneUser.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(404).send("Unauthorized");
    res.json(user);
  });
};

/**
 * Deactivate a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  XchaneUser.findOne(
    { _id: req.params.id, active: true },
    function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(404).send("User not found or deactivated!");
      user.active = false;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.status(200).send(user);
      });
    }
  );
};

/**
 * Activate a user
 * restriction: 'admin'
 */
exports.activate = function (req, res) {
  XchaneUser.findOne(
    { _id: req.params.id, active: false },
    function (err, user) {
      if (err) return next(err);
      if (!user)
        return res.status(404).send("User not found or already active!");
      user.active = true;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.status(200).send(user);
      });
    }
  );
};

// Updates an existing user in the DB.
exports.update = function (req, res) {
  console.log("In update xchane User.  req.params.id is : " + req.params.id);
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.__v) {
    delete req.body.__v;
  }
  XchaneUser.findById(req.params.id).exec(function (err, user) {
    if (err) {
      console.log("Error retrieving user for update.");
      return handleError(res, err);
    }

    if (!user) {
      console.log("User is !user");
      return res.status(404).send("Not Found");
    }

    console.log(
      "In xchane user server controller.  User is : " + JSON.stringify(user)
    );
    console.log(
      "In xchane user server controller.  req.body is : " +
        JSON.stringify(req.body)
    );

    user.introduced = req.body.introduced;

    console.log("User after update in controller is : " + JSON.stringify(user));

    // console.log('updated', project);
    user.save(function (err) {
      console.log("update err", err);
      if (err) {
        return handleError(res, err);
      }

      XchaneUser.findById(user.id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(404).send("Unauthorized");
        console.log(
          "In get xchane user.  Returning user : " +
            JSON.stringify(user.profile)
        );
        res.json(user.profile);
      });
    });
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  XchaneUser.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.status(200).send("OK");
      });
    } else {
      res.status(403).send("Forbidden");
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  console.log("Getting CURRENT USER info in server controller");
  var userId = req.user._id;
  XchaneUser.findOne(
    {
      _id: userId,
    },
    "-salt -hashedPassword",
    function (err, user) {
      // don't ever give out the password or salt
      if (err) return next(err);
      if (!user) return res.status(401).send("Unauthorized");
      res.json(user);
    }
  );
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect("/");
};
