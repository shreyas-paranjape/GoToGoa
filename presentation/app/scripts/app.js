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
            'angularjs-dropdown-multiselect',
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
