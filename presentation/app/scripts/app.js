/*global angular:false */
angular.element(document).ready(function () {
    'use strict';
    angular
        .module('goaAmigo', [
            'ngAnimate',
            'ngCookies',
            'restangular',
            'ui.router',
            'permission',
            'ngSanitize',
            'ngTouch',
            'Firestitch.angular-counter',
//            'ngMap',
            'ui.bootstrap',
            'angularjs-dropdown-multiselect',
            'ui.bootstrap.datetimepicker',
            'nemLogging',
            'leaflet-directive',
            'directives',
            'app',
            'trip',
            'activity',
            'restaurant',
            'stay',
            'taxi',
            'rentals',
            'abtgoa',
            'rzModule'
        ])
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/apps/trip');
        });
    angular.bootstrap(document, ['goaAmigo']);
});
