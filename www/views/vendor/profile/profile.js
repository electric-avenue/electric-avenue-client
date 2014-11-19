angular.module('vendorProfile', ['angularFileUpload', 'vendorFactory', 'userFactory'])
.controller('VendorProfileCtrl', function($scope, $upload, Vendor, User) {
  // will add to factory eventually
  $scope.data = {
    fileInput: '',
    description: '',
    types: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  };

  $scope.uploading = false;

  $scope.update = function() {
    Vendor.updateProfile($scope.data);
  };

  $scope.populate = function() {
    User.getSelf(function(err, data) {
      console.log('data!:', data);
      _.extend($scope.data, data.data.result);
      _.extend($scope.data, data.data.result.Vendor);
    });
  };
});