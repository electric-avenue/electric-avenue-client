angular.module('map', ['leaflet-directive','ngCordova'])
.factory('MapService', function($http,$cordovaGeolocation){

  var getCurrentLocation = function(params, callback){
    navigator.geolocation.getCurrentPosition()
    .then(function(position){
      if(callback){
        callback(null, position);
      }
    })
    .catch(function(err){
      console.log('Map Service getLocation error: ',err)
    })
  };

  var setMapLocation = function(params,callback){
    //receives a lat and long 
  };

  var getMarkers = function(params, callback){
    //make an http request 
    console.log("made it HERE");
    console.log(params);
    var markers = {};
    for(var i = 0; i<params.length;i++){
      markers[i] = {
        lat: params[i].latitude,
        lng: params[i].longitude,
        draggable: false
      }
    }
    if(callback){
      callback(null,markers);
    }
    //return markers
  };

  var setMarkers = function(params, callback){
    //receives array of lat and long values
  };

  var getInterests = function(params,callback){
    console.log("Hit map service", params);
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