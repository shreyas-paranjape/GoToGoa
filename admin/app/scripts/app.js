/*global angular:false */
angular.element(document).ready(function() {
  'use strict';
  angular
    .module('gotogoa', [
      'ngAnimate',
      'ngCookies',
      'restangular',
      'ui.router',
      'ncy-angular-breadcrumb',
      'permission',
      'ngSanitize',
      'ui.bootstrap',
      'ui.grid',
      'schemaForm',
      'stay',
      'travel',
      'activity',
      'trip',
      'deal',
    ])
    .config(function($breadcrumbProvider) {
      $breadcrumbProvider.setOptions({
        prefixStateName: 'vendors.list',
        template: 'bootstrap2'
      });
    })
    .config(function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/deal');

    });

  angular.bootstrap(document, ['gotogoa']);
});
