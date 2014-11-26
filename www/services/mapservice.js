angular.module('map', ['leaflet-directive','ngCordova','search'])
.factory('MapService', function($http,$cordovaGeolocation, Search){ 
  var types = {};
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
      // shadowUrl: 'img/leaf-shadow.png',
      // iconSize: [100,50],  //size of the icon
      // shadowSize: [50,64], //size of the shadow
      // iconAnchor: [22,94], //point of the icon which will correspond to marker's location
      // shadowAnchor: [4,62], //point for shadow icon
      popupAnchor: [15,0] //point from which the popup should open relative to the iconAnchor
    },
    musicIcon:{
      iconUrl: 'img/music.png',
      popupAnchor: [-3,-76], //point from which the popup should open relative to the iconAnchor
    },
    performanceIcon:{
      iconUrl: 'img/theater.png',
      popupAnchor: [-3,-76], //point from which the popup should open relative to the iconAnchor
    },
    artIcon:{
      iconUrl: 'img/art.png',
      popupAnchor: [-3,-76], //point from which the popup should open relative to the iconAnchor
    },
    goodsIcon:{
      iconUrl: 'img/gifts.png',
      popupAnchor: [-3,-76], //point from which the popup should open relative to the iconAnchor
    },
    farmersIcon:{
      iconUrl: 'img/bread.png',
      popupAnchor: [-3,-76], //point from which the popup should open relative to the iconAnchor
    }
  };

  var getMarkers = function(params, callback) {
    //make an http request 
    console.log("made it HERE");
    console.log(params);
    var markers = {};
    for(var i = 0; i < params.length; i++){
      console.log()
      markers[i] = {
        lat: params[i].latitude,
        lng: params[i].longitude,
        message: 'You clicked me!',
        draggable: false,
        label: {
          message: params[i].displayname,
          options: {
            noHide: true
          }
        },
        icon: local_icons[params[i].type + 'Icon']
      };
    }
    if(callback) {
      callback(null,markers);
    }
    //return markers
  };

  var setMarkers = function(params, callback) {
    //receives array of lat and long values
  };

  var getInterests = function(params) {
    //service property represent interest data points
    //when we are returned data from server side call assign to prop above.
    //add a function that is a getter for the property.
    // console.log(params);
    Search.getVendors(params.name);
  };

  return {
    getCurrentLocation: getCurrentLocation,
    getMarkers: getMarkers,
    setMapLocation: setMapLocation,
    setMarkers: setMarkers,
    getInterests: getInterests
  };
});




//object return current $location
//return currently stored location