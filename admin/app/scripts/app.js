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
            'ui.grid',
            'ui.calendar',
            'ui.grid.edit',
            'angularModalService',
            'schemaForm',
            'vendors',
            'place'

        ])
        .config(function ($breadcrumbProvider) {
            $breadcrumbProvider.setOptions({
                prefixStateName: 'vendors.list',
                template: 'bootstrap2'
            });
        })
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/place');

        });

    angular.bootstrap(document, ['gotogoa']);
});
