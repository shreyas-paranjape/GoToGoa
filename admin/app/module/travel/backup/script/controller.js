/*global angular:false */
angular.module('travel')

.controller('TravelListController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
    'use strict';
    $scope.schema = {
        type: "object",
        properties: {
            name: {
                title: "Name",
                type: "string"
            },
            desc: {
                title: "Description",
                type: "string",
                maxLength: 20
            },
            travel_type_id: {
                type: "string",
                title: "Type of transport",
                enum: ['self cars', 'taxis', 'bikes', 'buses/coaches/tempo traveller']
            },
            travel_vehicle: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        model_id: {
                            type: "string",
                            title: "vehicle type",
                            enum: ['Scorpio', 'swift', 'Activa', 'wagonR']
                        },
                        vehicle_class_id: {
                            type: "string",
                            title: "Vehicle class",
                            enum: ['hatchback', 'sedan', 'suv', 'luv']
                        },
                        no_of_seats: {
                            type: "number",
                            title: "No. of seats"
                        },
                        travel_vehicle_feature: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    feature_id: {
                                        type: "string",
                                        title: "vehicle features",
                                        enum: ['Ac', 'Non ac', 'blah blah']
                                    },
                                    value: {
                                        type: "string",
                                        title: "Value"
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
            "placeholder": "Enter the Car description"
        },
        {
            key: "travel_type_id"
        },
        {
            "type": "section",
            "htmlClass": "row",
            "items": [
                {
                    "key": "travel_vehicle",
                    title: "Vehicle Details",
                    "add": "New",
                    "style": {
                        "add": "btn-success"
                    },
                    items: [
                        {
                            "type": "section",
                            "htmlClass": "row",
                            "items": [
                                {
                                    "key": "travel_vehicle[].model_id"
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
                                            "key": "travel_vehicle[].vehicle_class_id"
                                            }

                                        ]
                                    },
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                    "items": [
                                        {
                                            "key": "travel_vehicle[].no_of_seats"

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
                                    "key": "travel_vehicle[].travel_vehicle_feature",
                                    title: "Selected Vehicle Features",
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
    ];
    $scope.model = {};
            }]);
