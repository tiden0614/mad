var router = require('express').Router();
var DataService = require('../services/DataService');

router.route('/data/detail').get(function(req, res, next) {
  DataService.getDetailData({}, function(err, data) {
    if (err) return next(err);
    res.status(200).send(data);
  });
});

router.route('/data/brief').get(function(req, res, next) {
  DataService.getBriefData({}, function(err, data) {
    if (err) return next(err);
    res.status(200).send(data);
  });
});

router.route('/data/notification').get(function(req, res, next) {
  DataService.getNotificationData({}, function(err, data) {
    if (err) return next(err);
    res.status(200).send(data);
  });
});

module.exports = router;
