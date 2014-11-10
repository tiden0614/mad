//TODO: use angularJS
angular.module('map.control', [])

    .controller('MapCtrl', function ($scope, Request, $rootScope, LocationService) {

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
            var locationName = window.prompt('Please enter a name for the farm');
            if (locationName != null){
                //alert(lat + ',' + lng + ',' + locationName);
                var requestContent = {
                    url: '/oauth/farm',
                    method: 'POST',
                    data: JSON.stringify({
                        name: locationName,
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
                    if (status == '200'){
                        console.log('post succeeded');
                        LocationService.all(function(list) {
                            $rootScope.locationList = list;
                        });
                    }
                    else {
                        console.log('post failed');
                    }
                })
            }
        };

        google.maps.event.addDomListener(window, 'load', initialize());
    });


