/*global angular:false */
angular.module('stay', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('stay', {
                url: '/stay',
                templateUrl: 'module/stay/view/home.html',
                ncyBreadcrumb: {
                    label: 'Stay'
                },
                controller: 'StayController',
                abstract: true
            })
            .state('stay.list', {
                url: '/stay_list',
                templateUrl: 'module/stay/view/list.html',
                ncyBreadcrumb: {
                    label: 'Stay-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayController'
            })
            .state('stay.try', {
                url: '/stay_try',
                templateUrl: 'module/stay/view/planner.html',
                ncyBreadcrumb: {
                    label: 'Stay-try'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayTryController'
            });
    });
