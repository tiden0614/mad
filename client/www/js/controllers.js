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


  .controller('ForecastsCtrl', function ($scope, ForecastList, $state) {
    $scope.forecastList = ForecastList.all();

    $scope.alert = function () {
      $state.transitionTo('app.alert');
    };

    $scope.search = function () {
      $state.transitionTo('app.search');
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
    var detailURL="templates/weather.json";
    var windSpeed = [{"key": "Wind", "values": []}];
    var tempDaily = [];
    jQuery.getJSON(detailURL, function(data){

    for (var i=0; i<24; i++){
        var windArray = [new Date (0,0,0,i,0,0), data.windSpeed[i]];
        windSpeed[0].values.push(windArray);

        var tempObj = {hour: i, temp_hourly: data.temp[i]};
        tempDaily.push(tempObj);

    }
    //alert([0].values.length);
    $scope.windSpeed=windSpeed;

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

    $scope.rainfallList = RainfallThreeHourlyList.all();

})
