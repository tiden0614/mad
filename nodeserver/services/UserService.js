var crypto = require('crypto');
var debug = require('debug')('dev');
var model = require('../models');

var UsersModel = model('Users');

exports.authenticate = function(data, callback) {
  callback = callback || function(err) {};
  if (!(data.email && data.password)) {
    callback(new Error('Email/Password is required'));
    return;
  }
  debug('Fetching user: ' + data.email);
  UsersModel.findOne({ email: data.email }, function(err, user) {
    if (err) {
      return callback(err);
    }
    if(!user) {
      return callback(null, null, 'Cannot find user');
    }

    var hash = crypto.createHash('md5').update(data.password).digest('base64');
    if(hash !== user.hashedPassword) {
      callback(null, null, 'Invalid password');
    } else {
      callback(null, user, 'Success');
    }
  });
};

exports.getUserByEmail = function(data, callback) {
  if (!data.email) { callback(new Error('Email is required')); }
  UsersModel.findOne({ email: data.email }, callback);
};

exports.getUserById = function(data, callback) {
  data.id = data.id || data._id;
  if (!data.id) { callback(new Error('Id is required')); }
  UsersModel.findOne({ _id: data.id }, callback);
};

exports.saveUser = function(data, callback) {
  new UsersModel(data).save(callback);
};