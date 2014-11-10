var router = require('express').Router();

router.route('/*').all(function(req, res, next) {
  console.log(req.method);
  res.set({
    'Access-Control-Allow-Credentials': 'true'
  });
  if (req.headers['origin']) {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.headers['access-control-request-headers']) {
    res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  }
  if (req.method.toLowerCase() == 'options') {
    res.sendStatus(200);
  } else {
    next();
  }
});

module.exports = router;