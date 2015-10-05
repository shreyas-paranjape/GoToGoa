angular.module('place', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('place', {
                url: '/place',
                templateUrl: 'module/place/view/home.html',
                ncyBreadcrumb: {
                    label: 'Places'
                },
                controller: 'PlacesController'
            })
            .state('place.list', {
                url: '/place_list',
                templateUrl: 'module/place/view/list.html',
                ncyBreadcrumb: {
                    label: 'Place-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'PlacesListController'
            });

    });
