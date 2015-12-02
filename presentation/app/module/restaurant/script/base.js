/*global angular:false */
angular.module('restaurant', [
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
            .state('app.restaurant', {
                url: '/restaurant',
                templateUrl: '/view/moduleHome.html',
                controller: "RestaurantController",
                abstract: true
            })
            .state('app.restaurant.list', {
                url: '',
                templateUrl: '/module/restaurant/view/list.html',
                controller: 'RestaurantListController'
            })
            .state('app.restaurant.edit', {
                url: '/edit',
                templateUrl: '/module/restaurant/view/edit.html',
                controller: 'RestaurantEditController'
            })
            .state('app.restaurant.detail', {
                url: '/detail',
                templateUrl: '/module/restaurant/view/detail.html',
                controller: 'RestaurantDetailController'
            });
    });
