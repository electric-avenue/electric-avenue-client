angular.module('userDashboard', ['search', 'leaflet-directive','ngCordova', 'vendorFactory'])
.controller('UserDashboardCtrl', function($scope, $ionicModal, Search, $state,$cordovaGeolocation, Vendor) {
  $scope.data = {
    vendors: [],
    selected: {}
  };
  /*
  * VENDOR PROFILE TEMPLATING
  */
  $ionicModal.fromTemplateUrl('views/user/dashboard/vendorProfile/vendorprofile.html', {
    scope: $scope,
    animation: 'slide-left-right'
  }).then(function(modal) {
    $scope.vendorModal = modal;
  });
  $scope.showVendor = function(vendor) {
    $scope.data.selected = vendor;
    $scope.vendorModal.show();
    console.log('checker', vendor);
    Vendor.getStatus(vendor.User.username, function(err, res) {
      $scope.data.selected.status = res.data.result.isOnline;
      console.log('hELLO', res);
    });
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
    Search.getVendors({}, function(err, vendors) {
      $scope.data.vendors = vendors.data.result;
      console.log('Vendors:', vendors.data.result);
    });
  };

  $scope.addRating = function(number) {
    var rating = {
      vendor: $scope.data.selected.User.username,
      rating: number//,
      // review: 
    };
    Search.addRating(rating, function(err, res) {
      console.log('err', err, 'res', res);
    });
  };

  $scope.getStatus = function(vendor) {
  };
  /*
  * END VENDOR PROFILE TEMPLATING
  */ 

  /* 
  * FILTER TEMPLATING
  */
  $ionicModal.fromTemplateUrl('views/user/dashboard/filter/filter.html', {
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
  // console.log(JSON.stringify($scope.selectedFilters));

// MAP Implementation JAMON'S Stuff//
  $scope.controls = {
    custom: []
  };
  /*
  * END FILTER TEMPLATING
  */

  /*
  * MAP TEMPLATING
  */
  var MyControl = L.control();
  MyControl.setPosition('bottomright');
  MyControl.onAdd = function () {
    var className = 'icon ion-compass mycompass', 
    container = L.DomUtil.create('div', className);
    return container;
  }
  $scope.controls.custom.push(MyControl);


  var locate = function(){
    $cordovaGeolocation
    .getCurrentPosition()
    .then(function(position){
      $scope.map.center.lat = position.coords.latitude;
      $scope.map.center.lng = position.coords.longitude;
      $scope.map.center.zoom = 16;

      $scope.map.markers['now'] = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        message: " This is you!",
        focus: true,
        draggable: false
      }, function(err){
        console.log("Error getting your location.",err);
      }
    });
  };
  $scope.map = {
    defaults: {
      tileLayer: "https://{s}.tiles.mapbox.com/v3/deziak1906.k8mphke2/{z}/{x}/{y}.png",
      maxZoom: 18,
      zoomControlPosition: 'bottomleft',
      attributionControl:false
    },
    center: {
      // lat: 43.661165,
      // lng: -79.390919,
      // zoom: 15
    },
    markers : {},
    events: {
      map: {
        enable: ['context'],
        logic: 'emit'
      }
    } 
  };
  locate();

  $scope.goTo = function(location){
    if(location === 0){
      $scope.locate();
    }
  };
  /*
  * END MAP TEMPLATING
  */
});
