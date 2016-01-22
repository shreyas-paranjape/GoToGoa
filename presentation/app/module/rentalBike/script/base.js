/*global angular:false */
angular.module('rentalBike', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.rentalBike', {
                url: '/rentalBike',
                templateUrl: '/view/moduleHome.html',
                controller: 'RentalBikeController',
                abstract: true
            })
            .state('app.rentalBike.list', {
                url: '',
                templateUrl: 'module/rentalBike/view/list.html',
                controller: 'RentalBikeListController'
            })
            .state('app.rentalBike.edit', {
                url: '/edit',
                templateUrl: 'module/rentalBike/view/edit.html',
                controller: 'RentalBikeEditController'
            })
            .state('app.rentalBike.detail', {
                url: '/detail',
                templateUrl: 'module/rentalBike/view/detail.html',
                controller: 'RentalBikeDetailController'
            });
    });
