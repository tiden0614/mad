angular.module('farmers.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $state, Request, LocationService, $ionicSideMenuDelegate) {

    $scope.loginLogoutStr = 'Login';

    if (Request.isLoggedIn()) {
      $scope.loginLogoutStr = 'Logout';
    }

    if (!$rootScope.locationList) {
      $rootScope.locationList = [];
    }

    $scope.locationList = $rootScope.locationList;

    $scope.sideMenu = {
      shouldEnable: true
    };

    $scope.search = function() {
      $state.go('search');
    };

    // Open the login modal
    $scope.loginLogout = function () {
      if (Request.isLoggedIn()) {
        $rootScope.locationList = null;
        $scope.loginLogoutStr = 'Login';
        $scope.locationList = $rootScope.locationList = [];
        Request.logout();
        if ($ionicSideMenuDelegate.isOpen()) {
          $ionicSideMenuDelegate.toggleLeft();
        }
      } else {
        $state.go('login');
      }
    };

    $scope.deleteLocation = function(index) {
      if ($rootScope.locationList.length > index) {
        var tobeDeleted = $rootScope.locationList[index];
        $rootScope.locationList.splice(index, 1);
        //$scope.locationList = $rootScope.locationList;
        LocationService.deleteLocation(tobeDeleted, function(data, status) {
          if (status == 200) {
            console.log('successfully deleted farm');
          } else {
            console.warn(status + ': error happened deleting farm ' + data);
          }
        });
      }
    }
  })


  .controller('ForecastsCtrl', function ($scope, ForecastList, $state, $stateParams, $rootScope, Request, LocationService) {
    if ($stateParams.latitude == null || $stateParams.longitude == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          $stateParams.latitude = position.coords.latitude;
          $stateParams.longitude = position.coords.longitude;
        });
      } else {
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

    $scope.alert = function () {
      $state.transitionTo('alert');
    };

    $scope.search = function () {
      $state.go('search');
    };

    if (!$scope.forecastList) {
      $scope.forecastList = [];
    }

    /* FIXME You'd better put such logic into a service */

    (function () {
      var urlStr = "/data/brief?latitude=" + $stateParams.latitude + "&longitude=" + $stateParams.longitude;
      Request.withoutAuth({
          url: urlStr
        },
        function (data, status, headers, config) {
          $scope.forecastList = [];
          var skyList = ["cloudy", "sunny", "thunder", "rainy", "fog", "degree", "hurricane", "smallrain"];
          for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].date);
            $scope.forecastList.push({
              id: i,
              day: date.getDate(),
              month: date.getMonth(),
              weekday: date.getDay(),
              humidity: data[i].humidity,
              chanceOfRain: data[i].chanceOfRain,
              likelyRainfall: data[i].likelyRainfall,
              currentTemp: data[i].currentTemp,
              maxTemp: data[i].maxTemp,
              minTemp: data[i].minTemp,
              sky: skyList[i]
            });
          }
        }
      )

    })();


  })


  .controller('AlertCtrl', function ($scope, $state, $http, WarningsList, Request) {
    $scope.warning = [];
    var thunderstorm = WarningsList.allThunder();
    var fog = WarningsList.allFog();
    var frozen = WarningsList.allFrozen();
    var frost = WarningsList.allFrost();
    var precip = WarningsList.allPrecip();

    //    $scope.loginUser = function(user){

    /* FIXME You'd better put such logic into a service */

    Request.withoutAuth({url: '/data/notification'}, function (data, status, headers, config) {
      if (data == "") {
        alert("No location Founded");
      }
      else {
        //todo: create a general function for thunderstorm,fog,frost,froze,precipitation
        for (i in data.thunderstorm) {
          if (data.thunderstorm[i].code != '0') {
            for (j in thunderstorm) {
              if (data.thunderstorm[i].code == thunderstorm[j].code) {
                $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
                  presence: 'Thunderstorm',
                  intensity: thunderstorm[j].intensity,
                  coverage: thunderstorm[j].coverage,
                  attribute: thunderstorm[j].attribute,
                  //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
                  time: data.baseTime
                });
                //      alert(thunderstorm[j].intensity+";"+thunderstorm[j].coverage+""+thunderstorm[j].attribute);
                break;
              }
            }
          }
        }
        for (i in data.fog) {
          if (data.fog[i].code != '0') {
            for (j in fog) {
              if (data.fog[i].code == fog[j].code) {
                $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
                  presence: 'Fog',
                  intensity: fog[j].intensity,
                  coverage: fog[j].coverage,
                  attribute: fog[j].attribute,
                  //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
                  time: data.baseTime
                });
                break;
              }
            }
          }
        }
        for (i in data.frost) {
          if (data.frost[i].code != '0') {
            for (j in frost) {
              if (data.frost[i].code == frost[j].code) {
                $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
                  presence: 'Frost',
                  intensity: frost[j].intensity,
                  coverage: frost[j].coverage,
                  attribute: frost[j].attribute,
                  //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
                  time: data.baseTime
                });
                break;
              }
            }
          }
        }
        for (i in data.fronzenPrec) {
          if (data.fronzenPrec[i].code != '0') {
            for (j in frozen) {
              if (data.fronzenPrec[i].code == frozen[j].code) {
                $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
                  presence: 'Frozen',
                  intensity: frozen[j].intensity,
                  coverage: frozen[j].coverage,
                  attribute: frozen[j].attribute,
                  //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
                  time: data.baseTime
                });
                break;
              }
            }
          }
        }
        for (i in data.precipitation) {
          if (data.precipitation[i].code != '0') {
            for (j in precip) {
              if (data.precipitation[i].code == precip[j].code) {
                $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
                  presence: 'Precipitation',
                  intensity: precip[j].intensity,
                  coverage: precip[j].coverage,
                  attribute: precip[j].attribute,
                  //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
                  time: data.baseTime
                });
                break;
              }
            }
          }
        }
      }

    });
  })

  .controller('LoginCtrl', function ($scope, $rootScope, $state, Request, LocationService) {
    $scope.loginData = {};

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      Request.login($scope.loginData, function (status, userEmail) {
        if (status != 200) {
          //TODO Do something when login failed
        } else {
          LocationService.all(function (list) {
            $rootScope.locationList = list;
            $state.go('app.forecasts');
          });
        }
      });
    };

  })

  .controller('SignupCtrl', function ($state, $scope, Request) {
    $scope.photoAdded = false;
    $scope.user = {};
    $scope.pwdNotSame = true;
    $scope.$watch('user.pwd1', function () {
      $scope.test()
    });
    $scope.$watch('user.pwd2', function () {
      $scope.test()
    });
    $scope.test = function () {
      $scope.pwdNotSame = $scope.user.pwd1 !== $scope.user.pwd2;
    };

    $scope.submit = function () {
      var user = $scope.user;
      console.log(user);
      Request.signup({
        email: user.email,
        name: user.name,
        password: user.pwd1,
        gender: user.gender,
        phone: user.phone || "",
        address: user.address || ""
      }, function (status, data) {
        if (status == 200) {
          console.log("signup successful");
          // Auto login after signup
          Request.login({
            email: user.email,
            password: user.pwd1
          }, function (status) {
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

  .controller('ForecastDetailCtrl', function ($scope, $stateParams, RainfallThreeHourlyList, Request) {
    var windSpeed = [{"key": "Wind", "values": []}];
    var tempDaily = [];
    var rainfallList = [];

    var msecPerDay = 24 * 60 * 60 * 1000;
    Date.prototype.goto = function(n) {
    	this.setTime(this.getTime() + n*msecPerDay);
    	return this;
    };

    var date = new Date();
    date.goto($stateParams.forecastId);

    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    date = yyyy+'-'+mm+'-'+dd;

    /* FIXME You'd better put such logic into a service */

    Request.withoutAuth({url: '/data/detail?date='+date+'&latitude='+$stateParams.latitude+'&longtitude='+$stateParams.longtitude}, function (data, status, headers, config) {
      if (data == "") {
        alert("No location Founded");
      } else {

        for (var i = 0; i < 24; i++) {
          var windArray = [new Date(0, 0, 0, i, 0, 0), data.windSpeed[i]];
          windSpeed[0].values.push(windArray);

          var tempObj = {hour: i, temp_hourly: data.temp[i]};
          tempDaily.push(tempObj);
        }

        for (var i = 0; i < 8; i++) {
          if (data.chanceOfRain[i] < 10){
            img = '0';
          } else if (data.chanceOfRain[i] >= 10 && data.chanceOfRain[i] <= 15){
            img = '1';
          }else {
            img ='2';
          }
          if (i < 6) {
            var rainObj = {
              startHour: 3 * i + 6+ ':00',
              endHour: 3 * (i + 1) + 6+ ':00',
              chanceOfAnyRain: data.chanceOfRain[i],
              expectedRainfallAmount: data.likelyRainfall[i],
              imgSourceId: img
            };
            rainfallList.push(rainObj);
          } else {
            var rainObj = {
              startHour: 3 * (i - 6)+ ':00',
              endHour: 3 * (i - 5)+ ':00',
              chanceOfAnyRain: data.chanceOfRain[i],
              expectedRainfallAmount: data.likelyRainfall[i],
              imgSourceId: img
            };
            rainfallList.push(rainObj);
          }

        }
        //alert([0].values.length);
        $scope.windSpeed = windSpeed;
        $scope.rainfallList = rainfallList;
        $scope.temps_hourly = [];

        //todo: modify
        //      var tempDetail_width = $(window).width();
        var tempDetail_width = 998;
        var tempDetail_height = 135;
        var tempMax = 27;
        var tempMin = 7;


        for (i in data.temp) {
          //             if (tempDaily[i].hour<13){
          if (i < 13) {
            $scope.temps_hourly.push({
              x: i * tempDetail_width / ( tempDaily.length + 1) + 10,
              y: (tempDetail_height * 0.4 / ( tempMax - tempMin + 1)) * ( tempMax - data.temp[i]) + 20,
              v: data.temp[i] + '\u00b0C',
              //       t:  tempDaily[i].hour+'AM'
              t: i + ':00'
            });
          } else {
            $scope.temps_hourly.push({
              x: i * tempDetail_width / ( tempDaily.length + 1) + 10,
              y: (tempDetail_height * 0.4 / ( tempMax - tempMin + 1)) * ( tempMax - data.temp[i]) + 20,
              v: data.temp[i] + '\u00b0C',
              t: i + ':00'
            })
          }
        }
      }
    });


    $scope.xAxisTickFormat = function () {
      return function (d) {
        return d3.time.format('%H')(new Date(d));
      }
    };

    $scope.xAxisTickValues = function () {
      return function (d) {
        var tickVals = [];
        var values = d[0].values;
        for (var i in values) {
          tickVals.push(values[i][0]);
        }
        return tickVals;
      }
    }

  })
;
