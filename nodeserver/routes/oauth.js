var router = require('express').Router();
var oauthserver = require('node-oauth2-server');

var OAuthService = require('../services/OAuthService');
var UserService = require('../services/UserService');

var oauth = oauthserver({
  model: OAuthService,
  grants: ['password', 'refresh_token'],
  debug: true
});

router.route('/oauth/token').post(oauth.grant()).get(function(req, res) {
  res.status(405).end();
});

router.route('/oauth()|(/*)').all(oauth.authorise(), function(req, res, next) {
  if (req.path === '/oauth') {
    res.sendStatus(200);
  } else {
    UserService.getUserById({ id: req.user.id }, function(err, user) {
      //if (err) {
      //  next(err);
      //} else {
        req.user = user;
        next(err);
      //}
    });
  }
});

module.exports = router;