/**
 * Main application file
 */

'use strict';

//require('dotenv').config(process.cwd() + '\\ShopThatVideo\\.env');
var appRoot = require('app-root-path');
var cors = require('cors');
//var dotdenv = require('dotenv');
//require('dotenv').config(appRoot.path+'\\.env'); 
const path = require('path');
const logger = require('heroku-logger')
//var dotenv = require('dotenv').config({path: path.join(__dirname, '.env')})

logger.info('HEROKU LOG TEST');

if (process.env.NODE_ENV !== 'production') require('dotenv').config({path: path.join(__dirname, '.env')})
//require('dotenv').load()
// Set default node environment to development

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

mongoose.Promise = global.Promise;
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var connectionString = config.mongo.uri;
console.log(connectionString);

logger.info('HEROKU LOG : Attempting to connect to DB...');
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology:true
});
mongoose.connection.on('error', function(err) {
	logger.info('HEROKU LOG : Error connecting to DB :' + err);
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});
logger.info('HEROKU LOG : Past DB Connect Attempt');
// Populate DB with sample data
// if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
app.use(cors());
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
