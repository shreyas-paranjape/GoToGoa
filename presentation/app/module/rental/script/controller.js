/*global angular:false */
angular.module('rental')
    .controller('RentalDetailController', ['$scope', function ($scope) {
        'use strict';
    }])
    .controller('RentalListController', ['$scope', '$stateParams', function ($scope, $stateParams, $stateProvider, $urlRouterProvider) {
        'use strict';
        $scope.things = $stateParams.data;
    }]);