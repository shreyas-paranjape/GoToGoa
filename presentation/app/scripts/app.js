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
//            'ngMap',
//            'ui-rangeSlider',
            'ui.bootstrap',
            'angularjs-dropdown-multiselect',
            'nemLogging',
            'leaflet-directive',
            'directives',
            'app',
            'trip',
            'activity',
            'stay',
            'travel'
        ])
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/apps/trip');
        });
    angular.bootstrap(document, ['goaAmigo']);
});
