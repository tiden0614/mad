// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('farmers', ['ionic', 'farmers.controllers', 'farmers.services', 'map.control', 'nvd3ChartDirectives'])


.run(function($ionicPlatform,$rootScope, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.withCredentials = true;

    $httpProvider.defaults.headers.put['Content-Type'] = 'X-Requested-With';
    $httpProvider.defaults.headers.post['Content-Type'] = 'X-Requested-With';

  $stateProvider
    .state('login', {
        url: "/login",
        templateUrl: "templates/login/log-in.html",
        controller: 'LoginCtrl'
      })
      .state('signUp', {
        url: "/signUp",
        templateUrl: "templates/login/sign-up.html",
        controller: 'SignUpCtrl'
      })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.alert', {
        url:"/forecasts/alert",
        views: {
          'menuContent' :{
            templateUrl: "templates/alert.html",
            controller: 'AlertCtrl'
          }
        }
    })

    .state('app.search', {
        url:"/forecasts/search",
        views: {
          'menuContent' :{
            templateUrl: "templates/search.html",
            controller: 'MapCtrl'
          }
        }
    })

    .state('app.forecasts', {
      url: "/forecasts",
      views: {
        'menuContent' :{
          templateUrl: "templates/forecasts.html",
          controller: 'ForecastsCtrl'
        }
      }
    })

    .state('app.forecastDetail', {
        url: "/forecasts/:forecastId",
        views: {
           'menuContent' :{
            templateUrl: "templates/forecast.html",
            controller: 'ForecastDetailCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/forecasts');

});