'use strict';

/**
 * @ngdoc function
 * @name presentationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presentationApp
 */
angular.module('VacationPlanner')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
