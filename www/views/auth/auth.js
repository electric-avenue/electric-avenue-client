/**
 * Signup controller
 * @module SignUpCtrl
 */
angular.module('authView', ['auth'])
.controller('AuthCtrl', function($scope, $timeout, Auth, $state, $http) {
  $scope.signupData = {};
  $scope.signupError = false;
  $scope.loginData = {};
  $scope.loginError = false;

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
  $scope.signup = function() {
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
        if (!data) {
          $scope.signupError = true;
          return;
        }
        // Signup successful! Send them to login page
        $state.transitionTo('app.login');
      }).catch(function(err) {
        // Signup failed! Give them an error
        $scope.signupError = true;
      });
  };
  $scope.login = function() {
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
        console.log('data', data);
        if (!data) {
          $scope.loginError = true;
        } else {
          $state.transitionTo('app.home');
        }
      }).catch(function(err) {
        console.log(err);
        $scope.loginError = true;
      });
  };
});
