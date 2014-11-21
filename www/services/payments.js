angular.module('stripe', [])
.factory('Payments', function($http) {
  var getToken = function(info) {
    var card = {
      number: info.number,
      cvc: info.cvc,
      exp_month: info.exp_month,
      exp_year: info.exp_year
    };
    return $q(function(resolve) {
      Stripe.card.createToken(card, function(status, res) {
        if (response.error) {
          var msg = response.error.message;
          resolve(response.error, null);
          return;
        }
        var token = response.id;
        resolve(null, token);
      });
    });
  };

  var saveCard = function(info, callback) {
    getToken(info).then(function(err, token) {
      if (err) {
        if (callback) {
          callback(err, null);
        }
        return;
      }

      $http({
        method: 'PUT',
        url: config.baseUrl + '/payments/save',
        data: {token: token}
      })
      .then(function(res) {
        console.log('Save Card Success!:', res);
        if (callback) {
          callback(null, res);
        }
      })
      .catch(function(err) {
        console.log('Save Card Failure!:', err);
        if (callback) {
          callback(err, null);
        }
      });
    });
  };

  var getCards = function(callback) {
    return $http({
      method: 'PUT',
      url: config.baseUrl + '/payments/listcards'
    })
    .then(function(res) {
      console.log('List Card Success!:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('List Card Failure!:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  var sendTip = function(vendor, amount, callback) {

  };

  return {
    saveCard: saveCard,
    sendTip: sendTip,
    getCards: getCards
  }
});


// Stripe.card.createToken({
//   number: $('.card-number').val(),
//   cvc: $('.card-cvc').val(),
//   exp_month: $('.card-expiry-month').val(),
//   exp_year: $('.card-expiry-year').val()
// }, stripeResponseHandler);