angular.module('farmers.services', ['base64'])

.factory('ForecastList', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var forecastList = [
    {id: '0', day: '8', month: '9', weekday: 'Mon', humidity: '45', rainfall_chance: '70', rainfall_amount: '3', sky: 'sunny', currentTemp:'', minTemp:'4', maxTemp:'19\u00b0C'},
    {id: '1', day: '9', month: '9', weekday: 'Tue', humidity: '65', rainfall_chance: '50', rainfall_amount: '1', sky: 'cloudy', currentTemp:'14\u00b0C', minTemp:'5', maxTemp:'16\u00b0C'},
    {id: '2', day: '10', month: '9', weekday: 'Wed', humidity: '34', rainfall_chance: '90', rainfall_amount: '10', sky: 'thunder', currentTemp:'', minTemp:'7', maxTemp:'16\u00b0C'},
    {id: '3', day: '11', month: '9', weekday: 'Thu', humidity: '55', rainfall_chance: '90', rainfall_amount: '7', sky: 'rainy', currentTemp:'', minTemp:'5', maxTemp:'10\u00b0C'},
    {id: '4', day: '12', month: '9', weekday: 'Fri', humidity: '23', rainfall_chance: '70', rainfall_amount: '5', sky: 'rainy', currentTemp:'', minTemp:'3', maxTemp:'8\u00b0C'},
    {id: '5', day: '13', month: '9', weekday: 'Sat', humidity: '57', rainfall_chance: '2', rainfall_amount: '1', sky: 'sunny', currentTemp:'', minTemp:'5', maxTemp:'16\u00b0C'},
    {id: '6', day: '14', month: '9', weekday: 'Sun', humidity: '18', rainfall_chance: '0', rainfall_amount: '1', sky: 'hurricane', currentTemp:'', minTemp:'4', maxTemp:'10\u00b0C'}
  ];
	

  return {
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
                }]

			};
		}
  }
})
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

.factory('TempHourlyList',function(){

   var TempDailyDetail=[{hour:'0',temp_hourly:8},{hour:'1',temp_hourly:9},{hour:'2',temp_hourly:9},{hour:'3',temp_hourly:11},{hour:'4',temp_hourly:12},{hour:'5',temp_hourly:13},
    {hour:'6',temp_hourly:14},{hour:'7',temp_hourly:16},{hour:'8',temp_hourly:18},{hour:'9',temp_hourly:20},{hour:'10',temp_hourly:22},{hour:'11',temp_hourly:26},
    {hour:'12',temp_hourly:28},{hour:'13',temp_hourly:27},{hour:'14',temp_hourly:26},{hour:'15',temp_hourly:24},{hour:'16',temp_hourly:21},{hour:'17',temp_hourly:21},
    {hour:'18',temp_hourly:19},{hour:'19',temp_hourly:15},{hour:'20',temp_hourly:14},{hour:'21',temp_hourly:12},{hour:'22',temp_hourly:9},{hour:'23',temp_hourly:8},{hour:'24',temp_hourly:7}]

   return{
   all:function(){
       return TempDailyDetail;
      },

     //TODO: max and min temp are available from data set, not need to check again
   getMaxTemp: function(){
       var temp = TempDailyDetail[0].temp_hourly;
       for(i in TempDailyDetail){
           if( TempDailyDetail[i].temp_hourly>temp)
           {
               temp = TempDailyDetail[i].temp_hourly;
           }
       }
       return temp;
      },
   getMinTemp:function(){
        var temp = TempDailyDetail[0].temp_hourly;
               for(i in TempDailyDetail){
                   if( TempDailyDetail[i].temp_hourly<temp)
                   {
                       temp = TempDailyDetail[i].temp_hourly;
                   }
               }
               return temp;
      }
  }
})

.factory('LocationList', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var locationList = [
  {locationId: '1', location_name: 'CurrentLocation'},
  {locationId: '2', location_name: 'Farm1'},
  {locationId: '3', location_name: 'Farm2'}
   ];

  return {
  all: function() {
    return locationList;
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
            callback(null, userEmail);
          }
        }).error(function(data, status, headers, config) {
          console.log('Request#login: ' + data.name);
          if (callback && typeof callback == 'function') {
            callback(data);
          }
        });
      },

      isLoggedIn: function() { return accessToken && refreshToken },

      withAuth: function(requestConf, callback) {
        if (!this.isLoggedIn()) {
          return callback(new Error('Not logged in'));
        }

        if (!requestConf.url) {
          return callback(new Error('url is required'));
        }

        if (!/^https?:\/\/.*$/.test(requestConf.url)) {
          requestConf.url = 'http://' + host + requestConf.url;
        }

        requestConf = Utils.populateObject(requestConf, {
          url: 'http://' + host + requestConf.url,
          method: 'GET',
          headers: {}
        });

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
            if (callback && typeof callback == 'function') {
              callback(new Error('Request#withAuth: error refreshing tokens'), data, status, headers, config);
            }
          });
        }

        (function userRequest() {
          requestConf.headers['Authorization'] = 'Bearer ' + accessToken;
          // if token expires
          if (new Date().getTime() > expires.getTime() && ++retries <= maxRetires) {
            return refreshTokens(userRequest);
          }
          $http(requestConf).success(function(data, status, headers, config) {
            if (callback && typeof callback == 'function') {
              callback(null, data, status, headers, config);
            }
          }).error(function(data, status, headers, config) {
            if (status == '401' && ++retries <= maxRetires) {
              // OAuth2Error
              refreshTokens(userRequest);
            } else {
              callback(new Error('Request#withAuth: error requesting ' + requestConf.url),
                data, status, headers, config);
            }
          });
        })();
      }

    }
})

.factory('Utils', function() {
    return {

      populateObject: function(obj, defaultObj) {
        for (var p in defaultObj) {
          obj[p] = obj[p] || defaultObj;
        }
        return obj;
      },

      serializeIntoFormEncoded: function(obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      }
    };
  });