var router = require('express').Router();
var oauthserver = require('node-oauth2-server');

var OAuthService = require('../services/OAuthService');
var UserService = require('../services/UserService');

var oauth = oauthserver({
  model: OAuthService,
  grants: ['password', 'refresh_token'],
  debug: true
});

router.route('/oauth/token')
  .post(
    function(req, res, next) {
      console.log(req.method);
      res.set({
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
        'Access-Control-Allow-Credentials': 'true'
      });
      if (req.method.toLowerCase() == 'options') {
        res.sendStatus(200);
      } else {
        next();
      }
    },
    oauth.grant()
  )
  .get(function(req, res) {
    res.status(405).end();
  });

router.route('/oauth()|(/*)')
  .all(
    function(req, res, next) {
      console.log(req.method);
        res.set({
          'Access-Control-Allow-Origin': req.headers.origin,
          'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
          'Access-Control-Allow-Credentials': 'true'
        });
      if (req.method.toLowerCase() == 'options') {
        res.sendStatus(200);
      } else {
        next();
      }
    },
    oauth.authorise(),
    function(req, res, next) {
      if (req.path === '/oauth') {
        res.sendStatus(200);
      } else {
        UserService.getUserById({ id: req.user.id }, function(err, user) {
          if (err) {
            next(err);
          } else {
            req.user = user;
          }
        });
      }
    }
  );

module.exports = router;