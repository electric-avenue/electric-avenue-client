angular.module('profile', [])
.factory('profile', function($http, $upload) {
  var changeStatus = function(changes, callback) {
    var data = _.pick(changes, 'status');
    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/vendor/update',
      data: data
    })
    .then(function(res) {
      console.log('Success:', res);
      if (callback) {
        callback(null, res);
      }
      return true;
    })
    .catch(function(err) {
      console.log('Error:', err);
      if (callback) {
        callback(err, null);
      }
      return false;
    });
  };

  var getStatus = function(vendor, callback) {
    return $http({
      method: 'GET',
      url: config.baseUrl + '/vendor/status',
      data: {
        vendor: vendor
      }
    })
    .then(function(res) {
      console.log('Success:', res);
      if (callback) {
        callback(null, res);
      }
      return true;
    })
    .catch(function(err) {
      console.log('Error:', err);
      if (callback) {
        callback(err, null);
      }
      reutrn false;
    });
  };

  var updateProfile = function(changes, callback) {
    var data = _.pick(changes, [
      'description',
      'displayName',
      'types'
    ]);
    
    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/vendor/add',
      data: data
    })
    .then(function(res) {
      console.log('Success:', res);
      if (callback) {
        callback(null, res);
      }
      return true;
    })
    .catch(function(err) {
      console.log('Error:', err);
      if (callback) {
        callback(err, null);
      }
      return false;
    });
  };

  var becomeVendor = function(info, callback) {
    var data = _.pick(info, [
      'description',
      'firstName',
      'middleInitial',
      'lastName',
      'displayName',
      'types'
    ]);

    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/vendor/add',
      data: data
    })
    .then(function(res) {
      console.log('Success:', res);
      if (callback) {
        callback(null, res);
      }
      return true;
    })
    .catch(function(err) {
      console.log('Error:', err);
      if (callback) {
        callback(err, null);
      }
      return false;
    });
  };

  return {
    changeStatus: changeStatus,
    getStatus: getStatus,
    updateProfile: updateProfile,
    becomeVendor: becomeVendor
  };
});