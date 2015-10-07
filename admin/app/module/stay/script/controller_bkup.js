/*global angular:false */
angular.module('stay')
    .controller('StayController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';
        $scope.schema = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 2,
                    title: "Name"
                        //description: "Name or alias"
                },
                desc: {
                    type: "string",
                    maxLength: 20,
                    title: "Description"
                },
                stay_type: {
                    type: "object",
                    title: "stay type",
                    properties: {
                        others: {
                            type: "string",
                            title: "Others"
                        },
                        id: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        enum: ['2 star', '3 star', '4 star', '5 star', 'Villa', 'Appartment', 'Cottage']
                                    }
                                }
                            }
                        }

                    }

                },
                email: {
                    "title": "Email address",
                    "type": "string",
                    "pattern": "^\\S+@\\S+$"
                },
                phone: {
                    "title": "Phone number",
                    type: "string"
                },
                addr: {
                    "title": "Hotel address",
                    type: "string",
                    maxLength: 20
                },
                no_sect: {
                    title: "No. of floors/appartments/villas",
                    type: "number"
                },
                no_rooms: {
                    title: "No. of rooms",
                    type: "number"
                },
                check_in: {
                    title: "Check in",
                    type: "string",
                    "format": "timepicker"
                },
                check_out: {
                    title: "Check out",
                    type: "string",
                    "format": "timepicker"
                },
                min_stay: {
                    title: "Minimum stay period",
                    type: "string"
                },
                pay_method: {
                    title: "Payment Method",
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            pay_id: {
                                type: "string",
                                enum: ['Credit card', 'Debit Card', 'Cheque', 'Demand Draft', 'Net banking', 'Bank Transfers', 'Cash']
                            }
                        }
                    }
                },
                stay_feat: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            feat_id: {
                                type: "string",
                                enum: ['Lawn Area', 'Swimming Pool', 'Pick-up & Drop', 'Wifi', 'Parking', 'Elevator', 'Gym and Recreational Facilities', 'Doctor-on call', 'Foreign Exchange', 'Metal Detectors', 'Fire Alarm', 'Manned Security', 'CCTV Security cameras', '24-Hour Power Backup', 'Baby Sitting', 'Daily Housekeeping', 'Televisions', '24x7 Room Service', 'Bath Amenities', 'Mini Bar', 'Iron And Ironing Board', 'Work Desk & Chair', 'In-Room Electronic Safes', 'Direct Dialling (ISD /STD)', 'Satellite Cable Connection', 'Tea / Coffee Makers', '24 Hrs Running Hot & Cold Water', 'Any other ']
                            },
                            value: {
                                type: "string",
                                title: "Value",
                                description: "Please enter 'y' for yes, 'n' for no."
                            }
                        }
                    }
                },
                stay_room: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                title: "Name of the Room"
                            },
                            desc: {
                                type: "string",
                                title: "Description of the room",
                                maxlength: 20
                            },
                            area: {
                                type: "string",
                                title: "Area of the room"
                            },
                            type_room: {
                                type: "string",
                                enum: ['Standard', 'Deluxe', 'Superior', 'Suite']
                            },
                            sect_no: {
                                type: "number",
                                title: "Floor no."
                            },
                            no_beds: {
                                type: "number",
                                title: "No. of beds "
                            },
                            occu: {
                                type: "string",
                                enum: ['Single', 'Double', 'Triple', 'Other']
                            },
                            extra_bed_cost: {
                                type: "string",
                                title: "Cost for extra bed"
                            },
                            breakfast_charge: {
                                type: "string",
                                title: "Breakfast cost"
                            },
                            lunch_charge: {
                                type: "string",
                                title: "Lunch cost"
                            },
                            dinner_charge: {
                                type: "string",
                                title: "Dinner cost"
                            },
                            stay_room_feature: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        feat_id: {
                                            type: "string",
                                            enum: ['Lawn Area', 'Swimming Pool', 'Pick-up & Drop', 'Wifi', 'Parking', 'Elevator', 'Gym and Recreational Facilities', 'Doctor-on call', 'Foreign Exchange', 'Metal Detectors', 'Fire Alarm', 'Manned Security', 'CCTV Security cameras', '24-Hour Power Backup', 'Baby Sitting', 'Daily Housekeeping', 'Televisions', '24x7 Room Service', 'Bath Amenities', 'Mini Bar', 'Iron And Ironing Board', 'Work Desk & Chair', 'In-Room Electronic Safes', 'Direct Dialling (ISD /STD)', 'Satellite Cable Connection', 'Tea / Coffee Makers', '24 Hrs Running Hot & Cold Water', 'Any other ']
                                        },
                                        value: {
                                            type: "string",
                                            title: "Value",
                                            description: "Please enter 'y' for yes, 'n' for no."
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                stay_party: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: {
                                title: "Name",
                                type: "string"
                            },
                            email: {
                                "title": "Email address",
                                "type": "string",
                                "pattern": "^\\S+@\\S+$"
                            },
                            phone: {
                                "title": "Phone number",
                                type: "string"
                            },
                            desg_id: {
                                title: "Designation id",
                                type: "string",
                                enum: ['1235', '6545']
                            },
                            stay_party_role_id: {
                                title: "Stay party role id",
                                type: "string",
                                enum: ['Manager', 'owner']
                            }
                        }
                    }
                }
            }
        };

        $scope.form = [
            "name",
            {
                "key": "desc",
                "type": "textarea",
                "placeholder": "Enter the Hotel description"
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "stay_type.id",
                        title: "Stay type",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        }
                    }
                ]
            },
            {
                "type": "section",
                "key": "stay_type",
                "htmlClass": "row",
                "items": [
                    "stay_type.others"
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                        "items": [
                            {
                                "key": "email"
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                        "items": [
                            {
                                "key": "phone"
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                        "items": [
                            {
                                "key": "min_stay"
                            }

                        ]
                    }
                    ]
            },
            {
                key: "addr",
                type: "textarea"
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                        "items": [
                            {
                                "key": "no_sect"
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                        "items": [
                            {
                                "key": "no_rooms"
                            }

                        ]
                    }
                    ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                        "items": [
                            {
                                "key": "check_in",
                                "timeOptions": {
                                    "minuteStep": 15,
                                    "autoclose": 1
                                }
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                        "items": [
                            {
                                "key": "check_out",
                                "timeOptions": {
                                    "minuteStep": 15,
                                    "autoclose": 1
                                }
                            }

                        ]
                    }
                    ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "pay_method",
                        title: "Payment method",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        }
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "stay_feat",
                        title: "Hotel Features/ Amenities",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        }
                    }
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "stay_room",
                        title: "Room features",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        },
                        //                        "type": "section",
                        //                       htmlClass: "row",
                        items: [
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "key": "stay_room[].name"
                                    },
                                    {
                                        "key": "stay_room[].desc",
                                        type: "textarea"
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_room[].area"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_room[].type_room"

                                            }

                                        ]
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_room[].sect_no"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_room[].no_beds"

                                            }

                                        ]
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_room[].occu"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_room[].extra_bed_cost"

                                            }

                                        ]
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                                        "items": [
                                            {
                                                "key": "stay_room[].breakfast_charge"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                                        "items": [
                                            {
                                                "key": "stay_room[].lunch_charge"

                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                                        "items": [
                                            {
                                                "key": "stay_room[].dinner_charge"

                                            }

                                        ]
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "key": "stay_room[].stay_room_feature",
                                        title: "Stay room features",
                                        "add": "New",
                                        "style": {
                                            "add": "btn-success"
                                        }
                                    }

                            ]
                        }
                    ]

                    }
                ]
},
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "stay_party",
                        title: "Contact details",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        },
                        //                        "type": "section",
                        //                       htmlClass: "row",
                        items: [
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "key": "stay_party[].name"
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_party[].email"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_party[].phone"

                                            }

                                        ]
                                    }
                            ]
                        },
                            {
                                "type": "section",
                                "htmlClass": "row",
                                "items": [
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_party[].desg_id"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "stay_party[].stay_party_role_id"

                                            }

                                        ]
                                    }
                            ]
                        }
                    ]

                    }
                ]
},
            {
                type: "submit",
                title: "Save"
                    }
            ];

        $scope.model = {};
            }])


