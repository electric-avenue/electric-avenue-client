/**
 * Authorization factory
 * @module Auth
 * @returns {Object} Object containing authorization methods
 */
angular.module('auth', [])
.factory('Auth', function($http, $location, $cookieStore) {
  var baseUrl = 'http://10.6.23.250:5000';
  /**
   * Register a user
   * @function
   * @memberof module:Auth
   * @param {string} user User's username
   * @param {string} email User's email
   * @param {string} pass Users's password
   * @returns {Promise}
   */
  var signup = function(user, email, pass) {
    // Do preliminary check to see if all values are accounted for
    if (!user || !email || !pass) {
      return false;
    }
    // Setup data object for request
    var data = {
      username: user,
      email: email,
      password: pass
    };
    // Register the user
    return $http({
      method: 'POST',
      url: baseUrl + '/auth/register',
      data: data
    }).then(function(res) {
      // Successful return true
      return true;
    }).catch(function(err) {
      return false;
    });
  };
  /**
   * Login as a user
   * @function
   * @memberof module:Auth
   * @param {string} user User's username
   * @param {string} pass Users's password
   * @returns {Promise}
   */
  var login = function(user, pass) {
    if (!user || !pass) {
      return false;
    }
    var data = {
      username: user,
      password: pass
    };
    // Send a request for the login data
    return $http({
      method: 'POST',
      url: baseUrl + '/auth/login',
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

  /**
   * Check to see if a user is authorized (aka logged in)
   * @function
   * @memberof module:Auth
   * @returns {boolean}
   */
  var isAuth = function() {
    return !!$cookieStore.get('user');
  };
  /**
   * Logs a user out of the session
   * @function
   * @memberof module:Auth
   * @returns {Promise}
   */
  var logout = function() {
    // Remove the cookie
    if (isAuth()) {
      $cookieStore.remove('user');
    }
    // Send request to server
    return $http({
      method: 'POST',
      url: baseUrl + '/auth/logout'
    });
  };

  return {
    signup: signup,
    login: login,
    isAuth: isAuth,
    logout: logout
  };
});
