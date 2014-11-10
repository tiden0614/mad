angular.module('farmers.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $state, $timeout, LocationList) {

        $scope.sideMenu = {
            shouldEnable: true
        };

    $scope.search = function () {
      $state.transitionTo('app.search');
    }

    $scope.locationList = LocationList.all();

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

  })


  .controller('ForecastsCtrl', function ($scope, ForecastList, $state, $stateParams) {
    if($stateParams.latitude==null||$stateParams.longitude==null){
        if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                        $stateParams.latitude = position.coords.latitude;
                        $stateParams.longitude = position.coords.longitude;
                        });
        }else {
                         // Browser doesn't support Geolocation
                        handleNoGeolocation(false);
              }


        function handleNoGeolocation(errorFlag) {
                     if (errorFlag) {
                         var content = 'Error: The Geolocation service failed.';
                         alert(content);
                     } else {
                         var content = 'Error: Your browser doesn\'t support geolocation.';
                         alert(content);
                     }

        }
    }

    $scope.forecastList = ForecastList.all();

    $scope.alert = function () {
      $state.transitionTo('app.alert');
    };

    $scope.search = function () {
      $state.transitionTo('app.search');
    };


    $scope.getData=function(){
        var urlStr= "http://bom.mybluemix.net/getForecast.jsp?latitude=" + $stateParams.latitude+ "&longitude=" + $stateParams.longitude;
        $.get(urlStr,
        function(data, status){
            var forecastItem={
                id: "",
                day:"",
                month:"",
                weekday:"",
                humidity:"",
                chanceOfRain:"",
                likelyRainfall:"",
                currentTemp:"",
                maxTemp:"",
                minTemp:"",
                sky:""
             }
            var skyList=new Array("cloudy", "sunny", "thunder", "rainy", "fog", "degree", "hurricane", "smallrain"  )
            var forecastList=new Array(7);
            for(var i=0;i<data.length,i++){
                forecastItem.id=i;
                forecastItem.day=data[i].getDate();
                forecastItem.month=data[i].getMonth();
                forecastItem.weekday=data[i].getDay();
                forecastItem.humidity=data[i].humidity;
                forecastItem.chanceOfRain=data[i].chanceOfRain;
                forecastItem.likelyRainfall=data[i].likelyRainfall;
                forecastItem.currentTemp=data[i].currentTemp;
                forecastItem.maxTemp=data[i].maxTemp;
                forecastItem.minTemp=data[i].minTemp;
                forecastItem.sky=skyList[i];
                forecastList[i]=forecastItem;
            }
        }
    };


  });






  .controller('AlertCtrl', function ($scope, $state) {
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

.controller('ForecastDetailCtrl', function ($scope, $stateParams, ForecastList, TempHourlyList, RainfallThreeHourlyList){
    $scope.forecast = ForecastList.getForecastDetail();

    $scope.rainfallList = RainfallThreeHourlyList.all();

                  $scope.temps_hourly=[];
                  var tempDaily = TempHourlyList.all();

                 // need to change if updated
                 //      var tempDetail_width = $(window).width();
                  var tempDetail_width = 998;
                  var tempDetail_height = 135;

                  var tempMax = TempHourlyList.getMaxTemp();
                  var tempMin = TempHourlyList.getMinTemp();

                    for ( i in tempDaily) {
                                                    if (tempDaily[i].hour<13){
                                                      $scope.temps_hourly.push({
                                                            x : i * tempDetail_width/( tempDaily.length + 1)+10,
                                                            y : (tempDetail_height*0.4/( tempMax - tempMin + 1)) * ( tempMax - tempDaily[i].temp_hourly)+20 ,
                                                            v:  tempDaily[i].temp_hourly+'\u00b0C',
                                                            t:  tempDaily[i].hour+'AM'
                                                          });
                                                      }else{
                                                       $scope.temps_hourly.push({
                                                                             x : i * tempDetail_width/( tempDaily.length + 1)+10,
                                                                             y : (tempDetail_height*0.4/( tempMax - tempMin + 1)) * ( tempMax - tempDaily[i].temp_hourly)+20 ,
                                                                             v:  tempDaily[i].temp_hourly+'\u00b0C',
                                                                             t:  tempDaily[i].hour+'PM'
                                                                            })
                                                      }
                                           }

            $scope.xAxisTickFormat = function(){
                return function(d){
                    return d3.time.format('%H')(new Date(d));
                }
            }

            $scope.xAxisTickValues = function(){
                return function(d){
                    var tickVals = [];
                    var values = d[0].values;
                    for (var i in values){
                        tickVals.push(values[i][0]);
                    }
                    console.log('xAxisTickValuesFunction', d);
                    return tickVals;
                }
            }
})
