angular.module('hotel')

.controller('HotelsController', ['$scope', '$stateParams', function ($scope, $stateParams, $stateProvider, $urlRouterProvider) {
    //TODO Here we use the data passed from the form to lookup the hotels
    $scope.items = $stateParams.data;
}]);