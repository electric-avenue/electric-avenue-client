angular.module('userDashboard', ['search', 'leaflet-directive','ngCordova', 'vendorFactory','map', 'stripe','userFactory'])
.controller('UserDashboardCtrl', function($scope, $ionicModal, Search, $state, Vendor, MapService, Payments, User) {
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
    User.getSelf(function(err,user){
       $scope.data.user = user.data.result;
       var userId= user.data.result.id;
      User.getDistance({'userID': user.data.result.id, 'vendorID': vendor.id}, function(err, distance){
        $scope.data.distance = Number(distance.data.data).toFixed(1);
      });
    });
    
    $scope.data.selected = vendor;
    $scope.vendorModal.show();
    $scope.vendorProfileMap= {
      defaults: {
        tileLayer: "https://{s}.tiles.mapbox.com/v3/deziak1906.k8mphke2/{z}/{x}/{y}.png",
        maxZoom: 18,
        zoomControlPosition: 'bottomleft',
        attributionControl:false
      },
      center: {
        lat: vendor.latitude,
        lng: vendor.longitude,
        zoom: 15
      },
      markers : {
        'curPos':{
          lat: vendor.latitude,
          lng: vendor.longitude
        }
      },
      events: {
        map: {
          enable: ['context'],
          logic: 'emit'
        }
      }
    };    
    Vendor.getStatus(vendor.User.username, function(err, res) {
      $scope.data.selected.status = res.data.result.isOnline;
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

      User.getSelf(function(err,user){
        var userId= user.data.result.id;
        
        for (var i=0; i<$scope.data.vendors.length; i++) {
          var wrapper = function(i) {
            User.getDistance({'userID': userId, 'vendorID': $scope.data.vendors[i].id}, function(err, distance){
              console.log('INDEX', i, 'SCOPE VENDOR VAR', $scope.data.vendors[i]);
              $scope.data.vendors[i].distance = Number(distance.data.data).toFixed(1);  
            });
          }(i);
        }
      });
    });
  };

  $scope.addRating = function(number) {
    var rating = {
      vendor: $scope.data.selected.User.username,
      rating: number
    };
    Search.addRating(rating, function(err, res) {
      console.log('err', err, 'res', res);
    });
  };

  $scope.displayRating = function(avg, show) {
    avg = Math.round(avg);
    var ans = [];
    if (show) {
      for (var i = 1; i <= avg; i++) {
        ans.push(i);
      }
    } else {
      for (var i = avg + 1; i <= 5; i++) {
        ans.push(i);
      }
    }
    return ans;
  };
  $scope.getStatus = function(vendor) {
  };

  $scope.tipData = {
    vendor: '',
    currency: 'usd',
    amount: ''
  };
  $scope.sendTip = function() {
    var vendor = $scope.tipData.vendor;
    var payment = {
      currency: $scope.tipData.currency,
      amount: $scope.tipData.amount
    };
    console.log('payment data', payment);
    Payments.sendTip(vendor, payment, function() {
      $scope.hideTipModal();
    });
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
  $scope.showTipModal = function(vendor) {
    $scope.tipData.vendor = vendor;
    $scope.tipModal.show();
  };
  $scope.hideTipModal = function() {
    $scope.tipData.vendor = '';
    $scope.tipData.amount = '';
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
  // $scope.filters = {
  //   'types-art' : {
  //     title: 'Art',
  //     selected: true
  //   },
  //   'types-music' : {
  //     title: 'Music',
  //     selected: true
  //   },
  //   'types-performance' : {
  //     title: 'Performance',
  //     selected: false
  //   }
  //   //foods
  //   //goods
  //   //farmers markets
  // };
  $scope.types = [
    {
      name: "Art", selected: false,
    },
    {   
      name: "Music", selected: false,
    },
    {
      name: "Performance", selected: false,
    },
    {
      name: "Food", selected: false,
    },
    {
      name: "Goods", selected: false,
    },
    {
      name:"Farmers Market", selected: false
    }
  ];

  $scope.typeSelection = [];

  $scope.$watch('types|filter:{selected:true}', function (typeArray) {
    //If no filters selected, then place markers for all vendors
    if (typeArray.length === 0) {
      initializeMarkers();
      return;
    }

    //Else place markers for all types checked in filter
    var clicked = [];
    for (var i=0; i<typeArray.length; i++) {
      clicked.push(typeArray[i].name)
    }
      Search.getVendors({category: clicked}, setMarkers);
    }, true);

  $scope.selectedFilters = _.filter($scope.filters, 'selected');


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


  var local_icons = {
    FoodIcon:{
      iconUrl: 'img/food.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
      // shadowUrl: 'img/leaf-shadow.png',
      // iconSize: [100,50],  //size of the icon
      // shadowSize: [50,64], //size of the shadow
      // iconAnchor: [22,94], //point of the icon which will correspond to marker's location
      // shadowAnchor: [4,62], //point for shadow icon
    },
    MusicIcon:{
      iconUrl: 'img/music.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    PerformanceIcon:{
      iconUrl: 'img/theater.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    ArtIcon:{
      iconUrl: 'img/art.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    GoodsIcon:{
      iconUrl: 'img/gifts.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    FarmersMarketIcon:{
      iconUrl: 'img/bread.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    }
  };

  var initializeMarkers = function() {
    Search.getVendors({}, setMarkers);
  }

  var setMarkers = function(err, vendors) {
    vendors = vendors.data.result;

    var markers = {};
    
    for(var i = 0; i < vendors.length; i++){
  
      markers[i] = {
        lat: vendors[i].latitude,
        lng: vendors[i].longitude,
        message: 'You clicked me!',
        draggable: false,
        label: {
          message: vendors[i].User.displayname,
          options: {
            noHide: true
          }
        },
        icon: local_icons[(vendors[i].category).split(' ').join('') + 'Icon']
      };
    }

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
        markers : markers || {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };
  };

initializeMarkers();
  
  // var getInterest = function(params){
  //   MapService.setMarkers(params,function(err,vendorsLocation){
  //     console.log("vendor markers");
  //     console.log(vendorsLocation);
  //     $scope.map.markers = vendorsLocation;
  //   });
  // };


  // var createMarkers = function(location){
  //   var result = {};
  //   //may have to check if we are receiving markers from db or from cordova
  //   for(var i = 0; i< location.length; i++){
  //      i = {
  //       lat: location[i].coords.latitude,
  //       lng: location[i].coords.longitude,
  //       draggable: false,
  //       message: 'Current Location',
  //       focus: true
  //     };
  //     result[i] = i;
  //   }
  //   // $scope.map.markers = result;
  // };

//Handle when user is requesting info vendors Near User
//will make a call in search.js
//populate map with information
//may need to dummy up information
  $scope.getRecommendations = function(){
    //set default distance to 5 miles
    User.getSelf(function(err,user){
       var userId= user.data.result.id;
       User.getRecommendations({'userID':userId, 'miles': 5},function(err,result){
        setMarkers(null, result);
        //will need to create markers and place them on map
       });
    });
  };
  $scope.goTo = function(location){
    $scope.map.center.lat = location.coords.latitude;
    $scope.map.center.lng = location.coords.longitude;
    $scope.map.center.zoom = 16;
  };
  
  var markers = [
    {latitude: 43.645016,longitude: -79.39092, displayname: 'test test', type: 'food'},
    {latitude: 43.666503,longitude: -79.381121, displayname: 'test test', type: 'food'},
    {latitude: 43.655542,longitude: -79.41307, displayname: 'test test', type: 'food'},
    {latitude: 43.666316,longitude: -79.367193, displayname: 'test test', type: 'food'},
    {latitude: 43.646596,longitude: -79.386413, displayname: 'test test', type: 'food'},
    {latitude: 43.644280,longitude: -79.400347, displayname: 'test test', type: 'food'},
    {latitude: 43.676396,longitude: -79.357112, displayname: 'test test', type: 'food'},
    {latitude: 43.647986,longitude: -79.400473, displayname: 'test test', type: 'food'},
    {latitude: 43.664605,longitude: -79.373874, displayname: 'test test', type: 'food'},
    {latitude: 43.667754,longitude: -79.396075, displayname: 'test test', type: 'food'},
    {latitude: 43.655243,longitude: -79.419252, displayname: 'test test', type: 'food'},
    {latitude: 43.649632,longitude: -79.434537, displayname: 'test test', type: 'food'},
    {latitude: 43.654724,longitude: -79.452157, displayname: 'test test', type: 'food'},
    {latitude: 43.653000,longitude: -79.378997, displayname: 'test test', type: 'food'},
    {latitude: 43.663163,longitude: -79.454888, displayname: 'test test', type: 'food'},
    {latitude: 43.649092,longitude: -79.425950, displayname: 'test test', type: 'food'},
    {latitude: 43.638496,longitude: -79.532080, displayname: 'test test', type: 'food'},
    {latitude: 43.665364,longitude: -79.409445, displayname: 'test test', type: 'food'},
    {latitude: 43.652778,longitude: -79.369347, displayname: 'test test', type: 'food'},
    {latitude: 43.594245,longitude: -79.509620, displayname: 'test test', type: 'food'},
    {latitude: 43.685960,longitude: -79.422028, displayname: 'test test', type: 'food'},
    {latitude: 43.638834,longitude: -79.381878, displayname: 'test test', type: 'food'},
    {latitude: 43.671609,longitude: -79.388442, displayname: 'test test', type: 'food'},
    {latitude: 43.636934,longitude: -79.469089, displayname: 'test test', type: 'food'},
    {latitude: 43.646129,longitude: -79.417376, displayname: 'test test', type: 'food'},
    {latitude: 43.650661,longitude: -79.388511, displayname: 'test test', type: 'food'}
  ];

  /*
  * END MAP TEMPLATING
  */
});
