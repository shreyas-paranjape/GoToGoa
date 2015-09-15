/*global angular:false */
angular.module('deals', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('deals', {
                url: '/deals',
                templateUrl: 'module/deals/view/home.html',
                ncyBreadcrumb: {
                    label: 'deals'
                },
                abstract: true
            })
            .state('deals.list', {
                url: '/deals.list',
                templateUrl: 'module/deals/view/list.html',
                ncyBreadcrumb: {
                    label: 'Deals'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TryController'
            });
    });
