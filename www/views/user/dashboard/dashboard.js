angular.module('userDashboard', ['search', 'leaflet-directive','ngCordova', 'vendorFactory','map'])
.controller('UserDashboardCtrl', function($scope, $ionicModal, Search, $state, Vendor, MapService) {
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
   * START SEND TIP TEMPLATING
   */
  $ionicModal.fromTemplateUrl('views/user/dashboard/vendorProfile/sendTip.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.tipModal = modal;
  });
  $scope.showTipModal = function() {
    $scope.tipModal.show();
  };
  $scope.hideTipModal = function() {
    $scope.data.selected = {};
    $scope.tipModal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.tipModal.remove();
  });

  /*
   * END SEND TIP TEMPLATING
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
    L.DomEvent
    .addListener(container, 'click', L.DomEvent.stopPropagation)
    .addListener(container, 'click', L.DomEvent.preventDefault)
    L.DomEvent.addListener(container, 'click', function(){locate();});
    return container;
  }
  $scope.controls.custom.push(MyControl);

  //get current position
  var locate = function(){
    // MapService.getCurrentLocation({}, function(err, location){
    //   $scope.goTo(location);
    //   createMarkers([location]);
    // });
console.log(onErr);
    navigator.geolocation.getCurrentPosition(function(position){
      console.log("made it to success");
      console.log(position);
      $scope.goTo(position);
      createMarkers([position]);
    }, function(err){ 
      console.log("Error retrieveing location: ",err);
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
  
  var getInterest = function(params){
    MapService.getMarkers(params,function(err,vendorsLocation){
      console.log("vendor markers");
      console.log(vendorsLocation);
      $scope.map.markers = vendorsLocation;
    });
  };

  var createMarkers = function(location){
    var result = {};
    //may have to check if we are receiving markers from db or from cordova
    for(var i = 0; i< location.length; i++){
       i = {
        lat: location[i].coords.latitude,
        lng: location[i].coords.longitude,
        draggable: false,
        message: 'Current Location',
        focus: true
      };
      result[i] = i;
    }
    $scope.map.markers = result;
  };


  $scope.goTo = function(location){
    $scope.map.center.lat = location.coords.latitude;
    $scope.map.center.lng = location.coords.longitude;
    $scope.map.center.zoom = 16;
  };
  
  var markers = [
    {latitude: 43.645016,longitude: -79.39092},
    {latitude: 43.666503,longitude: -79.381121},
    {latitude: 43.655542,longitude: -79.41307},
    {latitude: 43.666316,longitude: -79.367193}
  ];
  //getInterest(markers);

  /*
  * END MAP TEMPLATING
  */
});
