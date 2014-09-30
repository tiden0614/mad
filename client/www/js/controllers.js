angular.module('farmers.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $state, $timeout, LocationList) {

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


  .controller('ForecastsCtrl', function ($scope, $state, ForecastList,TempHourlyList) {
    $scope.forecastList = ForecastList.all();


    $scope.alert = function () {
      $state.transitionTo('app.alert');
    };

    $scope.search = function () {
      $state.transitionTo('app.search');
    };

    $scope.drawTemp = function (id) {
              $scope.temps_hourly=[];

             // need to change if updated
              var tempDetail_width = 998;
              var tempDetail_height = 135;

        //      var tempMax = TempHourlyList.getMaxTemp();
        //      var tempMin = TempHourlyList.getMinTemp();
                var tempMax = 28;
                var tempMin = 7;
                var temp_hourly_temp = [8,9,9,11,12,13,14,16,18,20,22,26,28,27,26,24,21,21,19,15,14,12,9,8,7];
                var temp_hourly_hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

             for ( i = 0; i < TempHourlyList.getLength(); i++) {
               if (temp_hourly_hour[i]<13){
                 $scope.temps_hourly.push({
                       x : i * tempDetail_width/(TempHourlyList.getLength()+1)+10,
                       y : (tempDetail_height*0.4/( tempMax - tempMin + 1)) * ( tempMax - temp_hourly_temp[i])+20 ,
                       v:temp_hourly_temp[i]+'\u00b0C',
                       t:  temp_hourly_hour[i]+'AM'
                     });
                 }else{
                  $scope.temps_hourly.push({
                                        x : i * tempDetail_width/(TempHourlyList.getLength()+1)+10,
                                        y : (tempDetail_height*0.4/( tempMax - tempMin + 1)) * ( tempMax - temp_hourly_temp[i])+20 ,
                                        v:temp_hourly_temp[i]+'\u00b0C',
                                        t:  temp_hourly_hour[i]+'PM'
                                       })
                 }
                 }


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


