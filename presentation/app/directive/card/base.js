angular.module('directives').controller('CardController', ['$scope', '$attrs',
  function($scope, $attrs) {
    this.init = function(element) {};
    $scope.states = ['event', 'category'];
    $scope.currentState = $scope.items[0];
    $scope.change = function() {
      if ($scope.selection == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }
    }
  }
]);
angular.module('directives').directive('card',
  function() {
    return {
      restrict: 'EA',
      templateUrl: 'directive/card/layout/card.html',
      controller: 'CardController',
      scope: {},
      link: function(scope, element, attrs, cardController) {
        cardController.init(element);
      }
    }
  });
