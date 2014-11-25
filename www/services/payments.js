   angular.module('stripe', [])
.factory('Payments', function($http) {
  var getToken = function(info, callback) {
    var card = {
      number: info.number,
      cvc: info.cvc,
      exp_month: info.exp_month,
      exp_year: info.exp_year
    };
    Stripe.card.createToken(card, function(status, res) {
      if (res.error) {
        var msg = res.error.message;
        callback(res.error, null);
        return;
      }
      var token = res.id;
      callback(null, token);
    });
  };

  var saveCard = function(info, callback) {
    getToken(info, function(err, token) {
      if (err) {
        if (callback) {
          callback(err, null);
        }
        return;
      }

      $http({
        method: 'POST',
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

  var setDefaultCard = function(id, callback) {
    console.log('yay');
    return $http({
      method: 'POST',
      url: config.baseUrl + '/payments/setdefault',
      data: {newDefaultCard: id}
    })
    .then(function(res) {
      console.log('New Default Card Success!:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('New Default Card Failure!:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  var getCards = function(callback) {
    return $http({
      method: 'POST',
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
    var data = {
      amount: amount.amount,
      currency: amount.currency,
      vendor: vendor
    };
    return $http({
      method: 'POST',
      url: config.baseUrl + '/payments/tip',
      data: data
    })
    .then(function(res) {
      console.log('Payment Successful!:', res);
      if (callback) {
        callback(null, res);
      }
    })
    .catch(function(err) {
      console.log('Payment Failure:', err);
      if (callback) {
        callback(err, null);
      }
    });
  };

  return {
    saveCard: saveCard,
    sendTip: sendTip,
    getCards: getCards,
    setDefaultCard: setDefaultCard,
    sendTip: sendTip
  };
});