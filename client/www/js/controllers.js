angular.module('farmers.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, LocationList) {

  $scope.locationList = LocationList.all();

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

.controller('SignUpCtrl', function($scope, $state){
   $scope.signUser = function(user){

   }
   $scope.toLogin = function(){  $state.transitionTo('login'); }

})


.controller('LoginCtrl', function($scope, $http, $location, $rootScope, $state){

       $scope.user = {};
       $scope.user.email = '';
       $scope.user.password = '';
       //$scope.resetError();

       $scope.loginUser = function(user){
             var url = "http://localhost:8080/login/"+"?email="+ $scope.user.email;
                         $http.get( url).success(function(data,status){
                                  if(data==""){
                                  //   $scope.setError("No Users Founded");
                                      alert("No Users Founded");
                                  }
                                  else if( data == $scope.user.password){
                                      $scope.user.email = '';
                                      $scope.user.password = '';
                                      $state.transitionTo('app.forecasts');
                                  }
                                  else{
                                  //   $scope.setError("Password Invalid");
                                       alert("Password Invalid");
                                  }
                         }).error(function(){
                               alert("Loading failed =_=");
                         });
                      }

       $scope.resetError = function() {
           $scope.error = false;
           $scope.errorMessage = '';
       }

       $scope.setError = function(message) {
           $scope.error = true;
           $scope.errorMessage = message;
           $rootScope.SessionId='';
       }

   $scope.toSignUp = function(){  $state.transitionTo('signUp'); }

   $scope.skipLogin = function(){  $state.transitionTo('app.forecasts'); }
})

.controller('ForecastsCtrl', function($scope, $state, ForecastList) {
  $scope.forecastList = ForecastList.all();

  $scope.alert = function(){
    $state.transitionTo('app.alert');
  };
})

.controller('AlertCtrl', function($scope, $state){
});
