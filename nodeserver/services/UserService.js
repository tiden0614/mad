var crypto = require('crypto');
var debug = require('debug')('dev');
var model = require('../models');

var UsersModel = model('Users');
var FarmsModel = model('Farms');

exports.authenticate = function(data, callback) {
  callback = callback || function(err) {};
  if (!(data.email && data.password)) {
    callback(new Error('authenticate: Email/Password is required'));
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
  if (!data.email) { callback(new Error('getUserByEmail: Email is required')); }
  UsersModel.findOne({ email: data.email }, callback);
};

exports.getUserById = function(data, callback) {
  data.id = data.id || data._id;
  if (!data.id) { callback(new Error('getUserById: Id is required')); }
  UsersModel.findOne({ _id: data.id }, callback);
};

exports.saveUser = function(data, callback) {
  if (!data || !data.email) return callback(new Error('saveUser: email is required'));
  if (data.password) {
    var password = data.password;
    delete data.password;
    data.hashedPassword = crypto.createHash('md5').update(password).digest('base64');
  }
  UsersModel.findOneAndUpdate({ email: data.email }, data, {upsert: true}, callback);
};

exports.saveNewUser = function(data, callback) {
  if (!data || !data.email) return callback(new Error('saveUser: email is required'));
  if (!data || !data.password) return callback(new Error('saveUser: password is required'));
  if (!data || !data.name) return callback(new Error('saveUser: name is required'));
  var password = data.password;
  delete data.password;
  data.hashedPassword = crypto.createHash('md5').update(password).digest('base64');
  if (!data.passwordResetToken) {
    var pRTSeed = data.hashedPassword + (new Date()).getTime();
    data.passwordResetToken = crypto.createHash('md5').update(pRTSeed).digest('base64');
  }
  new UsersModel(data).save(callback);
};

exports.getFarmsByUser = function(data, callback) {
  if (!data || !data.user) { return callback(new Error('getFarmsByUser: User is required')); }
  FarmsModel.find({ userId: data.user._id }, callback);
};

exports.saveFarm = function(data, callback) {
  if (!data || !data.user) { return callback(new Error('saveFarm: User is required')); }
  if (!data || !data.farm) { return callback(new Error('saveFarm: Farm is required')); }
  if (!data.farm.userId) {
    data.farm.userId = data.user._id;
  }
  FarmsModel.findOneAndUpdate({ userId: data.user._id, name: data.farm.name }, data.farm, { upsert: true }, callback);
};

exports.saveFarms = function(data, callback) {
  if (!data || !data.user) { return callback(new Error('saveFarms: User is required')); }
  if (!data || !data.farms) { return callback(new Error('saveFarms: Farms is required')); }
  if (!data.farms instanceof Array) { return callback(new Error('saveFarms: farms should be an array')); }
  var stop = false;
  var saved = [];
  data.farms.forEach(function(f) {
    if (stop) { return; }
    if (!f.userId) {
      f.userId = data.user._id;
    }
    FarmsModel.findOneAndUpdate({ userId: data.user._id, name: f.name }, f, { upsert: true }, function(err, savedF) {
      if (err) { stop = true; return callback(err); }
      saved.push(savedF);
      if (saved.length >= data.farms.length) {
        return callback(null, saved);
      }
    });
  });
};