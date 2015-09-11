/*global angular:false */
angular.module('trip', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('trip', {
                url: '/trips',
                templateUrl: 'module/trip/view/home.html',
                ncyBreadcrumb: {
                    label: 'trips'
                },
                abstract: true
            })
            .state('trip.list', {
                url: '',
                templateUrl: 'module/trip/view/list.html',
                ncyBreadcrumb: {
                    label: 'Home'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripListController'
            })
            .state('trip.edit', {
                url: '/edit',
                templateUrl: 'module/trip/view/edit.html',
                ncyBreadcrumb: {
                    label: 'Edit'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripEditController'
            });
    });
