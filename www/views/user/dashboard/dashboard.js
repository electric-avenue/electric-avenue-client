angular.module('userDashboard', ['search', 'leaflet-directive'])
.controller('UserDashboardCtrl', function($scope, $ionicModal, Search, $state) {
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
    console.log('hey:', vendor);
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

  $scope.map = {
    defaults: {
      tileLayer: "https://{s}.tiles.mapbox.com/v3/deziak1906.k8mphke2/{z}/{x}/{y}.png",
      maxZoom: 18,
      zoomControlPosition: 'bottomleft'
    },
    center: {
      lat: 43.661165,
      lng: -79.390919,
      zoom: 15
    },
    markers : {},
    events: {
      map: {
        enable: ['context'],
        logic: 'emit'
      }
    }
  };
});
