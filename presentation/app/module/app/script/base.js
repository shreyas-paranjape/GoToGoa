/*global angular:false */
angular.module('app', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app', {
                url: '/apps',
                templateUrl: 'module/app/view/home.html',
                ncyBreadcrumb: {
                    label: 'app'
                },
                controller: 'AppListController',
                abstract: true
            })
            .state('app.trash', {
                url: '',
                templateUrl: 'module/app/view/list.html',
                ncyBreadcrumb: {
                    label: 'Home'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'AppListController'
            })

    });
