/**
 * Menu Controller for the side menu
 * @module MenuCtrl
 */
angular.module('starter.controllers', [])
.controller('MenuCtrl', function($scope, Auth, $state, $http) {
  // Get auth method
  $scope.isAuth = Auth.isAuth;
  // Expose logout for the user
  $scope.logout = function() {
    Auth.logout();
    $state.go('app.login');
  };
  // test function
  // TODO delete later
  $scope.test = function() {
    return $http({
      method: 'GET',
      url: config.baseUrl + '/test'
    })
    .then(function(response) {
      console.log('resposeRick:', response);
    })
    .catch(function(error) {
      console.log('responseRisk Error:', error);
    });
  };
});
