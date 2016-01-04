/*global angular:false */
angular.module('taxi', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app.taxi', {
                url: '/taxi',
                templateUrl: '/view/moduleHome.html',
                controller: 'TaxiController',
                abstract: true
            })
            .state('app.taxi.list', {
                url: '',
                templateUrl: 'module/taxi/view/list.html',
                controller: 'TaxiListController'
            })
            .state('app.taxi.edit', {
                url: '/edit',
                templateUrl: 'module/taxi/view/edit.html',
                controller: 'TaxiEditController'
            })
            .state('app.taxi.detail', {
                url: '/detail',
                templateUrl: 'module/taxi/view/detail.html',
                controller: 'TaxiDetailController'
            });
    });
