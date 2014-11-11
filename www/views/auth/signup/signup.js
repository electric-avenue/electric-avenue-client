angular.module('starter.signup', ['auth'])
.controller('SignUpCtrl', function($scope, Auth, $state) {
  $scope.signupData = {};
  $scope.signupError = false;
  $scope.doSignup = function() {
    var user = $scope.signupData.username || undefined;
    var email = $scope.signupData.email || undefined;
    var pass = $scope.signupData.password || undefined;
    if (!user || !email || !pass) {
      $scope.signupError = true;
      return;
    }
    Auth.signup(user, email, pass)
      .then(function(data) {
        $state.transitionTo('app.login');
      }).catch(function(err) {
        $scope.signupError = true;
      });
  };
})