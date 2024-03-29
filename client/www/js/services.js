angular.module('farmers.services', ['base64'])
.factory('DetailForecast', function(Request){
var windList = [];
var rainfallList = [];
var tempList = [];
var baseTime;

      Request.withoutAuth({url: '/data/detail?date='+'&latitude='+'&longtitude='}, function (data, status, headers, config) {
      baseTime = new Date(data.baseTime);
      for( i in data.windSpeed){
             var time = new Date();
              time.setTime(baseTime.getTime()+i*60*60*1000);
                 windList.push({
                        speed: data.windSpeed[i],
                        direction: data.windDirection[i],
                        time:time.toLocaleString(),
                 });
       }
       for( i in data.likelyRainfall){
              rainfallList.push({
                  likelyRainfall:data.likelyRainfall[i],
                  chanceOfRain: data.chanceOfRain[i],
              })
         }
        for( i in data.temp){
           tempList.push({
               temp: data.temp[i],
           })
        }
      baseTime = data.baseTime;
  });

  return {
      //TODO: add date parameter
    getWindList: function(){
        return windList;
    },
    getBaseTime: function(){
         return baseTime;
    },
    getTempList: function(){
        return tempList;
    },
    getRainfallList: function() {
      return rainfallList;
    }
  }
})

.factory('WarningsList', function(Request) {

  var warning_precipitationMap = [{presence:"No precipitation",intensity:"-",coverage:"-",attribute:"-"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Tornadoes"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Destructive winds"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Flash flooding"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Damaging winds"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Large hail"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Heavy rain"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Hail"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Dry"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"Gusty winds"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"Low probability",attribute:"-"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Tornadoes"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Destructive winds"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Flash flooding"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Damaging winds"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Large hail"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Heavy rain"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Hail"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Dry"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"Gusty winds"},
                                 {presence:"Precipitation",intensity:"Low",coverage:"High probability",attribute:"-"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Tornadoes"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Destructive winds"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Flash flooding"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Damaging winds"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Large hail"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Heavy rain"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Hail"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Dry"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"Gusty winds"},
                                 {presence:"Precipitation",intensity:"High",coverage:"Low probability",attribute:"-"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Tornadoes"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Destructive winds"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Flash flooding"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Damaging winds"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Large hail"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Heavy rain"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Hail"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Dry"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"Gusty"},
                                 {presence:"Precipitation",intensity:"High",coverage:"High probability",attribute:"-"}
                                 ];
  var warning_frozenMap = [{presence:"No frozen",intensity:"-",coverage:"-",attribute:"-"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"Tornadoes"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"Destructive winds"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"Flash flooding"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"Damaging winds"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"Hail"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"Gusty winds"},
                           {presence:"Frozen",intensity:"Low",coverage:"Low probability",attribute:"-"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"Tornadoes"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"Destructive winds"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"Flash flooding"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"Damaging winds"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"Hail"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"Gusty winds"},
                           {presence:"Frozen",intensity:"Low",coverage:"High probability",attribute:"-"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"Tornadoes"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"Destructive winds"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"Flash flooding"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"Damaging winds"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"Hail"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"Gusty winds"},
                           {presence:"Frozen",intensity:"High",coverage:"Low probability",attribute:"-"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"Tornadoes"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"Destructive winds"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"Flash flooding"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"Damaging winds"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"Hail"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"Gusty winds"},
                           {presence:"Frozen",intensity:"High",coverage:"High probability",attribute:"-"}
                           ];
  var warning_thunderstormMap = [{presence:"No thunderstorms",intensity:"-",coverage:"-",attribute:"-"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Tornadoes"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Destructive winds"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Flash flooding"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Damaging winds"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Large hail"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Heavy rain"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Hail"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Dry"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"Gusty winds"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"Low probability",attribute:"-"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Tornadoes"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Destructive winds"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Flash flooding"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Damaging winds"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Large hail"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Heavy rain"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Hail"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Dry"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"Gusty winds"},
                                 {presence:"Thunderstorm",intensity:"Low",coverage:"High probability",attribute:"-"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Tornadoes"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Destructive winds"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Flash flooding"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Damaging winds"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Large hail"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Heavy rain"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Hail"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Dry"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"Gusty winds"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"Low probability",attribute:"-"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Tornadoes"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Destructive winds"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Flash flooding"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Damaging winds"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Large hail"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Heavy rain"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Hail"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Dry"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"Gusty"},
                                 {presence:"Thunderstorm",intensity:"High",coverage:"High probability",attribute:"-"}
                                 ];
  var warning_frostMap = [{presence:"No frost",intensity:"-",coverage:"-",attribute:"-"},
                          {presence:"Frost",intensity:"Low",coverage:"Low probability",attribute:"-"},
                          {presence:"Frost",intensity:"Low",coverage:"High probability",attribute:"-"},
                          {presence:"Frost",intensity:"High",coverage:"Low probability",attribute:"-"},
                          {presence:"Frost",intensity:"High",coverage:"High probability",attribute:"-"}
                          ];
  var warning_fogMap = [{presence:"No fog",intensity:"-",coverage:"-",attribute:"-"},
                        {presence:"Fog",intensity:"Low",coverage:"Low probability",attribute:"-"},
                        {presence:"Fog",intensity:"Low",coverage:"High probability",attribute:"-"},
                        {presence:"Fog",intensity:"High",coverage:"Low probability",attribute:"-"},
                        {presence:"Fog",intensity:"High",coverage:"High probability",attribute:"-"}
                        ];

  var warningList = [];
  var baseTime;
  Request.withoutAuth({url: '/data/notification'}, function(data, status, headers, config){
      baseTime = new Date(data.baseTime);
      generateNotification(data.fog, warning_fogMap, 'Fog');
      generateNotification(data.frost, warning_frostMap, 'Frost');
      generateNotification(data.precipitation, warning_precipitationMap, 'Precipitation');
      //TODO: typo: frozen
      generateNotification(data.frozenPrec, warning_frozenMap, 'Frozen');
      generateNotification(data.thunderstorm, warning_thunderstormMap, 'Thunderstorm');
  });


  var generateNotification= function(data, map, presence){
      for (var i = 0; i < data.length; i++){
          var code = parseInt(data[i].code);
          if (code > 0){
             var time = new Date();
             time.setTime(baseTime.getTime()+i*3*60*60*1000);
              warningList.push({
                  presence: presence,
                  intensity: map[code].intensity,
                  coverage: map[code].coverage,
                  attribute: map[code].attribute,
                  time: time.toLocaleString(),
              })
          }
      }
  };

  return {
      //TODO: add date parameter
    getWarningList: function(){
        return warningList;
    },
    getNumber: function(){
        return warningList.length;
    },
    get: function(locationId) {
      // Simple index lookup
      return locationList[locationId];
    }
  }
})

