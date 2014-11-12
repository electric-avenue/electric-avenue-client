angular.module('vendorProfile', ['angularFileUpload'])
.controller('VendorProfileCtrl', function($scope, $upload) {
  // will add to factory eventually
  $scope.onFileSelect = function($files) {
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: config.baseUrl + '/api/vendor/photo', 
        method: 'POST',
        data: {myObj: $scope.myModelObj},
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
});