/**
 * Signup controller
 * @module SignUpCtrl
 */
angular.module('authView', ['auth'])
.controller('AuthCtrl', function($scope, $timeout, Auth, $state) {
  $scope.signupData = {};
  $scope.signupError = false;
  $scope.loginData = {};
  $scope.loginError = false;

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
        if (!data) {
          $scope.loginError = true;
        } else {
          $state.transitionTo('app.home');
        }
      }).catch(function(err) {
        $scope.loginError = true;
      });
  };
});

// /**
//  * Login Controller
//  * @module LoginCtrl
//  */
// angular.module('starter.login', ['auth'])
// .controller('LoginCtrl', function($scope, $timeout, Auth, $state) {
//   // Form data for the login modal
//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     // Set defaults
//     var user = $scope.loginData.username || undefined;
//     var pass = $scope.loginData.password || undefined;
//     // Check to see if all data exists
//     if (!user || !pass) {
//       // It does not. Give the user an error
//       $scope.loginError = true;
//       return;
//     }
//     // Login the user
//     Auth.login(user, pass)
//       .then(function(data) {
//         if (!data) {
//           $scope.loginError = true;
//         } else {
//           $state.transitionTo('app.home');
//         }
//       }).catch(function(err) {
//         $scope.loginError = true;
//       });
//   };
// })
