/*global angular:false */
angular.module('activity', [
    'ui.router',
  ])
    .config(function ($stateProvider, RestangularProvider) {
        'use strict';
        RestangularProvider.setDefaultHeaders({
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "POST, GET, OPTIONS"
        });
        RestangularProvider.setBaseUrl("http://localhost:8080/api/");
        $stateProvider
            .state('app.activity', {
                url: '/activities',
                templateUrl: '/view/moduleHome.html',
                controller: "ActivityController",
                abstract: true
            })
            .state('app.activity.list', {
                url: '',
                templateUrl: '/module/activity/view/list.html',
                controller: 'ActivityListController'
            })
            .state('app.activity.edit', {
                url: '/edit',
                templateUrl: '/module/activity/view/edit.html',
                controller: 'ActivityEditController'
            })
            .state('app.activity.detail', {
                url: '/detail',
                templateUrl: '/module/activity/view/detail.html',
                controller: 'ActivityDetailController'
            });
    });
