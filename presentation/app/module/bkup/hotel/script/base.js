/*global angular:false */
angular.module('hotel', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('planner.hotel', {
                url: '',
                templateUrl: 'module/hotel/view/home.html',
                ncyBreadcrumb: {
                    label: 'Hotels'
                },
                abstract: true
            })
            .state('planner.hotel.list', {
                url: '',
                templateUrl: 'module/hotel/view/list.html',
                ncyBreadcrumb: {
                    label: 'Hotels-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'HotelListController'
            })
            .state('planner.hotel.detail', {
                url: '/detail',
                templateUrl: 'module/hotel/view/detail.html',
                ncyBreadcrumb: {
                    label: 'Hotels.details'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'HotelDetailController'
            });
    });