angular.module('vendorFactory', ['angularFileUpload', 'auth'])
.factory('Vendor', function($http, $upload, Auth) {
  var updateStatus = function(changes, callback) {
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
      url: config.baseUrl + '/api/vendor/' + vendor + '/status'
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

  var updateProfile = function(changes, callback) {
    var data = _.pick(changes, [
      'description',
      'displayName',
      'category'
    ]);
    
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

  var becomeVendor = function(info, callback) {
    var data = _.pick(info, [
      'description',
      'firstName',
      'middleInitial',
      'lastName',
      'displayName',
      'category'
    ]);

    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/vendor/add',
      data: data
    })
    .then(function(res) {
      console.log('Data:', res);
      Auth.isVendor = res.data.isVendor;
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

  var fileUpload = function(files) {
    console.log('Files:', files);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      $upload.upload({
        method: 'POST',
        url: config.baseUrl + '/api/vendor/photo',
        file: file,
      })
      .progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      })
      .success(function(data, status, headers, config) {

        console.log(data);
      });
    }
  };

  return {
    updateStatus: updateStatus,
    getStatus: getStatus,
    updateProfile: updateProfile,
    becomeVendor: becomeVendor,
    fileUpload: fileUpload
  };
});