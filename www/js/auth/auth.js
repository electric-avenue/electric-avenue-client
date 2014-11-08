angular.module('starter.auth', [])

.controller('SignUpCtrl', function($scope, Auth) {
  $scope.signupData = {};
  $scope.doSignup = function() {
    var user = $scope.signupData.username || undefined;
    var email = $scope.signupData.email || undefined;
    var pass = $scope.signupData.password || undefined;
    if (Auth.signup(user, email, pass)) {
      // Login after a user signs up
      Auth.login(user, pass);
    } else {
      // Error on signup
    }
  };
})
.controller('LoginCtrl', function($scope, $timeout, Auth, $state) {
  // Form data for the login modal
  $scope.loginData = {};
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var user = $scope.loginData.username || undefined;
    var pass = $scope.loginData.password || undefined;
    if (Auth.login(user, pass)) {
      // User is logged in
      $state.go('app.home');
    } else {
      // User login attempt failed
    }
  };
})
.factory('Auth', function($http, $location, $window, Session) {
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
    return true;
  };
  auth.login = function(user, pass) {
    if (!user || !pass) {
      return false;
    }
    if (user === testData.username && pass === testData.password) {
      var id = 1234;
      var userid = 2;
      Session.create(id, userid);
      return true;
    } else {
      return false;
    }
  };
  auth.isAuth = function() {
    return !!Session.userId;
  };
  auth.logout = function() {
    if (auth.isAuth()) {
      Session.destroy();
    }
  };
  return auth;
})
.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
  };
  return this;
});
