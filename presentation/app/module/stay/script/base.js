/*global angular:false */
angular.module('stay', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.stay', {
                url: '/stay',
                templateUrl: 'module/stay/view/home.html',
                ncyBreadcrumb: {
                    label: 'stay'
                },
                abstract: true
            })
            .state('app.stay.list', {
                url: '',
                templateUrl: 'module/stay/view/list.html',
                ncyBreadcrumb: {
                    label: 'stay'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayListController'
            })
            .state('app.stay.edit', {
                url: '/edit',
                templateUrl: 'module/stay/view/edit.html',
                ncyBreadcrumb: {
                    label: 'Edit'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayEditController'
            });
    });
