var express = require('express');
var router = express.Router();
var auth = require('../services/authencation');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
  var data = {
    username: req.body.username,
    password: req.body.password
  };
  auth.authencateLocal(data, function(suc) {
    if(suc) {
      res.send('Successful Logged in!');
    } else {
      res.send('Invalid username/password!');
    }
  }, function(err) {

  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

module.exports = router;
