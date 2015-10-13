/*global angular:false */
angular.module('stay', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('app.stay', {
        url: '/stay',
        templateUrl: '/view/moduleHome.html',
        controller: 'StayController',
        abstract: true
      })
      .state('app.stay.list', {
        url: '',
        templateUrl: 'module/stay/view/list.html',
        controller: 'StayListController'
      })
      .state('app.stay.edit', {
        url: '/edit',
        templateUrl: 'module/stay/view/edit.html',
        controller: 'StayEditController'
      });
  });
