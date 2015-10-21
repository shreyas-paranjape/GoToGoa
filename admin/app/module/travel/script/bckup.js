/*global angular:false */
angular.module('travel', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
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

      // schedule: {
      //   title: "Schedule",
      //   type: "string",
      //   items: {
      //     type: "object",
      //     properties: {
      //       recurrence_frequency: {
      //         type: "string",
      //         // minLength: 2,
      //         title: "Title"
      //       },
      //       start_at: {
      //         title: "Description",
      //         type: "array",
      //         items: {
      //           type: "object",
      //           properties: {
      //             time_division: {
      //               type: "string",
      //               // minLength: 2,
      //               title: "Title"
      //             },
      //             value: {
      //               title: "Description",
      //               type: "string"
      //             }
      //           }
      //         }
      //       }
      //     },
      //   }
      // }



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





        name: {
          type: "string",
          minLength: 2,
          title: "Name"
        },
        email: {
          title: "Email",
          type: "string"
        },
        gender: {
          title: "Gender",
          type: "string",
          enum: [
            "Male",
            "Female"
          ]
        },
        comment: {
          title: "Comment",
          type: "string",
          maxLength: 100
        },

      array: {
        title: "Array with enum defaults to 'checkboxes'",
        type: "array",
        items: {
          type: "string",
          enum: [
            "a",
            "b",
            "c"
          ]
        }
      },





      stay_room: {       //array
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
            }
          }
        }
      },
          // required: ["name", "gender"]




    }
  }).value('travelGridColumnDef', [{
    field: 'id',
    name: '',
    cellTemplate: '/view/buttons.html',
    width: 80
  }, {
    name: 'name',
    width: 100
  }]).value('travelForm', [

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
      key: "start_at",
      items: [{
        key: "start_at[].time_division",
        type: "select"
      }, {
        key: "start_at[].value",
        type: "select"
      }]
    },



    // {
    //   key: "schedule",
    //   //  type: "textbox"
    //   items: {
    //     {
    //     key: "schedule[].recurrence_frequency",
    //     type: "select"
    //   }, {
    //     key: "schedule[].start_at",
    //     items: [{
    //       key: "schedule[].start_at[].time_division",
    //       type: "select"
    //     }, {
    //       key: "schedule[].start_at[].value",
    //       type: "select"
    //     }]
    //   }
    // }
    // }





    {
      key: "stay_feature",
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
          key: "stay_feature[].feature_id",
          type: "select",
        },{
          key: "stay_feature[].feature_id",
          type: "select",
        }]
      }, {
        type: "section",
        htmlClass: "col-xs-6",
        items: [
          "stay_feature[].value",
          "stay_feature[].value"
        ]
      }]
    }]
  },


  "name",
  "array", {
    "key": "gender",
    "type": "select"
  }, {
    "key": "comment",
    "type": "textarea",
    "placeholder": "comment here"
  }, {
    "type": "button",
    "style": "btn-info",
    "title": "back"
  }, {
    "type": "section",
    "htmlClass": "row",
    "items": [{
      "type": "section",
      "htmlClass": "col-xs-6",
      "items": [
        "name"
      ]
    }, {
      "type": "section",
      "htmlClass": "col-xs-6",
      "items": [
        "email"
      ]
    }
  ]},


      {
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
      },
      {
        key: "stay_room[].stay_room_feature",
        items: [{
          key: "stay_room[].stay_room_feature[].feature_id",
          type: "select",

        },
        {
          key: "stay_room[].stay_room_feature[].value"
        }]
      }
    ]}





  ]);
