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
    'rental'
  ])

.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/hotel');
});

angular.element(document).ready(function() {
      angular.bootstrap(document, ['gotogoa']);
});