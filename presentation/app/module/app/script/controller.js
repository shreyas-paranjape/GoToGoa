angular.module('app')
  .controller('AppListController', ['$scope', '$filter', '$stateParams', '$timeout',
    function($scope, $filter, $stateParams, $timeout) {
      'use strict';
      $scope.act_items = [
        'Dine & Wine',
        'Sports',
        'Visit a Destination'
      ];
      $scope.stay_items = [
        'Hotel',
        'HomeStay',
        'Other'
      ];
      $scope.travel_items = [
        'Book a Taxi',
        'Rent a Car',
        'Rent a Bike'
      ];
      $scope.status = {
        isopen: false
      };
      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
      };
    }
  ]);
