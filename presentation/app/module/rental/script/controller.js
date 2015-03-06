angular.module('hotel')

.controller('RentalController', ['$scope', '$stateParams', function ($scope, $stateParams, $stateProvider, $urlRouterProvider) {
    //TODO Here we use the data passed from the form to lookup the rentals
    $scope.things = $stateParams.data;
}]);