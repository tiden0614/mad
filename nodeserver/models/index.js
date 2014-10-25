require('./mad');
require('./oauth');
var mongoose = require('mongoose');
var config = require('../config');

console.log('Connect to db: ' + config.db);
mongoose.connect(config.db, {});

module.exports = function(modelName) {
    return mongoose.model(modelName);
};