/*global angular:false */
angular.module('rental', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('rental', {
                url: '/rental',
                templateUrl: 'module/rental/view/home.html',
                ncyBreadcrumb: {
                    label: 'Rentals'
                },
                abstract: true
            })
            .state('rental.list', {
                url: '',
                templateUrl: 'module/rental/view/list.html',
                ncyBreadcrumb: {
                    label: 'Rentals-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'RentalListController'
            })
            .state('rental.detail', {
                url: '/detail',
                templateUrl: 'module/rental/view/detail.html',
                ncyBreadcrumb: {
                    label: 'Rentals.details'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'RentalDetailController'
            });
    });