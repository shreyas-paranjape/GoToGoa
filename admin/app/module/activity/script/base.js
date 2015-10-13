/*global angular:false */
angular.module('activity', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('activity', {
        url: '/activity',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('activity.list', {
        url: '',
        templateUrl: '/view/list.html',
        params: {
          data: []
        },
        controller: 'ActivityListController'
      })
      .state('activity.add', {
        url: '/add',
        templateUrl: '/view/add.html',
        params: {
          data: []
        },
        controller: 'ActivityAddController'
      })
      .state('activity.edit', {
        url: '/edit',
        templateUrl: '/view/edit.html',
        params: {
          data: []
        },
        controller: 'ActivityEditController'
      });
  }).value('activitySchema', {
    type: "object",
    properties: {
      title: {
        type: "string",
        // minLength: 2,
        title: "Title"
      },
      description: {
        title: "Description",
        type: "string"
      },
      activity_type: {
        title: "Activity Type",
        type: "string",
        enum: [
          "a",
          "b",
          "c"
        ]
      },
      recurrence_frequency: {
        title: "Recurrence Frequency",
        type: "string",
        enum: [
          "a",
          "b",
          "c"
        ]
      },
      start_at: {
        title: "Start At",
        type: "array",
        items: {
          type: "object",
          properties: {
            time_division: {
              type: "string",
              title: "Time Division",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            value: {
              title: "Value",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            }
          }
        }
      }
    }

  }).value('activityGridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: '/view/buttons.html',
    width: 80
  }, {
    name: 'name',
    width: 100
  }, {
    name: 'gender',
    width: 100
  }]).value('activityForm', [
    "title", {
        key: "description",
        type: "textarea"
      }, {
        key: "activity_type",
        type: "select"
      },
      ,
      {
          "type": "help",
          "helpvalue": "<div ><h4><u>Schedule</u> :</h4></div>"
        },
      {
        key: "recurrence_frequency",
        type: "select"
      },
      {
        key: "start_at",
        add: "New",
        style: {
          add: "btn-success"
        },
        items:[{
        type: "section",
        htmlClass: "row",
        items: [{
          type: "section",
          htmlClass: "col-xs-6 margin-top",
          items: [{
            key: "start_at[].time_division",
            type: "select",
          }]
        }, {
          type: "section",
          htmlClass: "col-xs-6",
          items: [
            "start_at[].value"
          ]
        }]
      }]
    }

  ]
);
