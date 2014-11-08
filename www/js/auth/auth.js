angular.module('starter.auth', [])

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
.controller('LoginCtrl', function($scope, $timeout, Auth, $state) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginError = false;
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var user = $scope.loginData.username || undefined;
    var pass = $scope.loginData.password || undefined;
    if (!user || !password) {
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
.factory('Auth', function($http, $location, $window, $cookieStore) {
  // Test data
  // TODO remove when server is ready
  var testData = {
    username: 'blah',
    password: 'test'
  };
  var auth = {};
  auth.signup = function(user, email, pass) {
    if (!user || !email || !pass) {
      return false;
    }
    var data = {
      username: user,
      email: email,
      password: pass
    };
    return $http({
      method: 'POST',
      url: 'http://10.6.23.250:5000/auth/register',
      data: data
    }).then(function(resp) {
      return true;
    });
  };
  auth.login = function(user, pass) {
    if (!user || !pass) {
      return false;
    }
    var data = {
      username: user,
      password: pass
    };
    return $http({
      method: 'POST',
      url: 'http://10.6.23.250:5000/auth/login',
      data: data
    }).then(function(resp) {
      if (resp.data.success) {
        $cookieStore.put('user', user);
        return true;
      }
    }).catch(function(err) {
      return false;
    });
  };
  auth.isAuth = function() {
    return !!$cookieStore.get('user');
  };
  auth.logout = function() {
    if (auth.isAuth()) {
      $cookieStore.remove('user');
    }
  };
  return auth;
});
