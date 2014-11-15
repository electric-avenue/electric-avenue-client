angular.module('vendorFactory', ['angularFileUpload'])
.factory('Vendor', function($http, $upload) {
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
      return false;
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

  var fileUpload = function(files) {
    console.log('Files:', files);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      $upload.upload({
        url: config.baseUrl + '/api/vendor/photo',
        method: 'POST',
        file: file,
      })
      .progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        // $scope.uploading = true;
      })
      .success(function(data, status, headers, config) {
        // $scope.uploading = false;
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