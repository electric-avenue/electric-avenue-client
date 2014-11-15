angular.module('userprofile', ['userFactory'])
.controller('UserProfileCtrl', function($scope, $state, User) {
  $scope.data = {
    oldPassword: '',
    newPassword: '',
    email: '',
    displayName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    zipcode: '',
    age: ''
  };

  $scope.update = function() {
    User.update($scope.data);
  };
});
