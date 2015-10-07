/*global angular:false */
angular.module('app', [
    'ui.router',
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('app', {
        url: '/apps',
        templateUrl: 'module/app/view/home.html',
        controller: 'AppListController',
        abstract: true
      })
  });
