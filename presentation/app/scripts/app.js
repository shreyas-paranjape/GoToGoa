/*global angular:false */
angular.element(document).ready(function () {
    'use strict';
    angular
        .module('goaAmigo', [
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
            'trip',
            'ngMap',
            'ui.calendar'
        ])
        .config(function ($breadcrumbProvider,$urlRouterProvider) {
            $breadcrumbProvider.setOptions({
                prefixStateName: 'trip.list',
                template: 'bootstrap2'
            });
            $urlRouterProvider.otherwise('/trips');
        });

    angular.bootstrap(document, ['goaAmigo']);
});
