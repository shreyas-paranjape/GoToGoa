/*global angular:false */
angular.module('rentalCar', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.rentalCar', {
                url: '/rentalCar',
                templateUrl: '/view/moduleHome.html',
                controller: 'RentalCarController',
                abstract: true
            })
            .state('app.rentalCar.list', {
                url: '',
                templateUrl: 'module/rentalCar/view/list.html',
                controller: 'RentalCarListController'
            })
            .state('app.rentalCar.edit', {
                url: '/edit',
                templateUrl: 'module/rentalCar/view/edit.html',
                controller: 'RentalCarEditController'
            })
            .state('app.rentalCar.detail', {
                url: '/detail',
                templateUrl: 'module/rentalCar/view/detail.html',
                controller: 'RentalCarDetailController'
            });
    });
