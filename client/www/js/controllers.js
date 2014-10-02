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

  .controller('ForecastsCtrl', function ($scope, $state, ForecastList) {
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
    };

            $scope.windSpeed = [
                {
                    "key": "Wind",
                    "values": [
                        [new Date(0,0,0,00,0,0), 16],
                        [new Date(0,0,0,01,0,0), 13],
                        [new Date(0,0,0,02,0,0), 18],
                        [new Date(0,0,0,03,0,0), 10],
                        [new Date(0,0,0,04,0,0), 9],
                        [new Date(0,0,0,05,0,0), 5],
                        [new Date(0,0,0,06,0,0), 1],
                        [new Date(0,0,0,07,0,0), 0],
                        [new Date(0,0,0,08,0,0), 16],
                        [new Date(0,0,0,09,0,0), 18],
                        [new Date(0,0,0,10,0,0), 30],
                        [new Date(0,0,0,11,0,0), 40],
                        [new Date(0,0,0,12,0,0), 22],
                        [new Date(0,0,0,13,0,0), 16],
                        [new Date(0,0,0,14,0,0), 18],
                        [new Date(0,0,0,15,0,0), 11],
                        [new Date(0,0,0,16,0,0), 8],
                        [new Date(0,0,0,17,0,0), 9],
                        [new Date(0,0,0,18,0,0), 7],
                        [new Date(0,0,0,19,0,0), 6],
                        [new Date(0,0,0,20,0,0), 13],
                        [new Date(0,0,0,21,0,0), 14],
                        [new Date(0,0,0,22,0,0), 7],
                        [new Date(0,0,0,23,0,0), 4]
                    ]
                }];


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

  .controller('AlertCtrl', function ($scope, $state) {
  })


