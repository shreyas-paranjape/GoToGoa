/*global angular:false */
angular.module('travel', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('travel', {
                url: '/travel',
                templateUrl: 'module/travel/view/home.html',
                ncyBreadcrumb: {
                    label: 'Travel'
                },
                abstract: true
            })
            .state('travel.list', {
                url: '',
                templateUrl: 'module/travel/view/list.html',
                ncyBreadcrumb: {
                    label: 'Travel-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TravelListController'
            });
    });
