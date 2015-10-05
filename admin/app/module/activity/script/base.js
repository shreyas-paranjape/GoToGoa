angular.module('activity', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('activity', {
                url: '/activity',
                templateUrl: 'module/activity/view/home.html',
                ncyBreadcrumb: {
                    label: 'Activity'
                },
                controller: 'ActivityController'
            })
            .state('activity.list', {
                url: '/activity_list',
                templateUrl: 'module/activity/view/list.html',
                ncyBreadcrumb: {
                    label: 'Activity-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'ActivityListController'
            });

    });
