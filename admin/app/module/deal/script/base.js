/*global angular:false */
angular.module('deal', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('deal', {
        url: '/deal',
        templateUrl: 'module/deal/view/home.html',
        ncyBreadcrumb: {
          label: 'deals'
        },
        abstract: true
      })
      .state('deal.list', {
        url: '',
        templateUrl: 'module/deal/view/list.html',
        ncyBreadcrumb: {
          label: 'Deal'
        },
        params: {
          data: ['default', 'list', 'of', 'things']
        },
        controller: 'DealListController'
      })
      .state('deal.add', {
        url: '/add',
        templateUrl: 'module/deal/view/add.html',
        ncyBreadcrumb: {
          label: 'Deal'
        },
        params: {
          data: ['default', 'list', 'of', 'things']
        },
        controller: 'DealAddController'
      })
      .state('deal.edit', {
        url: '/edit',
        templateUrl: 'module/deal/view/edit.html',
        ncyBreadcrumb: {
          label: 'Deals'
        },
        params: {
          data: ['default', 'list', 'of', 'things']
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
  }/*, {
    name: 'description',
    width: 300
  }, {
    name: 'eligibility',
    width: 300
  }, {
    name: 'product',
    width: 300
  }, {
    name: 'notification',
    width: 300
  }*/]).value('dealForm', ["name"]);
