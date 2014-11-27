/**
 * Menu Controller for the side menu
 * @module MenuCtrl
 */
angular.module('starter.controllers', [
  'vendorFactory',
  'map'
])
.controller('MenuCtrl', function($scope, Auth, $state, $http, $ionicPopover, Vendor, MapService) {
  // States to avoid showing the map & list buttons for
  var excludedStates = [
    'app.vendorProfile',
    'app.vendorSignup',
    'app.userProfile',
    'app.changePassword',
    'app.paymentProfile'
  ];
  $scope.data = {
    status: false,
    vendorStatus: 'Offline'
  }
  var vendorRoutes = [
    'app.vendorHome',
    'app.vendorMap'
  ];
  $scope.state = _.indexOf(excludedStates, $state.current.name) === -1;
  $scope.isVendorDash = _.indexOf(vendorRoutes, $state.current.name) !== -1;
  $scope.$watch(function($scope) {
    $scope.state = _.indexOf(excludedStates, $state.current.name) === -1;
    $scope.isVendorDash = _.indexOf(vendorRoutes, $state.current.name) !== -1;
  });
  // Get auth method
  //
  $scope.check = {
    isAuth: function() {
      return Auth.isAuth;
    },
    isVendor: function() {
      return Auth.isVendor;
    },
    isOnline: function() {
      $scope.data.status = Auth.isOnline;
      if ($scope.data.status) {
        $scope.data.vendorStatus = 'Online';
      } else {
        $scope.data.vendorStatus = 'Offline';
      }
      return $scope.data.status;
    }
  };
  // Setup the popover menu for the gear on the right
  $ionicPopover.fromTemplateUrl('templates/popover.html', function(popover) {
    $scope.popover = popover;
  });
  // Expose logout for the user
  $scope.logout = function() {
    Auth.logout();
    $state.go('login');
  };
  $scope.changeState = function(name) {
    $state.transitionTo(name);
  };

  $scope.changeStatus = function() {
    MapService.getCurrentLocation({}, function(pos){
      var data = {
        status: $scope.data.status,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };

      Vendor.updateStatus(data, function(err, res) {
        if ($scope.data.status) {
          $scope.data.vendorStatus = 'Online';
        } else {
          $scope.data.vendorStatus = 'Offline';
        }
      });
    });
  }
});
