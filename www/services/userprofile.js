angular.module('userFactory', [])
.factory('User', function($http) {
  var update = function(changes, callback) {
    var data = _.pick(changes, [
      'oldPassword',
      'newPassword',
      'displayname',
      'firstname',
      'middlename',
      'lastname',
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

  var getSelf = function(callback) {
    return $http({
      method: 'GET',
      url: config.baseUrl + '/api/user/personal'
    })
    .then(function(res) {
      console.log('Get Personal Success!:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('Get Personal Error:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  var getDistance = function(params, callback){
    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/user/calcDistance',
      data: params
    }).then(function(res){
      if(callback){
        callback(null,res);
      }
    }).catch(function(err){
      console.log("Get Distance Error", err);
      if(callback){
        callback(err,null);
      }
    });
  };

  return {
    update: update,
    getSelf: getSelf,
    getDistance: getDistance
  };
});
