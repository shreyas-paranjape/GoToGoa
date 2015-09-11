/*global angular:false */
angular.module('itinerary', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('planner', {
                url: '/trip',
                templateUrl: 'module/itinerary/view/planner.html',
                ncyBreadcrumb: {
                    label: 'Trip-Planner'
                },
                controller: 'itineraryPlannerController',
                abstract: true
            })
            .state('details', {
                url: '/itinerary',
                templateUrl: 'module/itinerary/view/detail.html',
                ncyBreadcrumb: {
                    label: 'Hotels-list'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'itineraryDetailController'
            })
            .state('grid', {
                url: '/gridster',
                templateUrl: 'module/itinerary/view/grid.html',
                ncyBreadcrumb: {
                    label: 'random'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'itineraryDetailController'
            })
            .state('calendar', {
                url: '/calendar',
                templateUrl: 'module/itinerary/view/calendar.html',
                ncyBreadcrumb: {
                    label: 'calendar'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'itineraryDetailController'

            })
            .state('map', {
                url: '/map',
                templateUrl: 'module/itinerary/view/map.html',
                ncyBreadcrumb: {
                    label: 'map'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'itineraryDetailController'

            });
    });
