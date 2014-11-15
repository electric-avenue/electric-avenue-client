angular.module('userprofile', [])
.factory('UserProfile', function($http) {
  var updateProfile = function(changes, callback) {
    var data = _.pick(changes, [
      'password',
      'email',
      'zipcode',
      'displayname'
    ]);

    return $http({
      method: 'POST',
      url: config.baseUrl + '/user/update',
      data: data
    })
    .then(function(res) {
      console.log('Sucess:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('Error:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  return {
    updateProfile: updateProfile
  };
});
