/*global angular:false */
angular.module('travel', [
    'ui.router'
  ])
  .config(function($stateProvider, RestangularProvider) {
    'use strict';
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin': "*"});
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Methods': "POST, GET, OPTIONS"});
    RestangularProvider.setBaseUrl("http://localhost/api/");
    $stateProvider
      .state('travel', {
        url: '/travel',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('travel.list', {
        url: '',
        templateUrl: '/view/list.html',
        params: {
          data: []
        },
        controller: 'TravelListController'
      })
      .state('travel.add', {
        url: '/add',
        templateUrl: '/view/add.html',
        params: {
          data: []
        },
        controller: 'TravelAddController'
      })
      .state('travel.edit', {
        url: '/edit',
        templateUrl: '/view/edit.html',
        params: {
          data: []
        },
        controller: 'TravelEditController'
      });
  }).value('travelSchema', {
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
      travel_type_id: {
        title: "Travel Type Id",
        type: "string",
        enum: [
          "a",
          "b",
          "c"
        ]
      },
      travel_vehicle: {
        type: "array",
        // minLength: 2,
        title: "Travel Vehicle",
        items: {
          type: "object",
          properties: {
            model_id: {
              type: "string",
              // minLength: 2,
              title: "Model Id",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            vehicle_class_id: {
              title: "Vehicle Class Id",
              type: "array",
              items: {
                type: "string"
              }
              // enum: [
              //   "a",
              //   "b",
              //   "c"
              // ]
            },
            no_of_seats: {
              title: "No of Seats",
              type: "string"
            },
            travel_vehicle_feature: {
              title: "Travel Vehicle Feature",
              type: "array",
              items: {
                type: "object",
                properties: {
                  feature_id: {
                    title: "Feature Id",
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
            }
          }
        }
      },
      stay_party: {
        title: "Stay Party",
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              title: "Name",
              type: "string"
            },
            email: {
              title: "Email",
              type: "string",
              pattern: "^\\S+@\\S+$"
            },
            phone: {
              title: "Phone",
              type: "string"
            },
            designation_id: {
              title: "Designation Id",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            stay_party_role_id: {
              title: "Stay Party Role Id",
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
  }).value('travelGridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: '/view/buttons.html',
    width: 80
  }, {
    name: 'title',
    width: 100
  }]).value('travelForm', ["title", {
    key: "description",
    type: "textarea"
  }, {
    key: "travel_type_id",
    type: "select"
  }, {
    key: "travel_vehicle",
    items: [{
      key: "travel_vehicle[].model_id",
      type: "select"
    }, {
      key: "travel_vehicle[].vehicle_class_id",
      type: "strapselect",
      "options": {
        "httpGet": {
            "url": "api/travel"
        },
        "map" : {valueProperty: "travel_vehicle.vehicle_class_id", nameProperty: "travel_vehicle.vehicle_class_id"}
      }
    }, {
      key: "travel_vehicle[].no_of_seats",
      type: "textbox"
    }, {
      key: "travel_vehicle[].travel_vehicle_feature",
      items: [{
        type: "section",
        htmlClass: "row",
        items: [{
          type: "section",
          htmlClass: "col-xs-6 margin-top",
          items: [{
            key: "travel_vehicle[].travel_vehicle_feature[].feature_id",
            type: "select"
          }]
        }, {
          type: "section",
          htmlClass: "col-xs-6",
          items: [
            "travel_vehicle[].travel_vehicle_feature[].value"
          ]
        }]
      }]
    }]
  }, {
    key: "stay_party",
    items: [{
      key: "stay_party[].name"
    }, {
      key: "stay_party[].email"
    }, {
      key: "stay_party[].phone"
    }, {
      key: "stay_party[].designation_id",
      type: "select"
    }, {
      key: "stay_party[].stay_party_role_id",
      type: "select"
    }]
  }]);
