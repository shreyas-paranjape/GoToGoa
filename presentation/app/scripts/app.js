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
            'gridster',
            'hotel',
            'rental',
            'itenarary',
            'uiGmapgoogle-maps',
            'ui.calendar'
        ])
        .config(function ($urlRouterProvider,uiGmapGoogleMapApiProvider) {
            $urlRouterProvider.otherwise('/trip');
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyAjLbaCSVxU0PYubJL_ZL2ey4mIxMu0GaM',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });
        });
    
    angular.bootstrap(document, ['gotogoa']);
});