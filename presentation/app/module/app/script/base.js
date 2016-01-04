/*global angular:false */
angular.module('app', [
    'ui.router',
  ])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('app', {
                url: '/apps',
                templateUrl: 'module/app/view/home.html',
                controller: 'AppListController',
                abstract: true
            })
            .state('app.login', {
                url: '/log-in',
                templateUrl: '/module/app/view/login.html',
                controller: 'AppLoginController'
            })
            .state('app.signup', {
                url: '/signup',
                templateUrl: '/module/app/view/signup.html',
                controller: 'AppSignupController'
            })
    });