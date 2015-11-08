/*global angular:false */
angular.module('abtgoa', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.abtgoa', {
                url: '/aboutGoa',
                templateUrl: '/view/moduleHome.html',
                controller: 'AbtGoaController',
                abstract: true
            })
            .state('app.abtgoa.list', {
                url: '',
                templateUrl: 'module/abtgoa/view/list.html',
                controller: 'AbtGoaListController'
            })
            .state('app.abtgoa.edit', {
                url: '/edit',
                templateUrl: 'module/abtgoa/view/edit.html',
                controller: 'AbtGoaEditController'
            });
    });
