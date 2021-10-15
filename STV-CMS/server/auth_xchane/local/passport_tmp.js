var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

exports.setup = function (User, config) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
      },
      function (email, password, done) {
        console.log("exchance", email);
        User.findOne(
          {
            email: email.toLowerCase(),
          },
          function (err, user) {
            if (err) return done(err);

            if (!user) {
              console.log("emailError");
              // return done(null, false, {
              //   message: "This email is not registered.",
              // });
              return done(null, {
                message: "2This email is not registered.",
              });
            }
            if (!user.authenticate(password)) {
              console.log("passwordError");
              return done(null, {
                message: "This password is not correct.",
              });
            }
            console.log("correct");
            return done(null, user);
          }
        );
      }
    )
  );

  // serialize
  // passport.serializeUser(function (user, done) {
  //   if (isUser(user)) {
  //     User.isUser;
  //     // serialize user
  //   } else if (isXchaneUser(user)) {
  //     // serialize company
  //   }
  // });
};
