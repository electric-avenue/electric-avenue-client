/**
 * Login Controller
 * @module LoginCtrl
 */
angular.module('starter.login', ['auth'])
.controller('LoginCtrl', function($scope, $timeout, Auth, $state) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginError = false;
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // Set defaults
    var user = $scope.loginData.username || undefined;
    var pass = $scope.loginData.password || undefined;
    // Check to see if all data exists
    if (!user || !pass) {
      // It does not. Give the user an error
      $scope.loginError = true;
      return;
    }
    // Login the user
    Auth.login(user, pass)
      .then(function(data) {
        if (!data) {
          $scope.loginError = true;
        } else {
          $state.transitionTo('app.home');
        }
      }).catch(function(err) {
        $scope.loginError = true;
      });
  };
})
