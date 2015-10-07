/*global angular:false */
angular.module('travel', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.travel', {
                url: '/travels',
                templateUrl: 'module/travel/view/home.html',
                ncyBreadcrumb: {
                    label: 'trips'
                },
                abstract: true
            })
            .state('app.travel.list', {
                url: '',
                templateUrl: 'module/travel/view/list.html',
                ncyBreadcrumb: {
                    label: 'Home'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TravelListController'
            })
            .state('app.travel.edit', {
                url: '/edit',
                templateUrl: 'module/travel/view/edit.html',
                ncyBreadcrumb: {
                    label: 'Edit'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TravelEditController'
            });
    });