.controller('StayTryController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
    'use strict';
    $scope.schema = {
        "type": "object",
        "required": [
    "name",
    "shoesizeLeft"
  ],
        "properties": {
            "name": {
                "title": "Name",
                "description": "Gimme yea name lad",
                "type": "string",
                "pattern": "^[^/]*$",
                "minLength": 2
            },
            "invitation": {
                "type": "string",
                "format": "html",
                "title": "Invitation Design",
                "description": "Design the invitation in full technicolor HTML"
            },
            "favorite": {
                "title": "Favorite",
                "type": "string",
                "enum": [
        "undefined",
        "null",
        "NaN"
      ]
            },
            "shoesizeLeft": {
                "title": "Shoe size (left)",
                "default": 42,
                "type": "number"
            },
            "shoesizeRight": {
                "title": "Shoe size (right)",
                "default": 42,
                "type": "number"
            },
            "attributes": {
                "type": "object",
                "title": "Attributes",
                "required": [
        "eyecolor"
      ],
                "properties": {
                    "eyecolor": {
                        "type": "string",
                        "format": "color",
                        "title": "Eye color",
                        "default": "pink"
                    },
                    "haircolor": {
                        "type": "string",
                        "title": "Hair color"
                    },
                    "shoulders": {
                        "type": "object",
                        "title": "Shoulders",
                        "properties": {
                            "left": {
                                "type": "string",
                                "title": "Left"
                            },
                            "right": {
                                "type": "string",
                                "title": "Right"
                            }
                        }
                    }
                }
            },
            "things": {
                "type": "array",
                "title": "I like...",
                "items": {
                    "type": "string",
                    "enum": [
          "clowns",
          "compiling",
          "sleeping"
        ]
                }
            },
            "dislike": {
                "type": "array",
                "title": "I dislike...",
                "items": {
                    "type": "string",
                    "title": "I hate"
                }
            },
            "soul": {
                "title": "Terms Of Service",
                "description": "I agree to sell my undying <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>soul</a>",
                "type": "boolean",
                "default": true
            },
            "soulserial": {
                "title": "Soul Serial No",
                "type": "string"
            },
            "date": {
                "title": "Date of party",
                "type": "string",
                "format": "date"
            },
            "radio": {
                "title": "Radio type",
                "type": "string",
                "enum": [
        "Transistor",
        "Tube"
      ]
            },
            "radio2": {
                "title": "My Second Radio",
                "type": "string",
                "enum": [
        "Transistor",
        "Tube"
      ]
            },
            "radiobuttons": {
                "type": "string",
                "enum": [
        "Select me!",
        "No me!"
      ]
            }
        }
    }
    $scope.form = [
        {
            "type": "fieldset",
            "title": "Stuff",
            "items": [
                {
                    "type": "tabs",
                    "tabs": [
                        {
                            "title": "Simple stuff",
                            "items": [
                                {
                                    "key": "name",
                                    "placeholder": "Check the console",
                                    "onChange": "log(modelValue)",
                                    "feedback": "{'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-star': !hasSuccess() }"
              },
                                {
                                    "key": "favorite",
                                    "feedback": false
              }
            ]
          },
                        {
                            "title": "More stuff",
                            "items": [
              "attributes.eyecolor",
              "attributes.haircolor",
                                {
                                    "key": "attributes.shoulders.left",
                                    "title": "Left shoulder",
                                    "description": "This value is copied to attributes.shoulders.right in the model",
                                    "copyValueTo": [
                  "attributes.shoulders.right"
                ]
              },
                                {
                                    "key": "shoesizeLeft",
                                    "feedback": false,
                                    "copyValueTo": [
                  "shoesizeRight"
                ]
              },
                                {
                                    "key": "shoesizeRight"
              },
                                {
                                    "key": "invitation",
                                    "tinymceOptions": {
                                        "toolbar": [
                    "undo redo| styleselect | bold italic | link image",
                    "alignleft aligncenter alignright"
                  ]
                                    }
              },
              "things",
              "dislike"
            ]
          }
        ]
      }
    ]
  },
        {
            "type": "help",
            "helpvalue": "<hr>"
  },
  "soul",
        {
            "type": "conditional",
            "condition": "modelData.soul",
            "items": [
                {
                    "key": "soulserial",
                    "placeholder": "ex. 666"
      }
    ]
  },

        {
            "key": "date",
            "minDate": "2014-06-20"
  },
        {
            "key": "radio",
            "type": "radios",
            "titleMap": [
                {
                    "value": "Transistor",
                    "name": "Transistor <br> Not the tube kind."
      },
                {
                    "value": "Tube",
                    "name": "Tube <br> The tube kind."
      }
    ]
  },
        {
            "key": "radio2",
            "type": "radios-inline",
            "titleMap": [
                {
                    "value": "Transistor",
                    "name": "Transistor <br> Not the tube kind."
      },
                {
                    "value": "Tube",
                    "name": "Tube <br> The tube kind."
      }
    ]
  },
        {
            "key": "radiobuttons",
            "style": {
                "selected": "btn-success",
                "unselected": "btn-default"
            },
            "type": "radiobuttons",
            "notitle": true
  },
        {
            "type": "actions",
            "items": [
                {
                    "type": "submit",
                    "style": "btn-info",
                    "title": "Do It!"
      },
                {
                    "type": "button",
                    "style": "btn-danger",
                    "title": "Noooooooooooo",
                    "onClick": "sayNo()"
      }
    ]
  }
];
    $scope.model = {};
}]);
