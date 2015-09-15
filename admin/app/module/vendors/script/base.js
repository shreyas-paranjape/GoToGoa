/*global angular:false */
angular.module('vendors', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('vendors', {
                url: '/vendors',
                templateUrl: 'module/vendors/view/home.html',
                ncyBreadcrumb: {
                    label: 'Vendors'
                },
                abstract: true
            })
            .state('vendors.list', {
                url: '',
                templateUrl: 'module/vendors/view/list.html',
                ncyBreadcrumb: {
                    label: 'Vendors-HomePage'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'VendorsListController'
            })
            .state('vendors.detail', {
                url: '/detail',
                templateUrl: 'module/vendors/view/detail.html',
                ncyBreadcrumb: {
                    label: 'Vendors.details'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'VendorsDetailController'
            });
    });
