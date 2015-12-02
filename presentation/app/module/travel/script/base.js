/*global angular:false */
angular.module('travel', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.travel', {
                url: '/travels',
                templateUrl: '/view/moduleHome.html',
                controller: 'TravelController',
                abstract: true
            })
            .state('app.travel.list', {
                url: '',
                templateUrl: 'module/travel/view/list.html',
                controller: 'TravelListController'
            })
            .state('app.travel.edit', {
                url: '/edit',
                templateUrl: 'module/travel/view/edit.html',
                controller: 'TravelEditController'
            })
            .state('app.travel.detail', {
                url: '/detail',
                templateUrl: 'module/travel/view/detail.html',
                controller: 'TravelDetailController'
            });
    });
