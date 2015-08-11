/*global angular:false */
angular.module('itenarary', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('planner', {
                url: '/trip',
                templateUrl: 'module/itenarary/view/planner.html',
                ncyBreadcrumb: {
                    label: 'Trip-Planner'
                },
                controller: 'ItenararyPlannerController',
                abstract: true
            })
            .state('details', {
                url: '/itenarary',
                templateUrl: 'module/itenarary/view/detail.html',
                ncyBreadcrumb: {
                    label: 'Hotels-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'ItenararyDetailController'
            })
            .state('grid', {
                url: '/gridster',
                templateUrl: 'module/itenarary/view/grid.html',
                ncyBreadcrumb: {
                    label: 'random'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'ItenararyDetailController'
            });
    });