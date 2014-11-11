angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, Auth, $state, $http) {
  $scope.isAuth = Auth.isAuth;
  $scope.logout = function() {
    Auth.logout();
    $state.go('app.login');
  };
  $scope.test = function() {
    return $http({
      method: 'GET', 
      url: 'http://localhost:5000/test'
    })
    .then(function(response) {
      console.log('resposeRick:', response);
    })
    .catch(function(error) {
      console.log('responseRisk Error:', error);
    });
  };
});
