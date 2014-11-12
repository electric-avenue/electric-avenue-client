/**
 * Signup controller
 * @module SignUpCtrl
 */
angular.module('starter.signup', ['auth'])
.controller('SignUpCtrl', function($scope, Auth, $state) {
  $scope.signupData = {};
  // Error variable to expose error message on form
  $scope.signupError = false;
  // Sign up method
  $scope.doSignup = function() {
    // Set defaults
    var user = $scope.signupData.username || undefined;
    var email = $scope.signupData.email || undefined;
    var pass = $scope.signupData.password || undefined;
    // Check to see if they all exist
    if (!user || !email || !pass) {
      // They do not. Give the user an error
      $scope.signupError = true;
      return;
    }
    // Everything checks out, sign the user up
    Auth.signup(user, email, pass)
      .then(function(data) {
        // Signup successful! Send them to login page
        $state.transitionTo('app.login');
      }).catch(function(err) {
        // Signup failed! Give them an error
        $scope.signupError = true;
      });
  };
});
