angular.module('directives').controller('TripCardController', ['$scope', 'Restangular', '$attrs', '$state',
  function ($scope, Restangular, $attrs, $state) {
        this.init = function (element) {};
        $scope.states = ['event', 'category'];
        $scope.currentState = $scope.states[0];
        $scope.trips = [];

        // Define resource 
        //defines the url name
        var tripRes = Restangular.all('trips');

        // CALL GET
        tripRes.getList().then(function (tripList) {
            angular.forEach(tripList, function (value, key) {
                $scope.trips.push(value);
            });
        });
        $scope.change = function () {
            $state.go('app.trip.edit');
            /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
        }
  }
]);
angular.module('directives').directive('tripcard',
    function () {
        return {
            restrict: 'EA',
            templateUrl: '/directive/trip-card/layout/trip-card.html',
            controller: 'TripCardController',
            scope: {},
            link: function (scope, element, attrs, tripcardController) {
                tripcardController.init(element);
            }
        }
    });
