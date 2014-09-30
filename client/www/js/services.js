angular.module('farmers.services', [])

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
				id: '0', day: '8', month: '9', weekday: 'Mon', humidity: '45', rainfall_chance: '70', rainfall_amount: '3', sky: 'sunny', currentTemp:'', minTemp:'4', maxTemp:'19\u00b0C'
			};
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
