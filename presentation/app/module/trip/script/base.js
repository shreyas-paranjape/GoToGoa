/*global angular:false */
angular.module('trip', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.trip', {
                url: '/trip',
                templateUrl: 'module/trip/view/home.html',
                abstract: true
            })
            .state('app.trip.list', {
                url: '',
                templateUrl: 'module/trip/view/list.html',
                controller: 'TripListController'
            })
            .state('app.trip.edit', {
                url: '/edit',
                templateUrl: 'module/trip/view/edit.html',
                controller: 'TripEditController'
            });
    });
