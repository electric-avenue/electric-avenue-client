angular.module('usermap',['leaflet-directive'])
.controller('UserDashboardCtrl', function($scope, $state){
  $scope.$on("$stateChangeSuccess",function(){
    console.log("We made it here is the state: ", $state);
    angular.extend($scope, {
      defaults: {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        maxZoom: 14,
        path: {
          weight: 10,
          color: '#800000',
          opacity: 1
        }
      }
    });
  });
});  