/**
 * Authorization factory
 * @module Auth
 * @returns {Object} Object containing authorization methods
 */
angular.module('auth', [])
.factory('Auth', function($http, $location) {
  var auth = {};
  auth.isAuth = false;
  auth.isVendor = false;
  /**
   * Register a user
   * @function
   * @memberof module:Auth
   * @param {string} user User's username
   * @param {string} email User's email
   * @param {string} pass Users's password
   * @returns {Promise}
   */
  auth.signup = function(user, email, pass) {
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
      url: config.baseUrl + '/auth/register',
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
  auth.login = function(user, pass) {
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
      url: config.baseUrl + '/auth/login',
      data: data
    }).then(function(res) {
      if (!!res.data) {
        auth.isAuth = true;
        auth.isVendor = res.data.isVendor;
        console.log('data:', res);
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

  /**
   * Logs a user out of the session
   * @function
   * @memberof module:Auth
   * @returns {Promise}
   */
  auth.logout = function() {
    // Remove the cookie
    if (auth.isAuth) {
      auth.isAuth = false;
      auth.isVendor = false;
    }
    // Send request to server
    return $http({
      method: 'POST',
      url: config.baseUrl + '/auth/logout'
    });
  };
  return auth;
});
