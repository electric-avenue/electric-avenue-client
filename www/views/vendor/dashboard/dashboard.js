angular.module('vendorDashboard', ['leaflet-directive', 'vendorFactory', 'map', 'ngCordova'])
.controller('VendorDashboardCtrl', function($scope, $ionicModal, Search, $state, Vendor, MapService) {
  $scope.data = {
    tips: [],
    totalTips: {
      total: 0,
      pending: 0
    },
  };

  $scope.getTips = function() {
    Vendor.getInfo(function(err, res) {
      $scope.data.tips = res.data.data.Vendor.Tips;
      $scope.data.totalTips = $scope.data.tips.reduce(function(mem, val, index) {
        var amount = Number(val.amount) / 100;
        $scope.data.tips[index].dollars = '$' + amount;
        var date = new Date(val.updatedAt);
        $scope.data.tips[index].dateFormat = moment(date).format('MM/DD/YYYY hh:mm a');
        if (val.paid) {
          mem.total += amount;
        } else {
          mem.pending += amount;
        }
        return mem;
      }, {total: 0, pending: 0});
    });
  };
  // MAP Implementation JAMON'S Stuff//
  $scope.controls = {
    custom: []
  };
  $scope.layers = {
    custom:[]
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
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };


 Search.getAllPeds(function(err, res) {
  console.log('get all peds')
  console.log(err);
  console.log(res);

  //   var heat = L.heatLayer(
  //           pedVolume,{
  //           radius: 20,
  //           blur: 15, 
  //           maxZoom: 17});
  // console.log(heat);

  var pedVolume = res;

    // var pedVolume = [
    // [43.7, -79.4, 25],
    // [43.69, -79.39, 20],
    // [43.664605, -79.373874, 15]
    //   ];

   // var pedVolume = [{lat: 43.60, lon: -79.30, value: 0},{lat: 43.61, lon: -79.31, value: 10},{lat: 43.62, lon: -79.32, value: 20},{lat: 43.63, lon: -79.33, value: 30},{lat: 43.64, lon: -79.34, value: 40},{lat: 43.65, lon: -79.35, value: 50},{lat: 43.66, lon: -79.36, value: 60},{lat: 43.67, lon: -79.37, value: 70}]

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
    layers: {
      baselayers: {
        xyz: {
          name: 'Default',
          url: 'https://{s}.tiles.mapbox.com/v3/deziak1906.k8mphke2/{z}/{x}/{y}.png',
          type: 'xyz'
        }
      },
      overlays: {
        heatmap: {
          name: 'Pedestrian Flow',
          type: 'heatmap',
          visible: true,
          max: 80000,
          data:  pedVolume,
          // gradient: {0.4: 'red', 0.65: 'lime', 1: 'red'}
           //url: 'http://suite.opengeo.org/geoserver/usa/wms',
          // layerParams: {
          //   layers: 'usa:states',
          //   format: 'image/png',
          //   transparent: true
          // }
        }
       }
    },
    markers : {}
    // events: {
    //   map: {
    //     enable: ['context'],
    //     logic: 'emit'
    //   }
   // } 
  };
 })




  //console.log(L);
  
  
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

  var onSuccess = function(position){
    console.log("made it to success");
    console.log(position);
    $scope.goTo(position);
    createMarkers([position]);
  };

  var onError = function(err){
    console.log("Error retrieveing location: ",err);
  };
  /*
  * END MAP TEMPLATING
  */
 //locate();
});
