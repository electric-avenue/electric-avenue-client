angular.module('vendorSignup', ['vendorFactory'])
.controller('VendorSignupCtrl', function($scope, $http, Vendor) {
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
  $scope.becomeVendor = function() {
    var data = _.pick($scope.data, [
      'description'
    ]);
    Vendor.becomeVendor(data, function(err, res) {
      if (err) {
        console.log('Error', err);
        return;
      }
      console.log('Success:', res);
      if ($scope.data.fileInput) {
        Vendor.fileUpload($scope.data.fileInput);
      }
      return;
    });
  };
});
