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
            'ui.grid',
            'trip',
            'vendors',
            'place',
            'ngMap',
            'ui.calendar',
            'ui.grid.edit',
            'ui.grid.selection',
            'angularModalService',
            'schemaForm'

        ])
        .config(function ($breadcrumbProvider) {
            $breadcrumbProvider.setOptions({
                prefixStateName: 'vendors.list',
                template: 'bootstrap2'
            });
        })
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/vendors');

        });

    angular.bootstrap(document, ['gotogoa']);
});
