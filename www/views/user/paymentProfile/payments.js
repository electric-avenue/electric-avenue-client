angular.module('payments', [])
.controller('PaymentsCtrl', function($scope, $ionicModal) {
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
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.cardModal.remove();
  });
});