.factory('ForecastList', function(Request) {

            var forecastListFormer = [];
            return {
                    getData: function(callback, latitudeParam, longtitudeParam) {
                    var urlStr = "/data/brief?latitude=" + latitudeParam + "&longitude=" + longtitudeParam;
                    Request.withoutAuth({
                        url: urlStr
                    }, function (data, status, headers, config) {
                        forecastListFormer= [];
                        var skyList = ["cloudy", "sunny", "thunder", "rainy", "fog", "degree", "hurricane", "smallrain"];
                        var weekdayList = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
                        for (var i = 0; i < data.length; i++) {
                            var date = new Date(data[i].date);
                            forecastListFormer.push({
                                id: i,
                                latitude: latitudeParam,
                                longtitude: longtitudeParam,
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
                            if (callback && typeof callback == 'function') {
                                callback(forecastListFormer);
                            }
                        }
                    });
                },
                refresh: function () {
                    return forecastListFormer;
                },
                getDay: function(id){
                    return forecastListFormer[id];
                    console.log( forecastListFormer[id]);
                }
            }
    })
            /*Request.withoutAuth({
                    url: urlStr
                },
                function getData (data, status, headers, config) {


                function refresh(){
                    return forecastListFormer;
                }*/
                        /*$scope.forecastList.push({
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
                        });*/
                 /*   },

                }*/



  // Might use a resource here that returns a JSON array
  // Some fake testing data

 /* var forecastList = [
    {id: '0', day: '8', month: '9', weekday: 'Mon', humidity: '45', rainfall_chance: '70', rainfall_amount: '3', sky: 'sunny', currentTemp:'', minTemp:'4', maxTemp:'19\u00b0C'},
    {id: '1', day: '9', month: '9', weekday: 'Tue', humidity: '65', rainfall_chance: '50', rainfall_amount: '1', sky: 'cloudy', currentTemp:'14\u00b0C', minTemp:'5', maxTemp:'16\u00b0C'},
    {id: '2', day: '10', month: '9', weekday: 'Wed', humidity: '34', rainfall_chance: '90', rainfall_amount: '10', sky: 'thunder', currentTemp:'', minTemp:'7', maxTemp:'16\u00b0C'},
    {id: '3', day: '11', month: '9', weekday: 'Thu', humidity: '55', rainfall_chance: '90', rainfall_amount: '7', sky: 'rainy', currentTemp:'', minTemp:'5', maxTemp:'10\u00b0C'},
    {id: '4', day: '12', month: '9', weekday: 'Fri', humidity: '23', rainfall_chance: '70', rainfall_amount: '5', sky: 'rainy', currentTemp:'', minTemp:'3', maxTemp:'8\u00b0C'},
    {id: '5', day: '13', month: '9', weekday: 'Sat', humidity: '57', rainfall_chance: '2', rainfall_amount: '1', sky: 'sunny', currentTemp:'', minTemp:'5', maxTemp:'16\u00b0C'},
    {id: '6', day: '14', month: '9', weekday: 'Sun', humidity: '18', rainfall_chance: '0', rainfall_amount: '1', sky: 'hurricane', currentTemp:'', minTemp:'4', maxTemp:'10\u00b0C'}
  ];*/
	

  /*return {
  all: function() {
    return forecastList;
  },
		
		getForecastDetail: function(forecastId) {
			return {
				id: '0', day: '8', month: '9', weekday: 'Mon', humidity: '45', rainfall_chance: '70', rainfall_amount: '3', sky: 'sunny', currentTemp:'', minTemp:'4', maxTemp:'19\u00b0C',
        			 windSpeed: [
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
                }]*/
/*
			};
		}
  }*/

/*
.factory('TempDailyList',function(){
   var temperatureList=[
   {id:'0',temperature_dailyList:[8,9,9,11,12,13,14,16,18,20,22,26,28,27,26,24,21,19,15,14,12,9,8,7]},
   {id:'1',temperature_dailyList:[7,9,10,11,12,13,14,16,17,19,22,26,25,24,22,21,21,19,15,14,12,9,8,7]},
   {id:'2',temperature_dailyList:[8,9,9,11,12,13,14,16,18,20,24,28,26,26,25,24,21,19,15,14,12,11,10,10]},
   {id:'3',temperature_dailyList:[7,7,8,9,10,13,14,16,18,20,22,24,25,21,21,20,20,19,15,14,12,9,8,7]},
   {id:'4',temperature_dailyList:[9,9,10,11,12,13,14,16,18,20,22,26,28,27,26,24,21,19,15,14,12,9,8,7]},
   {id:'5',temperature_dailyList:[8,9,10,11,12,13,14,16,18,20,22,23,22,22,20,18,17,15,15,13,12,9,9,6]},
   {id:'6',temperature_dailyList:[10,10,9,11,13,14,16,17,19,22,26,28,27,26,24,21,19,13,13,12,11,9,8,7]},
   ]
   return{
     all:function(){
      return temperatureList;
     }
     getTempDaily: function(tempID){
      return TempDailyList[temperatureList];
     },
   }
})*/


.factory('LocationService', function(Request) {
  return {
    all: function(callback) {
      if (!Request.isLoggedIn()) {
        throw new Error('Login is required before getting the location list');
      }
      Request.withAuth({ url: '/oauth/farm' }, function(data, status, headers, config) {
        if (status == 200) {
          locationList = data;
          callback(data);
        } else {
          throw new Error('Error getting location list with status ' + status);
        }
      });
    },
    deleteLocation: function(farm, callback) {
      if (!farm || !farm.name) throw new Error('farm/farm.name is required');
      Request.withAuth({
        url: '/oauth/farm/delete',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          name: farm.name
        })
      }, function(data, status, headers, config) {
        if (callback && typeof callback == 'function') {
          callback(data, status);
        }
      });
    },
    get: function(locationId) {
      // Simple index lookup
      return locationList[locationId];
    }
  }
})

