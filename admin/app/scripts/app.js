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
<<<<<<< HEAD
            'trip',
            'vendors',
            'place',
            'ngMap',
=======
>>>>>>> bcc28919b5362eda06861d73ef7d2d04f5db8abc
            'ui.calendar',
            'ui.grid.edit',
            'ui.grid.selection',
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
