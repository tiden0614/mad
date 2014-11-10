/* index for data model */
var data_sets = {
  development: ['OAuthClients', 'Users'],
  test: ['OAuthClients', 'Users'],
  bluemix: ['OAuthClients', 'Users']
};

module.exports = function(env) {
  env = env || 'development';
  var res = {};
  data_sets[env].forEach(function(name) {
    res[name] = require('./' + name);
  });
  return res;
};
