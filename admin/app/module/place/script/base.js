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
    });
