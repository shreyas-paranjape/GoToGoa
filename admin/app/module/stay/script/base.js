/*global angular:false */
angular.module('stay', [
    'ui.router'
  ])
  .config(function($stateProvider, RestangularProvider) {
    'use strict';
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin': "*"});
    RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Methods': "POST, GET, OPTIONS"});
    RestangularProvider.setBaseUrl("http://localhost/api/");
    $stateProvider
      .state('stay', {
        url: '/stay',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('stay.list', {
        url: '',
        templateUrl: '/view/list.html',
        params: {
          data: []
        },
        controller: 'StayListController'
      })
      .state('stay.add', {
        url: '/add',
        templateUrl: '/view/add.html',
        params: {
          data: []
        },
        controller: 'StayAddController'
      })
      .state('stay.edit', {
        url: '/edit',
        templateUrl: '/view/edit.html',
        params: {
          data: []
        },
        controller: 'StayEditController'
      });
  }).value('staySchema', {
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
      stay_type: {
        title: "Stay Type",
        type: "string",
        enum: [
          "a",
          "b",
          "c"
        ]
      },
      email: {
        title: "Email",
        type: "string",
        pattern: "^\\S+@\\S+$"
      },
      mobile: {
        title: "Mobile Number",
        type: "string"
      },
      address: {
        title: "Address",
        type: "string"
      },
      no_of_section: {
        title: "No. of Section",
        type: "number"
      },
      no_of_rooms: {
        title: "No. of Rooms",
        type: "number"
      },
      check_in_time: {
        title: "Check-In Time",
        type: "string",
        format: "timepicker"
      },
      check_out_time: {
        title: "Check-Out Time",
        type: "string",
        format: "timepicker"

      },
      min_stay_period: {
        title: "Min. Stay Period",
        type: "string"
      },
      payment_method: {
        title: "Payment Method",
        type: "array",
        items: {
          title: "Payment Method Id",
          type: "string"
        }
      },
      stay_feature: {
        title: "Stay Feature",
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
      },
      stay_room: {
        title: "Stay Room",
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              title: "Title",
              type: "string"
            },
            description: {
              title: "Description",
              type: "string"
            },
            stay_room_type: {
              title: "Stay Room type",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            section_no: {
              title: "Section No",
              type: "string"
            },
            no_of_beds: {
              title: "No of Beds",
              type: "number"
            },
            occupancy: {
              title: "Occupancy",
              type: "string",
              enum: [
                "a",
                "b",
                "c"
              ]
            },
            extra_bed_cost: {
              title: "Extra Bed Cost",
              type: "string"
            },
            breakfast_charges: {
              title: "Breakfast Charges",
              type: "string"
            },
            lunch_charges: {
              title: "Lunch Charges",
              type: "string"
            },
            dinner_charges: {
              title: "Dinner Charges",
              type: "string"
            },
            stay_room_feature: { //array in array
              title: "Stay Room Feature",
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
            },
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
  }).value('stayGridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: '/view/buttons.html',
    width: 80
  }, {
    name: 'title',
    width: 100
  }]).value('stayForm', ["title", {
      key: "description",
      type: "textarea"
    }, {
      key: "stay_type",
      type: "select"
    }, "email",
    "mobile", {
      key: "address",
      type: "textarea"
    }, "no_of_section",
    "no_of_rooms", {
      key: "check_in_time",
      "dateOptions": {
        "minuteStep": 15,
        "autoclose": 1
      }
    }, {
      key: "check_out_time",
      "dateOptions": {
        "minuteStep": 15,
        "autoclose": 1
      }
    }, "min_stay_period", {
      key: "payment_method",
      add: "New",
      style: {
        add: "btn-success"
      },
    }, {
      key: "stay_feature",
      add: "New",
      style: {
        add: "btn-success"
      },
      items: [{
        type: "section",
        htmlClass: "row",
        items: [{
          type: "section",
          htmlClass: "col-xs-6 margin-top",
          items: [{
            key: "stay_feature[].feature_id",
            type: "select",
          }]
        }, {
          type: "section",
          htmlClass: "col-xs-6",
          items: [
            "stay_feature[].value"
          ]
        }]
      }]
    }, {
      key: "stay_room",
      items: [{
        key: "stay_room[].title",
        type: "textbox",
      }, {
        key: "stay_room[].description",
        type: "textarea",
      }, {
        key: "stay_room[].stay_room_type",
        type: "select",
      }, {
        key: "stay_room[].section_no",
        type: "textbox",
      }, {
        key: "stay_room[].no_of_beds",
        // type: "textbox",
      }, {
        key: "stay_room[].occupancy",
        type: "select",
      }, {
        key: "stay_room[].extra_bed_cost",
        type: "textbox",
      }, {
        key: "stay_room[].breakfast_charges",
        type: "textbox",
      }, {
        key: "stay_room[].lunch_charges",
        type: "textbox",
      }, {
        key: "stay_room[].dinner_charges",
        type: "textbox",
      }, {
        key: "stay_room[].stay_room_feature",
        items: [{
            key: "stay_room[].stay_room_feature[].feature_id",
            type: "select",
          }, {
            key: "stay_room[].stay_room_feature[].value",
            type: "textbox",
          },

        ]
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
      }, ]
    }
  ]);
