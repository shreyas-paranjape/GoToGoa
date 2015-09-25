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
      'ngTouch',
      'ui.bootstrap',
      'ui.grid',
      'trip',
      'vendors',
      'place',
      'stay',
      'travel',
      'ui.calendar',
      'ui.grid.edit',
      'ui.grid.selection',
      'angularModalService',
      'schemaForm',
      'mgcrea.ngStrap',
      'schemaForm-datepicker',
      'schemaForm-timepicker',
      'schemaForm-datetimepicker',
      'vendors',
      'deals'

    ])
    .config(function($breadcrumbProvider) {
      $breadcrumbProvider.setOptions({
        prefixStateName: 'vendors.list',
        template: 'bootstrap2'
      });
    })
    .config(function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/deals');

    });

  angular.bootstrap(document, ['gotogoa']);
});
