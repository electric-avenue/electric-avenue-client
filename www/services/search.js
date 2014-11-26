angular.module('search', [])
.factory('Search', function($http) {
  
  var getVendors = function(type, callback) {
    console.log("From search service");
    console.log(type);
    return $http({
      method: 'GET',
      url: config.baseUrl + '/api/vendor/get',
      data: type
    })
    .then(function(res) {
      console.log('Vendor Get Success!:', res);
      if (callback) {
        callback(res.data.result);
      }
    })
    .catch(function(err) {
      console.log('Vendor Get Error:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };
  //name = vendor email or username (display name wip)
  var getOneVendor = function(name, callback) {
    return $http({
      method: 'GET',
      url: config.baseUrl + '/api/vendor/' + name,
    })
    .then(function(res) {
      console.log('GetOne Vendor Success!:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('GetOne Vendor Error:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };
  //params  = location + category
  var getTrendingVendors = function(params, callback) {
    var data = _.pick(params, [
      'location',
      'type'
    ]);
    return $http({
      method: 'GET',
      url: config.baseUrl + '/api/vendor/trending',
      data: data
    })
    .then(function(res) {
      console.log('Get Trending Vendor Success!:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('Get Trending Vendor Error:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  var addRating = function(vendor, callback) {
    var data = {
      vendor: vendor.vendor,
      rating: vendor.rating,
      review: vendor.review
    };
    return $http({
      method: 'POST',
      url: config.baseUrl + '/api/vendor/rate',
      data: data
    })
    .then(function(res) {
      console.log('Reviewed!', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('Review Error!:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  var getAllPeds = function(callback) {

    return $http({
      method: 'GET',
      url: config.baseUrl + '/api/peds'
    })
    .then(function(res) {
      var result = []
      var data = res.data.result;
      for (var i=0; i<data.length; i++) {
        result.push([data[i].latitude, data[i].longitude, data[i].pedestrianvol24hr.split(',').join('')]);
      }

      if (callback) {
        callback(null, result);
      }
    })
    .catch(function(err) {
      if(callback) {
        callback(err,null);
      }
    })
  }

  return {
    getVendors: getVendors,
    getOneVendor: getOneVendor,
    getTrendingVendors: getTrendingVendors,
    addRating: addRating,
    getAllPeds: getAllPeds
  };
});