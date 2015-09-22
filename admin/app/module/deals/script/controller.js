angular.module('deals')
    .controller('TryController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';
        $scope.schema = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 2,
                    title: "Name",
                    description: "Deal Title"
                },
                "desc": {
                    "title": "Description",
                    "type": "string",
                    "maxLength": 20
                },
                deal_type_id: {
                    title: "Type Of Discount",
                    type: "string",
                    enum: ['%', '₹']
                },
                amt: {
                    title: "Value",
                    type: "number"
                },
                start: {
                    title: "Starts",
                    type: "object",
                    properties: {
                        recr_freq: {
                            title: "Recurrence frequency",
                            type: "string",
                            enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                        },
                        time: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    at: {
                                        title: "at",
                                        type: "number"
                                    }
                                }
                            }

                        }
                    }

                },
                cust_criteria: {
                    type: "array",
                    title: "Customer Eligibility",
                    items: {
                        type: "object",
                        properties: {
                            crit_id: {
                                title: "Criteria Id",
                                type: "string",
                                enum: ['Budget', 'Location']
                            },
                            relation: {
                                title: "Relationship",
                                type: "string",
                                enum: ['AND', 'OR']
                            },
                            compare: {
                                title: "Comparator",
                                type: "string",
                                enum: ['<', '>', '=', '<=', '>=', '!=']
                            },
                            value: {
                                title: "Value",
                                type: "string"
                            }
                        }
                    }

                },
                event_criteria: {
                    type: "array",
                    //title: "Event Eligibility",
                    items: {
                        type: "object",
                        properties: {
                            crit_id: {
                                title: "Criteria Id",
                                type: "string",
                                enum: ['Budget', 'Location']
                            },
                            relation: {
                                title: "Relationship",
                                type: "string",
                                enum: ['AND', 'OR']
                            },
                            compare: {
                                title: "Comparator",
                                type: "string",
                                enum: ['<', '>', '=', '<=', '>=', '!=']
                            },
                            value: {
                                title: "Value",
                                type: "string"
                            }
                        }
                    }

                },
                noti: {
                    type: "object",
                    properties: {
                        name: {
                            title: "Name",
                            type: "string",
                            placeholder: "Notification Name"
                        },
                        desc: {
                            title: "Description",
                            type: "string",
                            "maxLength": 20
                        },
                        start: {
                            title: "Starts",
                            type: "object",
                            properties: {
                                recr_freq: {
                                    title: "Recurrence frequency",
                                    type: "string",
                                    enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                                },
                                time: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            at: {
                                                title: "at",
                                                type: "number"
                                            }
                                        }
                                    }

                                }
                            }

                        }
                    }

                }

            }
        }
        $scope.form = [
                        "name",
            {
                "key": "desc",
                "type": "textarea",
                "placeholder": "Enter the deal description"
                },
            {
                "type": "help",
                "htmlClass": "row",
                "helpvalue": "<h4 class=\"start-style\">Starts</h4>"
                },
            {
                "type": "section",
                "key": "start",
                "htmlClass": "row",
                "items": [
                    "start.recr_freq"
                ]
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "start.time",
                        title: "At",
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
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [
                                    "deal_type_id"
                                ]
                            },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "items": [
                                    "amt"
                                ]
                            }
                        ]
            },

            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "cust_criteria",
                        "title": "Customer Eligibility",
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
                        "key": "event_criteria",
                        "title": "Event Eligibility",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        }
                    }
                ]
            },
            {
                "type": "help",
                "htmlClass": "row",
                "helpvalue": "<h4 class=\"start-style\">Notification</h4>"
            },
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-3",
                        "items": [
                                    "noti.name"
                                ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-3",
                        "items": [
                            {
                                "key": "noti.desc",
                                "type": "textarea"
                            }

                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6",
                        "key": "start",
                        "items": [

                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": [
                                    "noti.start.recr_freq"
                                    ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-4",
                                "items": [
                                    {
                                        "key": "noti.start.time",
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
                type: "submit",
                title: "Save"
            }
            ];

        $scope.model = {};

        //table
        function RowEditCtrl($modalInstance, grid, row) {
            var vm = this;

            vm.schema = {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        minLength: 2,
                        title: "Name",
                        description: "Deal Title"
                    },
                    desc: {
                        "title": "Description",
                        "type": "string",
                        "maxLength": 20
                    },
                    deal_type_id: {
                        title: "Type Of Discount",
                        type: "string",
                        enum: ['%', '₹']
                    },
                    amt: {
                        title: "Value",
                        type: "number"
                    },
                    start: {
                        title: "Starts",
                        type: "object",
                        properties: {
                            recr_freq: {
                                title: "Recurrence frequency",
                                type: "string",
                                enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                            },
                            time: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        time_repeat: {
                                            type: "string",
                                            enum: ['Hour', 'Day', 'Week', 'Month']
                                        },
                                        at: {
                                            title: "at",
                                            type: "number"
                                        }
                                    }
                                }

                            }
                        }

                    },
                    cust_criteria: {
                        type: "array",
                        title: "Customer Eligibility",
                        items: {
                            type: "object",
                            properties: {
                                crit_id: {
                                    title: "Criteria Id",
                                    type: "string",
                                    enum: ['Budget', 'Location']
                                },
                                relation: {
                                    title: "Relationship",
                                    type: "string",
                                    enum: ['AND', 'OR']
                                },
                                compare: {
                                    title: "Comparator",
                                    type: "string",
                                    enum: ['<', '>', '=', '<=', '>=', '!=']
                                },
                                value: {
                                    title: "Value",
                                    type: "string"
                                }
                            }
                        }

                    },
                    event_criteria: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                crit_id: {
                                    title: "Criteria Id",
                                    type: "string",
                                    enum: ['Budget', 'Location']
                                },
                                relation: {
                                    title: "Relationship",
                                    type: "string",
                                    enum: ['AND', 'OR']
                                },
                                compare: {
                                    title: "Comparator",
                                    type: "string",
                                    enum: ['<', '>', '=', '<=', '>=', '!=']
                                },
                                value: {
                                    title: "Value",
                                    type: "string"
                                }
                            }
                        }

                    },
                    noti: {
                        type: "object",
                        properties: {
                            name: {
                                title: "Name",
                                type: "string",
                                placeholder: "Notification Name"
                            },
                            desc: {
                                title: "Description",
                                type: "string",
                                "maxLength": 20
                            },
                            start: {
                                title: "Starts",
                                type: "object",
                                properties: {
                                    recr_freq: {
                                        title: "Recurrence frequency",
                                        type: "string",
                                        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                                    },
                                    time: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                time_repeat: {
                                                    type: "string",
                                                    enum: ['Hour', 'Day', 'Week', 'Month']
                                                },
                                                at: {
                                                    title: "at",
                                                    type: "number"
                                                }
                                            }
                                        }

                                    }
                                }

                            }
                        }

                    }

                }
            };
            vm.entity = angular.copy(row.entity);
            vm.form = [

                        "name",
                {
                    "key": "desc",
                    "type": "textarea",
                    "placeholder": "Enter the deal description"
                },
                {
                    "type": "help",
                    "htmlClass": "row",
                    "helpvalue": "<h4 class=\"start-style\">Starts</h4>"
                },
                {
                    "type": "section",
                    "key": "start",
                    "htmlClass": "row",
                    "items": [
                    "start.recr_freq"
                ]
            },
                {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "key": "start.time",
                            title: "At",
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
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                    "deal_type_id"
                                ]
                            },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                    "amt"
                                ]
                            }
                        ]
            },

                {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "key": "cust_criteria",
                            "title": "Customer Eligibility",
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
                            "key": "event_criteria",
                            "title": "Event Eligibility",
                            "add": "New",
                            "style": {
                                "add": "btn-success"
                            }
                    }
                ]
            },
                {
                    "type": "help",
                    "htmlClass": "row",
                    "helpvalue": "<h4 class=\"start-style\">Notification</h4>"
            },
                {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                    "noti.name"
                                ]
                    },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                {
                                    "key": "noti.desc",
                                    "type": "textarea"
                            }

                        ]
                    },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "key": "start",
                            "items": [

                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-4",
                                    "items": [
                                    "noti.start.recr_freq"
                                    ]
                            },
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-4",
                                    "items": [
                                        {
                                            "key": "noti.start.time",
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
            }
            ];

            vm.save = save;

            function save() {
                // Copy row values over
                row.entity = angular.extend(row.entity, vm.entity);
                $modalInstance.close(row.entity);
            }
        };

        function RowAddCtrl($modalInstance) {
            var vm = this;

            vm.schema = {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        minLength: 2,
                        title: "Name",
                        description: "Deal Title"
                    },
                    "desc": {
                        "title": "Description",
                        "type": "string",
                        "maxLength": 20
                    },
                    deal_type_id: {
                        title: "Type Of Discount",
                        type: "string",
                        enum: ['%', '₹']
                    },
                    amt: {
                        title: "Value",
                        type: "number"
                    },
                    start: {
                        title: "Starts",
                        type: "object",
                        properties: {
                            recr_freq: {
                                title: "Recurrence frequency",
                                type: "string",
                                enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                            },
                            time: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        time_repeat: {
                                            type: "string",
                                            enum: ['Hour', 'Day', 'Week', 'Month']
                                        },
                                        at: {
                                            title: "at",
                                            type: "number"
                                        }
                                    }
                                }

                            }
                        }

                    },
                    cust_criteria: {
                        type: "array",
                        title: "Customer Eligibility",
                        items: {
                            type: "object",
                            properties: {
                                crit_id: {
                                    title: "Criteria Id",
                                    type: "string",
                                    enum: ['Budget', 'Location']
                                },
                                relation: {
                                    title: "Relationship",
                                    type: "string",
                                    enum: ['AND', 'OR']
                                },
                                compare: {
                                    title: "Comparator",
                                    type: "string",
                                    enum: ['<', '>', '=', '<=', '>=', '!=']
                                },
                                value: {
                                    title: "Value",
                                    type: "string"
                                }
                            }
                        }

                    },
                    event_criteria: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                event_crit_id: {
                                    title: "Criteria Id",
                                    type: "string",
                                    enum: ['Budget', 'Location']
                                },
                                event_relation: {
                                    title: "Relationship",
                                    type: "string",
                                    enum: ['AND', 'OR']
                                },
                                event_compare: {
                                    title: "Comparator",
                                    type: "string",
                                    enum: ['<', '>', '=', '<=', '>=', '!=']
                                },
                                event_value: {
                                    title: "Value",
                                    type: "string"
                                }
                            }
                        }

                    },
                    noti: {
                        type: "object",
                        properties: {
                            noti_name: {
                                title: "Name",
                                type: "string",
                                placeholder: "Notification Name"
                            },
                            noti_desc: {
                                title: "Description",
                                type: "string",
                                "maxLength": 20
                            },
                            start: {
                                title: "Starts",
                                type: "object",
                                properties: {
                                    recr_freq: {
                                        title: "Recurrence frequency",
                                        type: "string",
                                        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                                    },
                                    time: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                time_repeat: {
                                                    type: "string",
                                                    enum: ['Hour', 'Day', 'Week', 'Month']
                                                },
                                                at: {
                                                    title: "at",
                                                    type: "number"
                                                }
                                            }
                                        }

                                    }
                                }

                            }
                        }

                    }

                }
            };
            //            vm.entity = angular.copy(row.entity);
            vm.form = [

                        "name",
                {
                    "key": "desc",
                    "type": "textarea",
                    "placeholder": "Enter the deal description"
                },
                {
                    "type": "help",
                    "htmlClass": "row",
                    "helpvalue": "<h4 class=\"start-style\">Starts</h4>"
                },
                {
                    "type": "section",
                    "key": "start",
                    "htmlClass": "row",
                    "items": [
                    "start.recr_freq"
                ]
            },
                {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "key": "start.time",
                            title: "At",
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
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                    "deal_type_id"
                                ]
                            },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "items": [
                                    "amt"
                                ]
                            }
                        ]
            },

                {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "key": "cust_criteria",
                            "title": "Customer Eligibility",
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
                            "key": "event_criteria",
                            "title": "Event Eligibility",
                            "add": "New",
                            "style": {
                                "add": "btn-success"
                            }
                    }
                ]
            },
                {
                    "type": "help",
                    "htmlClass": "row",
                    "helpvalue": "<h4 class=\"start-style\">Notification</h4>"
            },
                {
                    "type": "section",
                    "htmlClass": "row",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                    "noti.name"
                                ]
                    },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-3",
                            "items": [
                                {
                                    "key": "noti.desc",
                                    "type": "textarea"
                            }

                        ]
                    },
                        {
                            "type": "section",
                            "htmlClass": "col-xs-6",
                            "key": "start",
                            "items": [

                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-4",
                                    "items": [
                                    "noti.start.recr_freq"
                                    ]
                            },
                                {
                                    "type": "section",
                                    "htmlClass": "col-xs-4",
                                    "items": [
                                        {
                                            "key": "noti.start.time",
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
            }
            ];

            vm.save = save;
            vm.entity = {};

            function save() {
                // Copy row values over
                //                row.entity = angular.extend(row.entity, vm.entity);
                $scope.gridOpts.data.push(vm.entity);
                $modalInstance.close();
            }
        };
        $scope.editRow = function (grid, row) {
            $modal.open({
                templateUrl: 'module/deals/view/edit-modal.html',
                controller: ['$modalInstance', 'grid', 'row', RowEditCtrl],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return grid;
                    },
                    row: function () {
                        return row;
                    }
                }
            });
        };

        $scope.addRow = function () {
            $modal.open({
                templateUrl: 'module/deals/view/edit-modal.html',
                controller: ['$modalInstance', RowAddCtrl],
                controllerAs: 'vm',

            });
        };



        $scope.gridOpts = {
            columnDefs: [
                {
                    field: 'id',
                    name: '',
                    cellTemplate: 'module/deals/view/edit-button.html',
                    width: 40
                },
                {
                    name: 'name',
                    title: 'Deal Name'
                },
                {
                    name: 'desc',
                    title: 'Description'
                },
                {
                    name: 'recr_freq'
                },
                {
                    name: 'at'
                },
                {
                    name: 'deal_type_id',
                    width: 50
                },
                {
                    name: 'amt',
                    width: 50
                },
                {
                    name: 'crit_id'
                },
                {
                    name: 'relation'
                },
                {
                    name: 'compare'
                },
                {
                    name: 'value'
                },
                {
                    name: 'event_crit_id'
                },
                {
                    name: 'event_relation'
                },
                {
                    name: 'event_compare'
                },
                {
                    name: 'event_value'
                },
                {
                    name: 'noti_name'
                },
                {
                    name: 'noti_desc'
                }
            ],
            data: [
                {
                    "name": "Cox",
                    "desc": "Carney",
                    "deal_type_id": "%",
                    "amt": "50",
                    "recr_freq": "Daily",
                    "at": "11.00",
                    "crit_id": "Budget",
                    "relation": "or",
                    "compare": "<",
                    "value": "10",
                    "event_crit_id": "santa monica",
                    "event_relation": "or",
                    "event_compare": ">",
                    "event_value": "100",
                    "noti_name": "New DEal",
                    "noti_desc": "yo yoy oy ",

                  }


                ]
        }
            }]);
