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
    if (!req.body.name) return res.status(400).send('name is required');
    if (!req.body.position || !req.body.position.lo || !req.body.position.la) return res.status(400).send('longitude/latitude is required');
    var farm = { name: req.body.name, position: req.body.position };
    UserService.saveFarm({ user: req.user, farm: farm }, function(err, farm) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

router.route('/oauth/farm/delete')
  .post(function(req, res, next) {
    if (!req.body.name) return res.status(400).send('name is required');
    UserService.deleteFarmByUserAndName({ user: req.user, name: req.body.name }, function(err, doc) {
      if (err) {
        if (err.code == 99) {
          return res.status(400).send(err.message);
        }
        return next(err);
      }
      return res.sendStatus(200);
    });
  });

router.route('/signup')
  .post(function(req, res, next) {
    if (!req.body || !req.body.email) return next(new Error('signup: email is required'));
    if (!req.body.password) return next(new Error('signup: password is required'));
    if (!req.body.name) return next(new Error('signup: name is required'));
    if ((!req.body.name.first) && !(req.body.name.last)) return next(new Error('signup: name is required'));

    var emailTest = /^[a-zA-Z0-9._-]+?@([a-zA-Z0-9._-]+\.?)+$/;
    var passwordTest = /^.{6,}$/;
    var genderTest = /[Mm]|[Ff][Mm]/;
    var phoneTest = /^\+?[0-9]+$/;

    if (!emailTest.test(req.body.email)) {
      return res.status(400).send('invalid email');
    }
    if (!passwordTest.test(req.body.password)) {
      return res.status(400).send('invalid password');
    }
    if (req.body.gender && !genderTest.test(req.body.gender)) {
      return res.status(400).send('invalid gender');
    }
    if (req.body.phone && !phoneTest.test(req.body.phone)) {
      return res.status(400).send('invalid gender');
    }

    var user = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address
    };

    UserService.saveNewUser(user, function(err, doc) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

module.exports = router;
