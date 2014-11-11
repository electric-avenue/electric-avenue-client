angular.module('auth', [])
.factory('Auth', function($http, $location, $cookieStore) {
  var signup = function(user, email, pass) {
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
    }).then(function(res) {
      return true;
    });
  };

  var login = function(user, pass) {
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

  var isAuth = function() {
    return !!$cookieStore.get('user');
  };

  var logout = function() {
    if (isAuth()) {
      $cookieStore.remove('user');
    }
    return $http({
      method: 'POST',
      url: 'http://localhost:5000/auth/logout'
    });
  };

  return {
    signup: signup,
    login: login,
    isAuth: isAuth,
    logout: logout
  };
});
