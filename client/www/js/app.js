// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('farmers', ['ionic', 'farmers.controllers', 'farmers.services', 'nvd3ChartDirectives'])


  .run(function ($ionicPlatform, $rootScope, $location) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })


  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $httpProvider.defaults.headers.put['Content-Type'] = 'X-Requested-With';
    $httpProvider.defaults.headers.post['Content-Type'] = 'X-Requested-With';

    $stateProvider

      /* With side-menu */

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })

      .state('app.forecasts', {
        url: "/forecasts?longitude&latitude",
        views: {
          'menuContent': {
            templateUrl: "templates/forecasts.html",
            controller: 'ForecastsCtrl'
          }
        }
      })

      /* Without side-menu */

      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      })

      .state('signup', {
        url: "/signup",
        templateUrl: "templates/sign-up.html",
        controller: 'SignupCtrl'
      })

      .state('alert', {
        url: "/alert",
        templateUrl: "templates/alert.html",
        controller: 'AlertCtrl'
      })

      .state('search', {
        url: "/search",
        templateUrl: "templates/search.html",
        controller: 'MapCtrl'
      })


      .state('forecastDetail', {
        url: "/forecast?forecastId&latitude&longtitude",
        templateUrl: "templates/forecast.html",
        controller: 'ForecastDetailCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/forecasts');

  });