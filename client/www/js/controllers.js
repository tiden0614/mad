angular.module('farmers.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $state, Request, LocationService) {

    $scope.loginLogoutStr = 'Login';

    if (!$rootScope) {
      $rootScope.locationList = [];
    }

    if (Request.isLoggedIn()) {
      $scope.loginLogoutStr = 'Logout';
      LocationService.all(function(list) {
       $rootScope.locationList = list;
      });
    }


    $scope.sideMenu = {
        shouldEnable: true
    };

    $scope.search = function () {
      $state.go('search');
    };

    // Open the login modal
    $scope.loginLogout = function () {
      if (Request.isLoggedIn()) {
        Request.logout();
      } else {
        $state.go('login');
      }
    };
  })


  .controller('ForecastsCtrl', function ($scope, ForecastList, $state) {
    $scope.forecastList = ForecastList.all();

    $scope.alert = function () {
      $state.transitionTo('app.alert');
    };

    $scope.search = function () {
      $state.go('search');
    };




    $scope.expand = function (id) {
      var expandItem = jQuery(".forecast-list [data-forecast-id=" + id + "]");
      if (expandItem.hasClass("opened")) {
        expandItem.removeClass("opened");
      } else {
        jQuery(".forecast-list .forecast-item").removeClass("opened");
        // expandItem.parents(".scroll").animate({
        // 	scrollTop: expandItem.offset().top
        // }, 1000);
        //expandItem.parents("div.scroll").scrollDiv.css("-webkit-transform", "translated3d(0px, -" + expandItem.position().top + "px, 0px) scale(1)");
        expandItem.addClass("opened");
        if (!expandItem.hasClass("data-loaded")) {
          $scope.forecastList[id].detail = ForecastList.getForecastDetail(id);
          expandItem.addClass("data-loaded");
        }
      }
    }



  })

  .controller('AlertCtrl', function ($scope, $state) {
  })

  .controller('LoginCtrl', function($scope, $http, $location, $rootScope, $state, Request){
    $scope.loginData = {};

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      Request.login($scope.loginData, function(status, userEmail) {
        if (status != 200) {
          //TODO Do something when login failed
        } else {
          $state.go('app.forecasts');
        }
      });
    };

  })

  .controller('SignupCtrl',function($state, $scope, Request){
    $scope.photoAdded = false;
    $scope.user = {};
    $scope.pwdNotSame = true;
    $scope.$watch('user.pwd1',function() {$scope.test()});
    $scope.$watch('user.pwd2',function() {$scope.test()});
    $scope.test = function(){
      $scope.pwdNotSame = $scope.user.pwd1 !== $scope.user.pwd2;
    };

    $scope.submit = function(){
      var user = $scope.user;
      console.log(user);
      Request.signup({
        email: user.email,
        name: user.name,
        password: user.pwd1,
        gender: user.gender,
        phone: user.phone || "",
        address: user.address || ""
      },function(status, data){
        if (status == 200) {
          console.log("signup successful");
          // Auto login after signup
          Request.login({
            email: user.email,
            password: user.pwd1
          }, function(status) {
            if (status == 200) {
              console.log('login successfully');
              $state.go("app.forecasts");
            } else {
              // TODO do something when login failed
            }
          });
        } else {

        }
      });
    }
  })

.controller('ForecastDetailCtrl', function ($scope, $stateParams, RainfallThreeHourlyList){
    var detailURL="templates/weather.json";
    var windSpeed = [{"key": "Wind", "values": []}];
    var tempDaily = [];
    var rainfallList = [];

    jQuery.getJSON(detailURL, function(data){

    for (var i=0; i<24; i++){
        var windArray = [new Date (0,0,0,i,0,0), data.windSpeed[i]];
        windSpeed[0].values.push(windArray);

        var tempObj = {hour: i, temp_hourly: data.temp[i]};
        tempDaily.push(tempObj);
    }

    for (var i=0; i<8; i++){
        if (i < 6){
            var rainObj ={startHour: 3*i+6+':00', endHour:3*(i+1)+6+':00', chanceOfAnyRain: data.chanceOfRain[i], expectedRainfallAmount: data.likelyRainfall[i], imgSourceId: '0'};
            rainfallList.push(rainObj);
        } else {
            var rainObj ={startHour: 3*(i-6)+':00', endHour:3*(i-5)+':00', chanceOfAnyRain: data.chanceOfRain[i], expectedRainfallAmount: data.likelyRainfall[i], imgSourceId: '0'};
            rainfallList.push(rainObj);
        }

    }
    //alert([0].values.length);
    $scope.windSpeed=windSpeed;
    $scope.rainfallList = rainfallList;

    $scope.temps_hourly=[];

                     // need to change if updated
                     //      var tempDetail_width = $(window).width();
    var tempDetail_width = 998;
    var tempDetail_height = 135;

    function getMaxTemp(tempArray){
        var temp = tempArray[0].temp_hourly;
        for(i in tempArray){
            if( tempArray[i].temp_hourly>temp)
            {
            temp = tempArray[i].temp_hourly;
            }
        }
        return temp;
    };

    function getMinTemp(tempArray){
        var temp = tempArray[0].temp_hourly;
        for(i in tempArray){
            if( tempArray[i].temp_hourly<temp)
            {
            temp = tempArray[i].temp_hourly;
            }
        }
        return temp;
    };

    var tempMax = getMaxTemp(tempDaily);
    var tempMin = getMinTemp(tempDaily);

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

    });


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
            return tickVals;
        }
    }

})
