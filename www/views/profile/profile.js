angular.module('userprofile', ['userFactory', 'angularFileUpload', 'vendorFactory'])
.controller('UserProfileCtrl', function($scope, $state, User, $upload, Vendor) {
  $scope.data = {
    user: {
      oldPassword: '',
      newPassword: '',
      email: '',
      displayname: '',
      firstname: '',
      middlename: '',
      lastname: '',
      zipcode: '',
      age: '' 
    },
    vendor: {
      description: '',
      fileInput: '',
      types: ''
    }
  };

  // $scope.data = {
  //   fileInput: '',
  //   description: '',
  //   types: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipcode: ''
  // };
  $scope.update = function() {
    User.update($scope.data.user, function() {
      Vendor.updateProfile($scope.data.vendor);
    });
  };

  $scope.populate = function() {
    User.getSelf(function(err, data) {
      console.log('data!:', data);
      _.extend($scope.data.user, data.data.result);
      _.extend($scope.data.vendor, data.data.result.Vendor);
      console.log('Scope:', $scope.data);
    });

  };
});