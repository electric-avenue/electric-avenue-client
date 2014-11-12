angular.module('profile', [])
.factory('profile', function($http, $upload) {
  var changeStatus = function(changes, callback) {

  };

  var getStatus = function(callback) {

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
    }).then(function(res) {
      console.log('Success:', res);
      return true;
    }).catch(function(err) {
      console.log('Error:', err);
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
    }).then(function(res) {
      console.log('Success:', res);
      return true;
    }).catch(function(err) {
      console.log('Error:', err);
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