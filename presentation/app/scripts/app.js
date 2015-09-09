/*global angular:false */
angular.element(document).ready(function () {
    'use strict';
    /**
     * @ngdoc overview
     * @name todoApp
     * @description
     * # todoApp
     *
     * Main module of the application.
     */
    angular
        .module('gotogoa', [
            'ngAnimate',
            'ngCookies',
            'restangular',
            'ui.router',
            'ncy-angular-breadcrumb',
            'permission',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
        'angularjs-dropdown-multiselect',
        'ng.bs.dropdown',
            'gridster',
            'hotel',
            'rental',
            'trip',
            'ngMap',
            'ui.calendar'

        ])
        .config(function ($breadcrumbProvider) {
            $breadcrumbProvider.setOptions({
                prefixStateName: 'trip.list',
                template: 'bootstrap2'
            });
        })
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/trips');

        });

    angular.bootstrap(document, ['gotogoa']);
});
