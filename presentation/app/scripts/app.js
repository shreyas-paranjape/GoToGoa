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

            'hotel',
            'rental',
            'itenarary'
        ])
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/trip');
        });
    
    angular.bootstrap(document, ['gotogoa']);
});