var log = require('debug')('dev');
var err = require('debug')('dev');
var db = require('./db');
var crypto = require('crypto');

exports.authencateLocal = function(data, success, error) {
  log('Local Authencation Service');
  if(!(data.username && data.password)) {
    var message = 'Username/Password is missing.';
    err(message);
    error(new Error(message));
    return;
  }
  log('Fetching user:' + data.username);
  db.get('users').findOne({ username: data.username }).on('success', function(result) {
    log('Found user:' + data.username);
    var hash = crypto.createHash('md5').update(data.password).digest('hex');
    if(hash === result.pswHash) {
      log('User:' + data.username + ' authencated.');
      success(true);
    } else {
      log('User:' + data.username + 'password invalid.');
      success(false);
    }
  });
};