'use strict';

angular.module('postcodeWebapp')
  .controller('MainCtrl', function ($scope, $http) {
      $scope.postcode='SA11SU';

      $scope.mapCenter = {
        latitude: "51.61452",
        longitude: "-3.934001"
      };

      $scope.mapZoom = 15;

      function onSuccess(data){
              data = data.map(function(entry){
                  entry.mapCenter = {
                    latitude: entry.latitude,
                    longitude: entry.longitude
                  };
                  return entry;
              });
              console.log(data);
              $scope.postcodes = data;
              $scope.postcodeMarkers = data.map(function(postcode){
                return postcode.mapCenter;
              });

              $scope.mapCenter = $scope.postcodeMarkers[0];
      }

      $scope.validate = function () {
        $http
          .get('http://localhost:9000/postcode/' + $scope.postcode + '?partial=true')
          .success(onSuccess);
      }
  });
