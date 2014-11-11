angular.module('auth', [])
.factory('Auth', function($http, $location, $cookieStore) {
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
      url: 'http://localhost:5000/auth/register',
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
      url: 'http://localhost:5000/auth/login',
      data: data
    }).then(function(res) {
      if (!!res.data) {
        $cookieStore.put('user', res.data);
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
    $http({
      method: 'POST',
      url: 'http://localhost:5000/auth/logout'
    }).then(function(res) {
      if (auth.isAuth()) {
        $cookieStore.remove('user');
      }
    })
  };
  return auth;
});
