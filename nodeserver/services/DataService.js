var detailJSON = require('./mock/detail-forecast.js');
var briefJSON = require('./mock/brief-forecast.js');

exports.getDetailData = function(data, callback) {
  // TODO implement this
  if (callback && typeof callback == 'function') {
    callback(null, detailJSON);
  }
};

exports.getBriefData = function(data, callback) {
  // TODO implement this
  if (callback && typeof callback == 'function') {
    callback(null, briefJSON);
  }
};

exports.getNotificationData = function(data, callback) {
  // TODO implement this
  if (callback && typeof callback == 'function') {
    callback(null, detailJSON);
  }
};
