var express = require('express');
var router = express.Router();
var UserService = require('../services/UserService');

router.route('/oauth/farm')
  .get(function(req, res, next) {
    UserService.getFarmsByUser({ user: req.user }, function(err, farms) {
      if (err) return next(err);
      res.json(farms);
    });
  })
  .post(function(req, res, next) {
    var farm = req.body.farm;
    if (!farm) return next(new Error('farm is required'));
    UserService.saveFarm({ user: req.user, farm: farm }, function(err, farm) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

module.exports = router;
