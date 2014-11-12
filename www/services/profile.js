angular.module('profile', [])
.factory('profile', function($http) {

  var changeStatus = function(changes, callback) {

  };

  var getStatus = function(callback) {

  };

  var updateProfile = function(changes, callback) {

  };

  var becomeVendor = function(info, callback) {
    var data = {
      description: info.description
    }
    return $http({
      method: 'POST',
      data: 

    }).then(function() {
      if 

    })
  };

  return {
    changeStatus: changeStatus,
    getStatus: getStatus,
    updateProfile: updateProfile,
    becomeVendor: becomeVendor
  };
});

  image: Sequelize.STRING,
  description: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  total_tip: Sequelize.DECIMAL,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT