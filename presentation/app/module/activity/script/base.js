/*global angular:false */
angular.module('activity', [
    'ui.router',
    'duScroll'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.activity', {
                url: '/activities',
                templateUrl: 'module/activity/view/home.html',
                ncyBreadcrumb: {
                    label: 'activities'
                },
                abstract: true
            })
            .state('app.activity.list', {
                url: '',
                templateUrl: 'module/activity/view/list.html',
                ncyBreadcrumb: {
                    label: 'Home'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'ActivityListController'
            })
            .state('app.activity.edit', {
                url: '/edit',
                templateUrl: 'module/activity/view/edit.html',
                ncyBreadcrumb: {
                    label: 'Edit'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'ActivityEditController'
            });
    });
