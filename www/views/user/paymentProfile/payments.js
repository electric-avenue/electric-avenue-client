angular.module('payments', ['stripe'])
.controller('PaymentsCtrl', function($scope, $ionicModal, Payments) {
  $scope.data = {
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
      console.log('hey', err, res);
    });
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.cardModal.remove();
  });
});
