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

    $scope.alert = function () {
      $state.go('alert');
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


  .controller('ForecastsCtrl', function ($scope, ForecastList, $state, $stateParams, $rootScope, Request, LocationService, WarningsList) {
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

      /*(function () {*/
      /* var urlStr = "/data/brief?latitude=" + $stateParams.latitude + "&longitude=" + $stateParams.longitude;*/
      /*Request.withoutAuth({
       url: urlStr
       },
       function (data, status, headers, config) {
       $scope.forecastList = [];
       var skyList = ["cloudy", "sunny", "thunder", "rainy", "fog", "degree", "hurricane", "smallrain"];
       var weekdayList =["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
       for (var i = 0; i < data.length; i++) {
       var date = new Date(data[i].date);
       $scope.forecastList.push({
       id: i,
       day: date.getDate(),
       month: date.getMonth(),
       weekday: weekdayList[date.getDay()],
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
       )*/
      $scope.forecastList = ForecastList.refresh();
      ForecastList.getData(function (list) {
        $scope.forecastList = list;
      }, $stateParams.latitude, $stateParams.longitude);

      $scope.getWarnNumber = function(){
              return WarningsList.getNumber();
      }

    })



  .controller('AlertCtrl', function ($scope, ForecastList,DetailForecast,WarningsList,$stateParams) {
      var windList =  DetailForecast.getWindList();
      var tempList = DetailForecast.getTempList();
      var rainfallList = DetailForecast.getRainfallList();
      var baseTime = DetailForecast.getBaseTime();
        //it should be getDay(0), but we use Tues. to show demo
      var Today = ForecastList.getDay(2);
      var MaxWind ;

      $scope.sprayList=[];
      $scope.harvestList=[];

          for( i in windList){
                    if(tempList[i].temp<28 &&
                         windList[i].speed>3 && windList[i].speed<15 &&
                         parseInt(rainfallList[parseInt(i/3)].likelyRainfall)==0 &&
                          Today.humidity < -0.0132 * tempList[i].temp * tempList[i].temp + 1.1308 * tempList[i].temp + 65.339 &&
                          Today.humidity > -0.0319 * tempList[i].temp * tempList[i].temp + 3.0117* tempList[i].temp - 11.81
                      ){
                          $scope.sprayList.push({
                          time:windList[i].time,
                          });
                      }
                      if(-0.0026 * Today.humidity * Today.humidity+0.57377 * Today.humidity+23.3523< windList[i].speed){
                          $scope.harvestList.push({
                          time:windList[i].time,
                          });
                      }
                      console.log("i:"+i+";"+windList[i].time);
           }

        $scope.setColor = function(warn){
           if(warn.intensity =="Low")
              return {'background-color':'#ffc800',
              'color':'#636262'
              }
           else
              return {'background-color':'#ff1121',
               'color':'#f4f4f4'
               }
        }
        $scope.warning = WarningsList.getWarningList();
  })

  .controller('LoginCtrl', function ($scope, $ionicLoading, $rootScope, $state, Request, LocationService) {
    $scope.loginData = {};

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        $ionicLoading.show({
            template: 'Logging in<br><i class="icon ion-load-a"></i>',
            animation: 'fade-in'
        });
      Request.login($scope.loginData, function (status, userEmail) {
        if (status != 200) {
          //TODO Do something when login failed
        } else {
            $ionicLoading.hide();
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

  .controller('ForecastDetailCtrl', function ($scope, $stateParams, DetailForecast,RainfallThreeHourlyList, Request) {
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
            $scope.temps_hourly.push({
              x: i * tempDetail_width / ( tempDaily.length + 1) + 10,
              y: (tempDetail_height * 0.4 / ( tempMax - tempMin + 1)) * ( tempMax - data.temp[i]) + 20,
              v: data.temp[i] + '\u00b0C',
              t: i + ':00'
            });
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


    .controller('MapCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, Request, $rootScope, LocationService) {

        $scope.state = {
            isLoggedin: Request.isLoggedIn()
        };

//        $scope.sideMenu.shouldEnable = false;
//        $scope.$on('$destroy', function() {
//            $scope.sideMenu.shouldEnable = true;
//        });

        var map, marker;
        var geocoder = new google.maps.Geocoder();

        function initialize() {
            var mapOptions = {
                zoom: 15
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            // Try HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                    $scope.position = {
                        'lat': position.coords.latitude,
                        'lng': position.coords.longitude
                    };
                    marker = new google.maps.Marker({
                        map: map,
                        position: pos,
                        draggable: true
                        //title: 'title'
                    });

                    google.maps.event.addListener(marker, 'dragend', function (event) {
                        $scope.position = {
                            'lat': event.latLng.lat(),
                            'lng': event.latLng.lng()
                        };
                        geocoder.geocode({'location': event.latLng}, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                alert('Position changed to\n' + results[0].formatted_address);
                                //map.setCenter(results[0].geometry.location);
                            }
                            else {
                                alert('unable to find location');
                            }
                        });
                    });

                    map.setCenter(pos);
                }, function () {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map: map,
                position: new google.maps.LatLng(60, 105),
                content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
        }

        $scope.searchLocation = function () {
            var location = document.getElementById('location').value;
            geocoder.geocode({'address': location, 'region': 'au'}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    marker.setPosition(results[0].geometry.location);
                }
                else {
                    alert("Unable to find location: " + status);
                }
            });
        };


        $scope.addLocation = function(){
            var lat = marker.getPosition().lat();
            var lng = marker.getPosition().lng();
            $ionicPopup.prompt({
                title: 'Add location',
                inputPlaceholder: 'Enter your location name'
            }).then(function(resp){
                if (resp != null){
                    $ionicLoading.show({
                        template: 'Adding Farm...<br><i class="icon ion-load-a"></i>'
                    });
                    var requestContent = {
                        url: '/oauth/farm',
                        method: 'POST',
                        data: JSON.stringify({
                            name: resp,
                            position: {
                                la: lat,
                                lo: lng
                            }
                        }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    };
                    Request.withAuth(requestContent, function(data, status, headers, config){
                        $ionicLoading.hide();
                        if (status == '200'){
                            //$ionicPopup.alert({
                            //    title: 'Post Succeeded'
                            //});
                            //console.log('post succeeded');
                            LocationService.all(function(list) {
                                $rootScope.locationList = list;
                                $state.go('app.forecasts');
                            });
                        }
                        else {
                            //console.log('post failed');
                            $ionicPopup.alert({
                                title: 'Post Failed: ' + status
                            });
                        }
                    })
                }
            });

        };

        google.maps.event.addDomListener(window, 'load', initialize());
    });


//
//
//if (data == "") {
//    alert("No location Founded");
//}
//else {
//    //todo: create a general function for thunderstorm,fog,frost,froze,precipitation
//    for (i in data.thunderstorm) {
//        if (data.thunderstorm[i].code != '0') {
//            for (j in thunderstorm) {
//                if (data.thunderstorm[i].code == thunderstorm[j].code) {
//                    $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
//                        presence: 'Thunderstorm',
//                        intensity: thunderstorm[j].intensity,
//                        coverage: thunderstorm[j].coverage,
//                        attribute: thunderstorm[j].attribute,
//                        //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
//                        time: data.baseTime
//                    });
//                    //      alert(thunderstorm[j].intensity+";"+thunderstorm[j].coverage+""+thunderstorm[j].attribute);
//                    break;
//                }
//            }
//        }
//    }
//    for (i in data.fog) {
//        if (data.fog[i].code != '0') {
//            for (j in fog) {
//                if (data.fog[i].code == fog[j].code) {
//                    $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
//                        presence: 'Fog',
//                        intensity: fog[j].intensity,
//                        coverage: fog[j].coverage,
//                        attribute: fog[j].attribute,
//                        //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
//                        time: data.baseTime
//                    });
//                    break;
//                }
//            }
//        }
//    }
//    for (i in data.frost) {
//        if (data.frost[i].code != '0') {
//            for (j in frost) {
//                if (data.frost[i].code == frost[j].code) {
//                    $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
//                        presence: 'Frost',
//                        intensity: frost[j].intensity,
//                        coverage: frost[j].coverage,
//                        attribute: frost[j].attribute,
//                        //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
//                        time: data.baseTime
//                    });
//                    break;
//                }
//            }
//        }
//    }
//    for (i in data.fronzenPrec) {
//        if (data.fronzenPrec[i].code != '0') {
//            for (j in frozen) {
//                if (data.fronzenPrec[i].code == frozen[j].code) {
//                    $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
//                        presence: 'Frozen',
//                        intensity: frozen[j].intensity,
//                        coverage: frozen[j].coverage,
//                        attribute: frozen[j].attribute,
//                        //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
//                        time: data.baseTime
//                    });
//                    break;
//                }
//            }
//        }
//    }
//    for (i in data.precipitation) {
//        if (data.precipitation[i].code != '0') {
//            for (j in precip) {
//                if (data.precipitation[i].code == precip[j].code) {
//                    $scope.warning.push({  //intensity:"Low",coverage:"Low probability",attribute:
//                        presence: 'Precipitation',
//                        intensity: precip[j].intensity,
//                        coverage: precip[j].coverage,
//                        attribute: precip[j].attribute,
//                        //   time:  data.baseTime.setHours(data.baseTime.getHours()+i)
//                        time: data.baseTime
//                    });
//                    break;
//                }
//            }
//        }
//    }
//}