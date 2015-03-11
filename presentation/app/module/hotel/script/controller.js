angular.module('hotel')

.controller('HotelsController', ['$scope', '$stateParams', function ($scope, $stateParams, $stateProvider, $urlRouterProvider) {
    //TODO Here we use the data passed from the form to lookup the hotels
    $scope.items = $stateParams.data;
    $scope.hotels = [
    {"id":1, "name":"Vivanta", "location":"A", "stars":5},
    {"id":2, "name":"Ramada", "location":"B", "stars":4},
    {"id":3, "name":"Novotel", "location":"A", "stars":3},
    {"id":4, "name":"Radisson", "location":"B", "stars":2}
];
}]);