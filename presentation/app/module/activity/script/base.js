/*global angular:false */
angular.module('activity', [
    'ui.router',
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('app.activity', {
        url: '/activities',
        templateUrl: '/view/moduleHome.html',
        controller: "ActivityController",
        abstract: true
      })
      .state('app.activity.list', {
        url: '',
        templateUrl: '/module/activity/view/list.html',
        controller: 'ActivityListController'
      })
      .state('app.activity.edit', {
        url: '/edit',
        templateUrl: '/module/activity/view/edit.html',
        controller: 'ActivityEditController'
      });
  });
