var request = require('supertest');
var assert = require('assert');
var connection = require('mongoose').connection;
var debug = require('debug')('dev');

var models = require('../models');
var app = require('../app.js');
var UserService = require('../services/UserService');
var OAuthService = require('../services/OAuthService');

var FarmsModel = models('Farms');
var UsersModel = models('Users');


var fixtures = {
  clients: [{
    clientId: 'forecast',
    clientSecret: '9a5667gfn5h434df7dh8f99',
    redirectUri: '/oauth/redirect',
    grantTypes: ['password', 'refresh_token']
  }],

  users: [{
    email: 'test@andrew.cmu.edu',
    // MD5 hashed password 'testpassword'
    hashedPassword: '4WsquNEjFL9O+9YgOQbqbA==',
    name: { first: "Lee", last: "Yu" }
  }]
};


describe("USER TEST", function() {
  var user;

  before(function(cb) {
    if (connection.readyState !== 1) {
      connection.on('open', onReady);
    } else {
      onReady();
    }

    function onReady () {
      connection.db.dropDatabase(function() {
        UserService.saveUser(fixtures.users[0], function(err, u) {
          if (err) { return cb(err); }
          user = u;
          OAuthService.saveClient(fixtures.clients[0], cb);
        });
      });
    }
  });

  describe('User Service Tests', function() {

    it('should save new user by email and password', function(done) {
      var _new_user_ = {
        email: 'tiden111@gmail.com',
        password: '000000',
        name: {first: 'Daryl', last: 'Zhang'}
      };
      UserService.saveNewUser(_new_user_, function(err, doc) {
        if (err) return done(err);
        assert(doc, "didn't successfully save user");
        done();
      });
    });

    it('should get user by Id', function(done) {
      UserService.getUserById({ id: user._id }, done);
    });

    it('should get user by email', function(done) {
      UserService.getUserByEmail({ email: user.email}, done);
    });

    it('should save farm by user', function(done) {
      var farm = { name: 'A', position: { x: 0, y: 0 } };
      UserService.saveFarm({ user: user, farm: farm }, done);
    });

    it('should save farms by user', function(done) {
      var farms = [
        { name: 'A', position: { x: 1, y: 1 } },
        { name: 'B', position: { x: 1, y: 1 } },
        { name: 'C', position: { x: 1, y: 1 } },
        { name: 'D', position: { x: 1, y: 1 } },
        { name: 'E', position: { x: 1, y: 1 } },
        { name: 'F', position: { x: 1, y: 1 } }
      ];
      UserService.saveFarms({ user: user, farms: farms }, function(err, _fs) {
        if (err) { return done(err); }
        assert(_fs.length >= farms.length);
        done();
      });
    });

    it('should return farms by user', function(done) {
      var farms = [
        { name: 'H', position: { x: 1, y: 1 } },
        { name: 'I', position: { x: 1, y: 1 } },
        { name: 'J', position: { x: 1, y: 1 } },
        { name: 'K', position: { x: 1, y: 1 } },
        { name: 'L', position: { x: 1, y: 1 } },
        { name: 'M', position: { x: 1, y: 1 } }
      ];
      UserService.saveFarms({ user: user, farms: farms }, function(err, _fs) {
        if (err) { return done(err); }
        assert(_fs);
        assert(_fs.length = farms.length);
        UserService.getFarmsByUser({ user: user }, function(err, fs) {
          if (err) { return done(err); }
          assert(fs);
          assert(fs.length >= farms.length);
          done();
        });
      });
    });

    it('should delete a farm', function(done) {
      var afarm = { name: 'tobedeleted', position: { la: 10, lo: 15 } };
      UserService.saveFarm({ user: user, farm: afarm }, function(err, doc) {
        if (err) return done(err);
        assert(doc, "didn't successfully save a farm");
        UserService.deleteFarmByUserAndName({ user: user, name: doc.name }, function(err, farm) {
          if (err) return done(err);
          assert(farm, "didn't successfully delete a farm");
          FarmsModel.findOne({ name: afarm.name }, function(err, doc) {
            if (err) return done(err);
            assert(!doc, "didn't successfully delete a farm");
            done();
          });
        });
      });
    });

  });

  describe('User Route Tests', function() {
    var accessToken;
    var refreshToken;
    var clientId = "forecast";
    var clientSecret = "9a5667gfn5h434df7dh8f99";
    var clientCredentials = new Buffer(clientId + ":" + clientSecret).toString('base64');

    /* Login first */
    before(function(done) {
      request(app)
        .post('/oauth/token')
        .type('form')
        .set('Authorization', 'Basic ' + clientCredentials)
        .send({
          grant_type: 'password',
          username: 'test@andrew.cmu.edu',
          password: 'testpassword'
        })
        .expect(200)
        .end(function(err, res) {
          assert(res.body.access_token, "access_token wasn't set");
          assert(res.body.refresh_token, "refresh_token wasn't set");
          accessToken = res.body.access_token;
          refreshToken = res.body.refresh_token;

          done();
        });
    });

    it('should post a new farm and return 200', function(done) {
      request(app)
        .post('/oauth/farm')
        .type('form')
        .set('Authorization', 'Bearer ' + accessToken)
        .send({
           name: 'ANEWFARM', position: { lo: 100, la: 100 }
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          FarmsModel.findOne({ userId: user._id, name: 'ANEWFARM' }, function(err, f) {
            if (err) return done(err);
            assert.equal(f.name, 'ANEWFARM', "didn't successfully save");
            done();
          });
        });
    });

    it('should return all farms of a user', function(done) {
      var farms = [
        { name: 'HA', position: { x: 1, y: 1 } },
        { name: 'IA', position: { x: 1, y: 1 } },
        { name: 'JA', position: { x: 1, y: 1 } },
        { name: 'KA', position: { x: 1, y: 1 } },
        { name: 'LA', position: { x: 1, y: 1 } },
        { name: 'MA', position: { x: 1, y: 1 } },
        { name: 'MB', position: { x: 1, y: 1 } },
        { name: 'MC', position: { x: 1, y: 1 } }
      ];
      UserService.saveFarms({ user: user, farms: farms }, function(err, _fs) {
        request(app)
          .get('/oauth/farm')
          .set('Authorization', 'Bearer ' + accessToken)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            assert(res.body.length >= farms.length, "server didn't return user farms");
            var found = false;
            for(var i = 0; i < res.body.length; i++) {
              var f = res.body[i];
              if (f.name == 'MC') {
                found = true;
                break;
              }
            };
            assert(found, "the data returned from server doesn't contain what we just added to the database");
            done();
          });
      });
    });

    it('should signup new user', function(done) {
      request(app)
        .post('/signup')
        .type('form')
        .send({
          email: 'testemail@test.email.com',
          password: '000000',
          name: { first: 'firstname', last:'lastname' }
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          UsersModel.findOne({ email: 'testemail@test.email.com' }, function(err, doc) {
            if (err) return done(err);
            assert.equal('firstname', doc.name.first, "didn't successfully save a user");
            done();
          });
        });
    });

    it('should block invalid email when signup', function(done) {
      request(app)
        .post('/signup')
        .type('form')
        .send({
          email: 'invalid&&email@test.email.com',
          password: '000000',
          name: { first: 'namefirst', last:'namelast' }
        })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          UsersModel.findOne({ email: 'invalid&&email@test.email.com' }, function(err, doc) {
            if (err) return done(err);
            assert(!doc, "server didn't block invalid email");
            done();
          });
        });
    });
  });

});
