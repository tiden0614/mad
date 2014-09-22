angular.module('farmers.services', [])

.factory('ForecastList', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data    
  var forecastList = [
    {day: '8', month: '9', weekday: 'Mon', rainfall_chance: '70%', rainfall_amount: '2~5mm', sky: 'sunny', temp:''},
    {day: '9', month: '9', weekday: 'Tue', rainfall_chance: '50%', rainfall_amount: '1~3mm', sky: 'cloudy', temp:'14C'},
    {day: '10', month: '9', weekday: 'Wed', rainfall_chance: '90%', rainfall_amount: '8~10mm', sky: 'thunder', temp:''},
    {day: '11', month: '9', weekday: 'Thu', rainfall_chance: '90%', rainfall_amount: '5~7mm', sky: 'rainy', temp:''},
    {day: '12', month: '9', weekday: 'Fri', rainfall_chance: '70%', rainfall_amount: '3~5mm', sky: 'rainy', temp:''},
    {day: '13', month: '9', weekday: 'Sat', rainfall_chance: '2%', rainfall_amount: '1~3mm', sky: 'sunny', temp:''},
    {day: '14', month: '9', weekday: 'Sun', rainfall_chance: '0%', rainfall_amount: '', sky: 'hurricane', temp:''}
  ];    

  return {
    all: function() {
      return forecastList;
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
});
