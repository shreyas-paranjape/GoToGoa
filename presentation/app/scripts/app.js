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
            'ui.bootstrap',
            'directives',
            'trip',
            // 'angularjs-dropdown-multiselect',
            // 'ng.bs.dropdown',
            // 'gridster',
            // 'ngMap',
            // 'ui.calendar'
        ])
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/trips');
        });

    angular.bootstrap(document, ['goaAmigo']);
});
