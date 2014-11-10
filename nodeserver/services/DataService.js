var detailJSON = require('./detail-forecast.js');

exports.getDetailData = function(data, callback) {
  // TODO implement this
  if (callback && typeof callback == 'function') {
    callback(null, detailJSON);
  }
};

exports.getBriefData = function(data, callback) {
  // TODO implement this
  if (callback && typeof callback == 'function') {
    callback(null, detailJSON);
  }
};

exports.getNotificationData = function(data, callback) {
  // TODO implement this
  if (callback && typeof callback == 'function') {
    callback(null, detailJSON);
  }
};
