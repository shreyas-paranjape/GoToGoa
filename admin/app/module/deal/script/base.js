/*global angular:false */
angular.module('deal', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('deal', {
        url: '/deal',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('deal.list', {
        url: '',
        templateUrl: 'module/deal/view/list.html',
        params: {
          data: []
        },
        controller: 'DealListController'
      })
      .state('deal.add', {
        url: '/add',
        templateUrl: 'module/deal/view/add.html',
        params: {
          data: []
        },
        controller: 'DealAddController'
      })
      .state('deal.edit', {
        url: '/edit',
        templateUrl: 'module/deal/view/edit.html',
        params: {
          data: []
        },
        controller: 'DealEditController'
      });
  }).value('dealSchema', {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2,
        title: "Name"
      }
    }
  }).value('dealGridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: 'module/deal/view/buttons.html',
    width: 80
  }, {
    name: 'name',
    width: 100
  }]).value('dealForm', ["name"]);
