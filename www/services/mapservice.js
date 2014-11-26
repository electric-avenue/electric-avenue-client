angular.module('map', ['leaflet-directive','ngCordova','search'])
.factory('MapService', function($http,$cordovaGeolocation, Search){ 
  
  var types = {};
  var markers = {};



  var getCurrentLocation = function(params, callback) {
    navigator.geolocation.getCurrentPosition()
    .then(function(position) {
      if(callback) {
        callback(null, position);
      }
    })
    .catch(function(err){
      console.log('Map Service getLocation error:', err);
    });
  };

  var setMapLocation = function(params,callback) {
    //receives a lat and long 
  };

  var local_icons = {
    foodIcon:{
      iconUrl: 'img/food.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
      // shadowUrl: 'img/leaf-shadow.png',
      // iconSize: [100,50],  //size of the icon
      // shadowSize: [50,64], //size of the shadow
      // iconAnchor: [22,94], //point of the icon which will correspond to marker's location
      // shadowAnchor: [4,62], //point for shadow icon
    },
    musicIcon:{
      iconUrl: 'img/music.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    performanceIcon:{
      iconUrl: 'img/theater.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    artIcon:{
      iconUrl: 'img/art.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    goodsIcon:{
      iconUrl: 'img/gifts.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    farmersIcon:{
      iconUrl: 'img/bread.png',
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    }
  };

  var setMarkers = function(vendors, callback) {
    console.log('setMarkers Vendor Argument: ', vendors);
    
    for(var i = 0; i < vendors.length; i++){
      console.log()
      markers[i] = {
        lat: vendors[i].latitude,
        lng: vendors[i].longitude,
        message: 'You clicked me!',
        draggable: false,
        label: {
          message: vendors[i].displayname,
          options: {
            noHide: true
          }
        },
        icon: local_icons[vendors[i].type + 'Icon']
      };
    }
    // if(callback) {
    //   callback(null,markers);
    // }
  };

  var getInterests = function(types) {
    //service property represent interest data points
    //when we are returned data from server side call assign to prop above.
    //add a function that is a getter for the property.
    // console.log(params);
    Search.getVendors(types.name, setMarkers);
  };

  return {
    getCurrentLocation: getCurrentLocation,
    setMapLocation: setMapLocation,
    setMarkers: setMarkers,
    getInterests: getInterests
  };
});




//object return current $location
//return currently stored location