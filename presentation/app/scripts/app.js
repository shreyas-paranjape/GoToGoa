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
            'app',
            'ncy-angular-breadcrumb',
            'directives',
            'trip',
            'activity',
            'stay',
            'travel',
            'angularjs-dropdown-multiselect',
            // 'ng.bs.dropdown',
            // 'gridster',
             'ngMap',
            // 'ui.calendar'
        ])
        .config(function ($urlRouterProvider, $breadcrumbProvider) {
            $urlRouterProvider.otherwise('/apps');
            $breadcrumbProvider.setOptions({
                prefixStateName: 'app',
                template: 'bootstrap2'
            });
        });
    angular.bootstrap(document, ['goaAmigo']);
});
