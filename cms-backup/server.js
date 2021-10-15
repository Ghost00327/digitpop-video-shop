//Install express server
const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();

app.use(cors());
app.options("*", cors());
console.log("Allow CORS");

//CORS middleware
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   next();
// };
// app.use(allowCrossDomain);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/DigitPop-CMS"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/DigitPop-CMS/index.html"));

});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
