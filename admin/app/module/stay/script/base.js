/*global angular:false */
angular.module('stay', [
    'ui.router'
])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('stay', {
                url: '/stay',
                templateUrl: 'module/stay/view/home.html',
                ncyBreadcrumb: {
                    label: 'stay'
                },
                abstract: true
            })
            .state('stay.list', {
                url: '',
                templateUrl: 'module/stay/view/list.html',
                ncyBreadcrumb: {
                    label: 'stay'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayListController'
            })
            .state('stay.add', {
                url: '/add',
                templateUrl: 'module/stay/view/add.html',
                ncyBreadcrumb: {
                    label: 'stay'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayAddController'
            })
            .state('stay.edit', {
                url: '/edit',
                templateUrl: 'module/stay/view/edit.html',
                ncyBreadcrumb: {
                    label: 'stay'
                },
                params: {
                    data: ['default', 'list', 'of', 'things']
                },
                controller: 'StayEditController'
            });
    })
    .value('staySchema', {
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
    })
    .value('stayGridColumnDef', [
        {
            field: 'id',
            name: '',
            cellTemplate: 'module/stay/view/buttons.html',
            width: 80

        },
        {
            name: 'name',
            title: 'Name',
            width: 200

        },
        {
            name: 'desc',
            title: 'Description',
            width: 200
        },
        {
            name: 'stay_type.id',
            width: 200
        },
        {
            name: 'stay_type.others',
            width: 200
        },
        {
            name: 'email',
            width: 200
        },
        {
            name: 'phone',
            width: 200
        },
        {
            name: 'min_stay',
            width: 200
        },
        {
            name: 'addr',
            width: 200
        },
        {
            name: 'no_sect',
            width: 200
        },
        {
            name: 'no_rooms',
            width: 200
        },
        {
            name: 'check_in',
            width: 200
        },
        {
            name: 'check_out',
            width: 200
        },
        {
            name: 'pay_method',
            width: 200
        },
        {
            name: 'stay_feat',
            width: 200
        },
        {
            name: 'stay_room',
            width: 1500
        },
        {
            name: 'stay_party',
            width: 700
    }

    ])
    .value('stayForm', [
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
}
            ]);
