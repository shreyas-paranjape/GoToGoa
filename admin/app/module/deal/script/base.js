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
        templateUrl: '/view/list.html',
        params: {
          data: []
        },
        controller: 'DealListController'
      })
      .state('deal.add', {
        url: '/add',
        templateUrl: '/view/add.html',
        params: {
          data: []
        },
        controller: 'DealAddController'
      })
      .state('deal.edit', {
        url: '/edit',
        templateUrl: '/view/edit.html',
        params: {
          data: []
        },
        controller: 'DealEditController'
      });
  }).value('dealSchema', {
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
      type: {
        title: "Type",
        type: "string",
        enum: [
          "a",
          "b",
          "c"
        ]
      },
      value: {
        title: "Value",
        type: "string",
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
      },
      eligibility: {
        title: "Eligibility",
        type: "array",
        items: {
          type: "object",
          properties: {
            criteria_component_id: {
              type: "string",
              title: "Criteria Component Id",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            relationship: {
              title: "Relationship",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            comparator: {
              title: "Comparator",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            value: {
              title: "Value",
              type: "string"
            }
          }
        }
      },
      event: {
        title: "Event",
        type: "array",
        items: {
          type: "object",
          properties: {
            criteria_component_id: {
              type: "string",
              title: "Criteria Component Id",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            relationship: {
              title: "Relationship",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            comparator: {
              title: "Comparator",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            value: {
              title: "Value",
              type: "string"
            }
          }
        }
      },
      notification: {
        title: "Notification",
        type: "array",
        items: {
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
        }
      }
    }
  }).value('dealGridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: '/view/buttons.html',
    width: 80
  }, {
    name: 'name',
    width: 100
  }]).value('dealForm', ["title", {
    key: "description",
    type: "textarea"
  }, {
    key: "type",
    type: "select"
  }, {
    key: "value",
    type: "textbox"
  },
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
},
{
  key: "eligibility",
  items: [{
    key: "eligibility[].criteria_component_id",
    type: "select"
  },{
    key: "eligibility[].relationship",
    type: "select"
  },{
    key: "eligibility[].comparator",
    type: "select"
  },{
    key: "eligibility[].value",
    type: "textbox"
  }]
},
{
  key: "event",
  items: [{
    key: "event[].criteria_component_id",
    type: "select"
  },{
    key: "event[].relationship",
    type: "select"
  },{
    key: "event[].comparator",
    type: "select"
  },{
    key: "event[].value",
    type: "textbox"
  }]
},
{
  key: "notification",
  items: [{
    key: "title",
    type: "textbox"
  },{
    key: "description",
    type: "textarea"
  },  {
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
  }]
}
 ]);
