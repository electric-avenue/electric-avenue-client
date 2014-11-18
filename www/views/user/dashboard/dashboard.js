angular.module('userDashboard', ['search'])
.controller('UserDashboardCtrl', function($scope, $ionicModal, Search) {
  $scope.data = {
    vendors: [],
    selected: {}
  };
  $ionicModal.fromTemplateUrl('views/user/dashboard/vendorProfile/vendorprofile.html', {
    scope: $scope,
    animation: 'slide-left-right'
  }).then(function(modal) {
    $scope.vendorModal = modal;
  });
  $scope.showVendor = function(vendor) {
    $scope.data.selected = vendor;
    $scope.vendorModal.show();
  };
  $scope.hideVendor = function() {
    $scope.data.selected = {};
    $scope.vendorModal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.vendorModal.remove();
  });

  $scope.loadVendors = function() {
    console.log('hey');
    Search.getVendors({}, function(err, vendors) {
      $scope.data.vendors = vendors.data.result;
      console.log('Vendors:', vendors.data.result);
    });
  };
  $ionicModal.fromTemplateUrl('views/user/dashboard/filter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.filterModal = modal;
  });
  $scope.showFilter = function() {
    $scope.filterModal.show();
  };
  $scope.hideFilter = function() {
    $scope.filterModal.hide();
  };
  $scope.filters = {
    'types-art' : {
      title: 'Art',
      selected: true
    },
    'types-music' : {
      title: 'Music',
      selected: true
    },
    'types-performance' : {
      title: 'Performance',
      selected: false
    }
  };
  $scope.selectedFilters = _.filter($scope.filters, 'selected');
  console.log(JSON.stringify($scope.selectedFilters));
});
