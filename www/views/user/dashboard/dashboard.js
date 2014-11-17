angular.module('userDashboard', [])
.controller('UserDashboardCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('views/user/vendorprofile/vendorprofile.html', {
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.vendorModal = modal;
  });
  $scope.showVendor = function() {
    $scope.vendorModal.show();
  };
  $scope.hideVendor = function() {
    $scope.vendorModal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.vendorModal.remove();
  });
});