.factory('RainfallThreeHourlyList', function() {
    var rainfallList = [
      {startHour: '06:00', endHour:'09:00', chanceOfAnyRain: '4', expectedRainfallAmount: '0', imgSourceId: '0'},
      {startHour: '09:00', endHour:'12:00', chanceOfAnyRain: '4', expectedRainfallAmount: '0', imgSourceId: '0' },
      {startHour: '12:00', endHour:'15:00', chanceOfAnyRain: '12', expectedRainfallAmount: '1', imgSourceId: '1'},
      {startHour: '15:00', endHour:'18:00', chanceOfAnyRain: '20', expectedRainfallAmount: '1.2', imgSourceId: '2'},
      {startHour: '18:00', endHour:'21:00', chanceOfAnyRain: '7', expectedRainfallAmount: '1', imgSourceId: '1'},
      {startHour: '21:00', endHour:'24:00', chanceOfAnyRain: '3', expectedRainfallAmount: '0.5', imgSourceId: '0'},
      {startHour: '24:00', endHour:'03:00', chanceOfAnyRain: '1', expectedRainfallAmount: '0', imgSourceId: '0'},
      {startHour: '03:00', endHour:'06:00', chanceOfAnyRain: '2', expectedRainfallAmount: '0', imgSourceId: '0'}
    ];
    return {
      all: function() {
        return rainfallList;
      }
    }
  })

