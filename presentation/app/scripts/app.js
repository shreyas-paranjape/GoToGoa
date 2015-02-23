'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
var app = angular
    .module('VacationPlanner', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'permission',
    'ngSanitize',
    'ngTouch'
  ]);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/state1');
    //
    // Now set up the states
    $stateProvider
        .state('state1', {
            url: '/state1',
            templateUrl: 'views/state1.html'
        })
        .state('state1.list', {
            url: '/list',
            templateUrl: 'views/state1.list.html',
            controller: function ($scope) {
                $scope.items = ['A', 'List', 'Of', 'Items'];
            }
        })
        .state('state2', {
            url: '/state2',
            templateUrl: 'views/state2.html',
	    data: {
        	   permissions: {
          		except: ['anonymous']
        	   }
      		}
        })
        .state('state2.list', {
            url: '/list',
            templateUrl: 'views/state2.list.html',
            controller: function ($scope) {
                $scope.things = ['A', 'Set', 'Of', 'Things'];
            }
        });
});

app.run(function (Permission) {
      // Define anonymous role
      Permission.defineRole('anonymous', function (stateParams) {
        // If the returned value is *truthy* then the user has the role, otherwise they don't
        return false;
      });
});