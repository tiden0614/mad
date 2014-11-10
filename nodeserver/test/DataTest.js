var request = require('supertest');
var assert = require('assert');
var connection = require('mongoose').connection;
var debug = require('debug')('dev');

var models = require('../models');
var app = require('../app.js');
var DataService = require('../services/DataService');

describe('Data Service Test', function() {

  it('should return detail data', function (done) {
    DataService.getDetailData({}, function (err, data) {
      if (err) return done(err);
      assert(data, "didn't return detail data");
      done();
    });
  });

  it('should return brief data', function (done) {
    DataService.getBriefData({}, function (err, data) {
      if (err) return done(err);
      assert(data, "didn't return brief data");
      done();
    });
  });

  it('should return notification data', function (done) {
    DataService.getNotificationData({}, function (err, data) {
      if (err) return done(err);
      assert(data, "didn't return notification data");
      done();
    });
  });

});

describe('Data Route Test', function() {

  it('should return data of detail page', function(done) {
    request(app)
      .get('/data/detail')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should return data of brief page', function(done) {
    request(app)
      .get('/data/brief')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should return data of notification page', function(done) {
    request(app)
      .get('/data/notification')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});
