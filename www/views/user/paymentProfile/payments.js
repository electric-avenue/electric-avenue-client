angular.module('payments', ['stripe'])
.controller('PaymentsCtrl', function($scope, $ionicModal, Payments) {
  $scope.data = {
    cards: [],
    cardNumber: null,
    cardType: null,
    cardExpiry: null,
    cardCVC: null
  }
  $ionicModal.fromTemplateUrl('views/user/paymentProfile/addCard.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.cardModal = modal;
  });
  $scope.showAddCard = function() {
    $scope.cardModal.show();
  };
  $scope.hideAddCard = function() {
    $scope.cardModal.hide();
  };

  $scope.addCard = function() {
    console.log($scope.data);
    var expiration = $scope.data.cardExpiry.split('/');
    var card = {
      number: $scope.data.cardNumber,
      cvc: $scope.data.cardCVC,
      exp_month: expiration[0],
      exp_year: expiration[1]
    };
    Payments.saveCard(card, function(err, res) {
      $scope.data.cards.push(res.data.data);
      $scope.cardModal.hide();
      $scope.data.cardNumber = null;
      $scope.data.cardType = null;
      $scope.data.cardExpiry = null
      $scope.data.cardCVC = null;
    });
  };

  $scope.getCards = function() {
    Payments.getCards(function(err, res) {
      $scope.data.cards = res.data.data;
    });
  };

  $scope.setDefault = function(cardId) {
    console.log('checkers');
    Payments.setDefaultCard(cardId, function(err, res) {
      if (err) { return; }
      $scope.data.cards = $scope.data.cards.map(function(val) {
        val.defaultcard = val.id === cardId;
        return val;
      });
    });
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.cardModal.remove();
  });
  // Bank Addition
  $ionicModal.fromTemplateUrl('views/user/paymentProfile/addBank.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.bankModal = modal;
  });
  $scope.showAddBank = function() {
    $scope.bankModal.show();
  };
  $scope.hideAddBank = function() {
    $scope.bankModal.hide();
  };
});
