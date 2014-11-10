var baseDate = new Date();
var baseTime = baseDate.getTime();
var aDay = 3600 * 24 * 1000;
var dates = [];

for (var i = 0; i < 7; i++) {
  var anewday = new Date();
  anewday.setTime(baseTime + (i * aDay));
  dates.push(anewday);
}

module.exports = [{
  "date": dates[0],
  "humidity": 10,
  "chanceOfRain": 20,
  "likelyRainfall": 10,
  "currentTemp": 19,
  "minTemp": 11,
  "maxTemp": 26
}, {
  "date": dates[1],
  "humidity": 11,
  "chanceOfRain": 19,
  "likelyRainfall": 11,
  "currentTemp": 20,
  "minTemp": 11,
  "maxTemp": 26
}, {
  "date": dates[2],
  "humidity": 12,
  "chanceOfRain": 18,
  "likelyRainfall": 12,
  "currentTemp": 21,
  "minTemp": 11,
  "maxTemp": 26
}, {
  "date": dates[3],
  "humidity": 13,
  "chanceOfRain": 17,
  "likelyRainfall": 13,
  "currentTemp": 22,
  "minTemp": 11,
  "maxTemp": 26
}, {
  "date": dates[4],
  "humidity": 14,
  "chanceOfRain": 16,
  "likelyRainfall": 14,
  "currentTemp": 23,
  "minTemp": 11,
  "maxTemp": 26
}, {
  "date": dates[5],
  "humidity": 15,
  "chanceOfRain": 15,
  "likelyRainfall": 15,
  "currentTemp": 24,
  "minTemp": 11,
  "maxTemp": 26
}, {
  "date": dates[6],
  "humidity": 16,
  "chanceOfRain": 14,
  "likelyRainfall": 16,
  "currentTemp": 25,
  "minTemp": 11,
  "maxTemp": 26
}];
