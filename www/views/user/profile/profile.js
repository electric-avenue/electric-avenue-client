angular.module('userprofile', ['userFactory'])
.controller('UserProfileCtrl', function($scope, $state, User) {
  $scope.data = {
    oldPassword: '',
    newPassword: '',
    email: '',
    displayname: '',
    firstname: '',
    middlename: '',
    lastname: '',
    zipcode: '',
    age: ''
  };

  $scope.update = function() {
    User.update($scope.data);
  };

  $scope.populate = function() {
    User.getSelf(function(err, data) {
      console.log('data!:', data);
      _.extend($scope.data, data.data.result);
    });
  };
});
