angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, Auth, $state) {
  $scope.isAuth = Auth.isAuth;
  $scope.logout = function() {
    Auth.logout();
    $state.go('app.login');
  };
});
