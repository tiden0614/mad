//App configuration
var appConfig = require('../config/app-config');

//Database connections
var mongo = require('mongodb');
var monk = require('monk');
var logger = require('debug')('dev');

var dbAddr = process.env.DBADDR || appConfig.dbAddr;
logger('Connectiong to ' + dbAddr);
module.exports = monk(dbAddr);