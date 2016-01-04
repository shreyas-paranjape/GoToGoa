/*global angular:false */
angular.module('rentals', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.rentals', {
                url: '/rentals',
                templateUrl: '/view/moduleHome.html',
                controller: 'RentalsController',
                abstract: true
            })
            .state('app.rentals.list', {
                url: '',
                templateUrl: 'module/rentals/view/list.html',
                controller: 'RentalsListController'
            })
            .state('app.rentals.edit', {
                url: '/edit',
                templateUrl: 'module/rentals/view/edit.html',
                controller: 'RentalsEditController'
            })
            .state('app.rentals.detail', {
                url: '/detail',
                templateUrl: 'module/rentals/view/detail.html',
                controller: 'RentalsDetailController'
            });
    });
