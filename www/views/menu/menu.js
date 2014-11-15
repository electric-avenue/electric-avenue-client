/**
 * Menu Controller for the side menu
 * @module MenuCtrl
 */
angular.module('starter.controllers', [])
.controller('MenuCtrl', function($scope, Auth, $state, $http) {
  // States to avoid showing the map & list buttons for
  var excludedStates = [
    'app.vendorProfile',
    'app.vendorSignup',
    'app.userProfile',
    'app.signup',
    'app.login'
  ];
  $scope.state = _.indexOf(excludedStates, $state.current.name) === -1;
  $scope.$watch(function($scope) {
    $scope.state = _.indexOf(excludedStates, $state.current.name) === -1;
  });
  // Get auth method
  $scope.check = {
    isAuth: function() {
      return Auth.isAuth;
    }
  };
  // Expose logout for the user
  $scope.logout = function() {
    Auth.logout();
    $state.go('app.login');
  };
  $scope.changeState = function(name) {
    $state.transitionTo(name);
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
