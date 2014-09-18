angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ForecastListCtrl', function($scope) {
  $scope.forecastList = [
    {day: '8', month: '9', weekday: 'Mon', rainfall_chance: '70%', rainfall_amount: '2~5mm', sky: 'sunny', temp:''},
    {day: '9', month: '9', weekday: 'Tue', rainfall_chance: '50%', rainfall_amount: '1~3mm', sky: 'cloudy', temp:'14C'},
    {day: '10', month: '9', weekday: 'Wed', rainfall_chance: '90%', rainfall_amount: '8~10mm', sky: 'thunder', temp:''},
    {day: '11', month: '9', weekday: 'Thu', rainfall_chance: '90%', rainfall_amount: '5~7mm', sky: 'rainy', temp:''},
    {day: '12', month: '9', weekday: 'Fri', rainfall_chance: '70%', rainfall_amount: '3~5mm', sky: 'rainy', temp:''},
    {day: '13', month: '9', weekday: 'Sat', rainfall_chance: '2%', rainfall_amount: '1~3mm', sky: 'sunny', temp:''},
    {day: '14', month: '9', weekday: 'Sun', rainfall_chance: '0%', rainfall_amount: '', sky: 'hurricane', temp:''}
  ];
});
