/*global angular:false */
angular.module('deals', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('deals', {
        url: '/deals',
        templateUrl: 'module/deals/view/home.html',
        ncyBreadcrumb: {
          label: 'deals'
        },
        abstract: true
      })
      .state('deals.list', {
        url: '',
        templateUrl: 'module/deals/view/list.html',
        ncyBreadcrumb: {
          label: 'Deals'
        },
        params: {
          data: ['default', 'list', 'of', 'things']
        },
        controller: 'DealListController'
      })
      .state('deals.add', {
        url: '/add',
        templateUrl: 'module/deals/view/add.html',
        ncyBreadcrumb: {
          label: 'Deals'
        },
        params: {
          data: ['default', 'list', 'of', 'things']
        },
        controller: 'DealAddController'
      })
      .state('deals.edit', {
        url: '/edit',
        templateUrl: 'module/deals/view/edit.html',
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
  }).value('gridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: 'module/deals/view/buttons.html',
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
