angular.module('starter.login', ['auth'])
.controller('LoginCtrl', function($scope, $timeout, Auth, $state) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginError = false;
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var user = $scope.loginData.username || undefined;
    var pass = $scope.loginData.password || undefined;
    if (!user || !pass) {
      $scope.loginError = true;
      return;
    }
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