/**
 * Request proxy service
 * Handles oauth2 authenticate automatically
 */
.factory('Request', function($http, $base64, Utils) {
    //var host = 'localhost:8080';
    var host = 'weather-forecast-user.mybluemix.net';

    var clientId = 'forecast';
    var clientSecret = '9a5667gfn5h434df7dh8f99';
    var clientCredentials = $base64.encode(clientId + ':' + clientSecret);

    var userEmail = null;
    var accessToken = null;
    var refreshToken = null;
    var expires = null;

    return {

      isLoggedIn: function() { return accessToken && refreshToken },

      logout: function () { userEmail = accessToken = refreshToken = expires = null; },

      signup: function(user, callback) {
        if (!user || !user.email) throw new Error('email is required');
        if (!user.password) throw new Error('password is required');
        if (!user.name || (!user.name.first && !user.name.last)) throw new Error('name is required');

        $http({
          method: 'POST',
          url: 'http://' + host + '/signup',
          data: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }).success(function(data, status, headers, config) {
          if (callback && typeof callback == 'function') {
            callback(status);
          }
        }).error(function(data, status, headers, config) {
          if (status == 400) {
            console.warn('signup failed');
            if (callback && typeof callback == 'function') {
              callback(status, data);
            }
          } else {
            throw new Error('signup failed with ' + status);
          }
        });
      },

      login: function(user, callback) {
        var sendDate = new Date();
        $http({
          method: 'POST',
          url: 'http://' + host + '/oauth/token',
          data: { username: user.email, password : user.password, grant_type : 'password' },
          headers: {
            Authorization: 'Basic ' + clientCredentials,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Connection': 'close'
          },
          transformRequest: Utils.serializeIntoFormEncoded
        }).success(function(data, status, headers, config) {
          console.log('Request#login: oauth2 login succeeded');
          userEmail = user.email;
          accessToken = data.access_token;
          refreshToken = data.refresh_token;
          expires = new Date(sendDate.getTime() + ( data.expires_in * 1000 ));
          if (callback && typeof callback == 'function') {
            callback(status, userEmail);
          }
        }).error(function(data, status, headers, config) {
          console.log('Request#login: ' + data.name);
          if (status == 401) {
            if (callback && typeof callback == 'function') {
              callback(status, data.name);
            }
          } else {
            throw new Error('login failed with ' + status);
          }
        });
      },

      /**
       * This function sends a request with OAuth2 Authorization header with previous login info
       * If the accessToken is expired, it refreshes the accessToken and then re-send the original request
       * Should raise an error if used when not logged in
       * @param requestConf Request object containing url, method, headers and data
       * @param callback The callback function when server returns success or error
       * @returns {*} the return values shouldn't be used under any condition
       */
      withAuth: function(requestConf, callback) {
        if (!this.isLoggedIn()) {
          throw new Error('Not logged in');
        }

        if (!requestConf.url) {
          throw new Error('url is required');
        }

        if (!/^https?:\/\/.*$/.test(requestConf.url)) {
          requestConf.url = 'http://' + host + requestConf.url;
        }

        var combinedReq = {
          url: 'http://' + host + requestConf.url,
          method: 'GET',
          headers: {}
        };

        $.extend(combinedReq, requestConf);

        // set up a counter to avoid infinite recursive calls
        var retries = 0;
        var maxRetires = 3;

        function refreshTokens(next) {
          $http({
            url: 'http://' + host + '/oauth/token',
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + clientCredentials,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: Utils.serializeIntoFormEncoded,
            data: {
              'grant_type': 'refresh_token',
              'refresh_token': refreshToken
            }
          }).success(function(data, status, headers, config) {
            userEmail = user.email;
            accessToken = data.access_token;
            refreshToken = data.refresh_token;
            expires = new Date(sendDate.getTime() + ( data.expires_in * 1000 ));
            if (next && typeof next == 'function') {
              next();
            }
          }).error(function(data, status, headers, config) {
            throw new Error('Request#withAuth: error refreshing tokens');
          });
        }

        (function userRequest(rc) {
          rc.headers['Authorization'] = 'Bearer ' + accessToken;
          // if token expires
          if (new Date().getTime() > expires.getTime() && ++retries <= maxRetires) {
            return refreshTokens(userRequest);
          }
          $http(rc).success(function(data, status, headers, config) {
            if (callback && typeof callback == 'function') {
              callback(data, status, headers, config);
            }
          }).error(function(data, status, headers, config) {
            if (status == '401' && ++retries <= maxRetires) {
              // OAuth2Error
              refreshTokens(userRequest);
            } else {
              throw new Error('Error happens requesting withAuth ' + status);
            }
          });
        })(combinedReq);

      },

      withoutAuth: function(requestConf, callback) {
        if (!requestConf || !requestConf.url) {
          throw new Error('url is required');
        }

        if (!/$https?:\/\/.*^/.test(requestConf.url)) {
          requestConf.url = 'http://' + host + requestConf.url;
        }

        var defauts = {
          method: 'GET',
          headers: {}
        };

        $.extend(defauts, requestConf);

        $http(requestConf).success(callback).error(callback);
      }

    }
})

.factory('Utils', function() {
    return {

      serializeIntoFormEncoded: function(obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      }

    };
  });