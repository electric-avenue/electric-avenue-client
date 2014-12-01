angular.module('userpassword', ['auth'])
.controller('ChangePasswordCtrl', function($scope, $state, Auth) {
  $scope.data = {
    oldPassword: '',
    newPassword: '',
    error: ''
  };

  $scope.changePassword = function() {
    var data = {
      oldPassword: $scope.data.oldPassword,
      newPassword: $scope.data.newPassword
    };
    Auth.changePassword(data, function(err, res) {
      console.log('Password Change Attempt:', err, res);
      if (res.data.success) {
        $state.transitionTo('app.home');
        $scope.data.error = '';
        return;
      }
      $scope.data.error = res.data.result;
    });
  };
});