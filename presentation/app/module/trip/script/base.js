/*global angular:false */
angular.module('trip', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider, RestangularProvider) {
        'use strict';
        RestangularProvider.setDefaultHeaders({
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "POST, GET, OPTIONS"
        });
        RestangularProvider.setBaseUrl("http://localhost:8080/api/");

        $stateProvider
            .state('app.trip', {
                url: '/trip',
                templateUrl: 'module/trip/view/home.html',
                abstract: true,
                controller: 'TripListController'
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
            })
            .state('app.trip.detail', {
                url: '/detail',
                templateUrl: 'module/trip/view/detail.html',
                controller: 'TripDetailController'
            });
    });
