angular.module('vendorSignup', ['angularFileUpload'])
.controller('VendorSignupCtrl', function($scope, $upload) {
  // will add to factory eventually
  $scope.data = {
    fileInput: ''
  };
  $scope.uploading = false;
  $scope.onFileSelect = function() {
    var files = $scope.data.fileInput;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      $scope.upload = $upload.upload({
        url: config.baseUrl + '/api/vendor/photo',
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: file,
      })
      .progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        $scope.uploading = true;
      })
      .success(function(data, status, headers, config) {
        $scope.uploading = false;
        console.log(data);
      });
    }
  };
});
