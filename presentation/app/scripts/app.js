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
<<<<<<< HEAD
            'app',
            'ncy-angular-breadcrumb',
=======
            'directives',
>>>>>>> 1f6f7c58a49bff17bb6e16ad40be9f8a17253e7a
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
