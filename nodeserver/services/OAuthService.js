var models = require('../models');
var userService = require('./UserService');
var debug = require('debug')('dev');
var model = require('../models');

var OAuthRefreshTokensModel = model('OAuthRefreshTokens');
var OAuthAccessTokensModel = model('OAuthAccessTokens');
var OAuthClientsModel = model('OAuthClients');

exports.getRefreshToken =  function(refreshToken, callback){
  debug('Get refresh token: ' + refreshToken);
  OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, callback);
};

exports.saveRefreshToken = function(refreshToken, clientId, expires, userId, callback){
  if(userId.id) {
    userId = userId.id;
  }

  debug("saving" + "(refreshToken: " + refreshToken + ", clientId: " + clientId + ", userId: " + userId + ", expires: " + expires + ")");

  OAuthRefreshTokensModel.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $set: {
        refreshToken: refreshToken,
        clientId: clientId,
        userId: userId,
        expires: expires
    } },
    { upsert: true },
    callback
  );
};

exports.getAccessToken = function(bearerToken, callback) {
  debug("get access token: " + bearerToken);

  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

exports.saveAccessToken = function(accessToken, clientId, expires, userId, callback) {
  if (userId.id) {
    userId = userId.id;
  }
  debug("saving" + "(accessToken: " + accessToken + ", clientId: " + clientId + ", userId: " + userId + ", expires: " + expires + ")");

  OAuthAccessTokensModel.findOneAndUpdate(
    { accessToken: accessToken },
    { $set: {
        accessToken: accessToken,
        clientId: clientId,
        userId: userId,
        expires: expires
    } },
    { upsert: true },
    callback
  );

};

exports.getClient = function(clientId, clientSecret, callback) {
  var params = {clientId: clientId};
  if (clientSecret) params.clientSecret = clientSecret;
  OAuthClientsModel.findOne(params, callback);
};

exports.saveClient = function(client, callback) {
  new OAuthClientsModel(client).save(callback);
};

exports.grantTypeAllowed = function(clientId, grantType, callback) {
  OAuthClientsModel.findOne({
    clientId: clientId,
    grantType: {$in: [grantType]}
  }, function(err, doc) {
    if (err) {
      console.warn("client: " + clientId + "grant type" + grantType + "not allowed");
      callback(err, false);
    } else {
      debug("client: " + clientId + " grant type " + grantType + " allowed");
      callback(false, true);
    }
  });
};

exports.getUser = function(username, password, callback) {
  userService.getUser({ email: username, password: password }, callback);
};