/*global angular:false */
angular.module('trip', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('trip', {
                url: '/trips',
                templateUrl: 'module/trip/view/home.html',
                ncyBreadcrumb: {
                    label: 'trips'
                },
                abstract: true
            })
            .state('trip.activity', {
                url: '/activity',
                templateUrl: 'module/trip/view/acti.html',
                ncyBreadcrumb: {
                    label: 'Activity'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripActiController'
            })
            .state('trip.day', {
                url: '/day',
                templateUrl: 'module/trip/view/day.html',
                ncyBreadcrumb: {
                    label: 'Day'
                },
                abstract: true,
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripDayController'
            })
            .state('trip.day.grid', {
                url: '/day_grid',
                templateUrl: 'module/trip/view/day_grid.html',
                ncyBreadcrumb: {
                    label: 'Day_grid'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripDayController'
            })
            .state('trip.day.form', {
                url: '/day_form',
                templateUrl: 'module/trip/view/day_form.html',
                ncyBreadcrumb: {
                    label: 'Day_form'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripDayController'
            })
            .state('trip.edit', {
                url: '/edit',
                templateUrl: 'module/trip/view/edit.html',
                ncyBreadcrumb: {
                    label: 'Edit'
                },
                abstract: true,
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripEditController'
            })
            .state('trip.edit.calendar', {
                url: '',
                templateUrl: 'module/trip/view/calendar.html',
                ncyBreadcrumb: {
                    label: 'EditCalendar'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'TripEditController'
            })
            .state('trip.edit.map', {
                url: '/map',
                templateUrl: 'module/trip/view/map.html',
                ncyBreadcrumb: {
                    label: 'Map'
                },
                params: {
                    data: {}
                },
                controller: 'TripEditController'
            })
            .state('trip.customize', {
                url: '/customize',
                templateUrl: 'module/trip/view/customize.html',
                ncyBreadcrumb: {
                    label: 'Customize'
                },
                params: {
                    data: {}
                },
                controller: 'TripCustomController'
            });
    });
