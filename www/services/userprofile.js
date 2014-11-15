angular.module('userFactory', [])
.factory('User', function($http) {
  var update = function(changes, callback) {
    var data = _.pick(changes, [
      'oldPassword',
      'newPassword',
      'displayName',
      'firstName',
      'middleName',
      'lastName',
      'email',
      'zipcode',
      'age'
    ]);

    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/user/update',
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
    update: update
  };
});
