angular.module('usermap',['leaflet-directive'])
.controller('UserDashboardCtrl', function($scope, $state){
  $scope.$on("$stateChangeSuccess",function(){
    console.log("We made it here is the state: ", $state);
    // $scope.map = {
    //   defaults: {
    //     tileLayer: "http://{s}.tiles.mapbox.com/v3/MapID/{z}/{x}/{y}.png",
    //     maxZoom: 18,
    //     path: {
    //       weight: 10,
    //       color: '#800000',
    //       opacity: 1
    //     }
    //   };
    // };
    // angular.extend($scope, {
    //   defaults: {
    //     tileLayer: "http://{s}.tiles.mapbox.com/v3/MapID/{z}/{x}/{y}.png",
    //     maxZoom: 18,
    //     path: {
    //       weight: 10,
    //       color: '#800000',
    //       opacity: 1
    //     }
    //   }
    // });
   $scope.map = {
          defaults: {
            tileLayer: "https://{s}.tiles.mapbox.com/v3/deziak1906.k8mphke2/{z}/{x}/{y}.png",
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          center: {
            lat: 43.661165,
            lng: -79.390919,
            zoom: 15
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };
  });
});  