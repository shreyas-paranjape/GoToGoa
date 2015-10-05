angular.module('place')
    .controller('PlacesController', ['$scope', '$stateParams', '$modal',
      function ($scope, $stateParams, $modal) {
            'use strict';
            $scope.store = $stateParams.data;

            function RowEditCtrl($modalInstance, grid, row) {
                var vm = this;

                vm.schema = {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            title: 'Name'
                        },
                        company: {
                            type: 'string',
                            title: 'Company'
                        },
                        phone: {
                            type: 'string',
                            title: 'Phone'
                        },
                        'address.city': {
                            type: 'string',
                            title: 'City'
                        }
                    }
                };
                vm.entity = angular.copy(row.entity);
                vm.form = [
            'name',
            'company',
            'phone',
                    {
                        'key': 'address.city',
                        'title': 'City'
            },
          ];

                vm.save = save;

                function save() {
                    // Copy row values over
                    row.entity = angular.extend(row.entity, vm.entity);
                    $modalInstance.close(row.entity);
                }
            };


            $scope.editRow = function (grid, row) {
                $modal.open({
                    templateUrl: 'module/place/view/edit-modal.html',
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



            $scope.gridOpts = {
                columnDefs: [
                    {
                        field: 'id',
                        name: '',
                        cellTemplate: 'module/place/view/edit-button.html',
                        width: 40
                },
                    {
                        name: 'name'
                    },
                    {
                        name: 'company'
                    },
                    {
                        name: 'phone'
                    },
                    {
                        name: 'City',
                        field: 'address.city'
                    }
              ],
                data: [
                    {
                        "name": "Cox",
                        "phone": "Carney",
                        "company": "Enormo",
                        "address": {
                            "city": "xyz"
                        }
                  }


                ]
            };

    }])
    .controller('PlacesListController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';
        $scope.schema = {
            "type": "object",
            //"title": "Comment",
            "properties": {
                "name": {
                    "title": "Name of the place",
                    "type": "string"
                },
                location: {
                    title: "Location/Area",
                    type: "string"
                },
                addr: {
                    title: "Address",
                    type: "string",
                    maxLength: 20
                },
                rules: {
                    title: "Rules & Regulations",
                    type: "string"
                },
                transport: {
                    title: "Mode Of Transport",
                    type: "string",
                    enum: ['Bike', 'Car', 'Pilot', 'Bus']
                },
                religious: {
                    type: "object",
                    title: "Religious Places",
                    properties: {
                        temples: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        title: "Name",
                                        type: "string"
                                    },
                                    from: {
                                        title: "Timings-From",
                                        type: "string",
                                        "format": "timepicker"
                                    },
                                    to: {
                                        title: "Timings-To",
                                        type: "string",
                                        "format": "timepicker"
                                    }
                                }
                            }
                        },
                        churches: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        title: "Name",
                                        type: "string"
                                    },
                                    from: {
                                        title: "Timings-From",
                                        type: "string",
                                        "format": "timepicker"
                                    },
                                    to: {
                                        title: "Timings-To",
                                        type: "string",
                                        "format": "timepicker"
                                    }
                                }
                            }
                        },
                        mosques: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        title: "Name",
                                        type: "string"
                                    },
                                    from: {
                                        title: "Timings-From",
                                        type: "string",
                                        "format": "timepicker"
                                    },
                                    to: {
                                        title: "Timings-To",
                                        type: "string",
                                        "format": "timepicker"
                                    }
                                }
                            }
                        },
                        gurudwara: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        title: "Name",
                                        type: "string"
                                    },
                                    from: {
                                        title: "Timings-From",
                                        type: "string",
                                        "format": "timepicker"
                                    },
                                    to: {
                                        title: "Timings-To",
                                        type: "string",
                                        "format": "timepicker"
                                    }
                                }
                            }
                        }
                    }
                },
                forts: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: {
                                title: "Name",
                                type: "string"
                            },
                            charges: {
                                title: "Entry fee",
                                type: "string"
                            },
                            from: {
                                title: "Timings-From",
                                type: "string",
                                "format": "timepicker"
                            },
                            to: {
                                title: "Timings-To",
                                type: "string",
                                "format": "timepicker"
                            }
                        }
                    }
                }
            }

        };
        $scope.form = [
            "name",
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                        items: [
                            "location",
                            ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                        items: [
                            {
                                key: "addr",
                                type: "textarea"
                            }
                        ]
                    }
                ]
            },
            {
                key: "rules",
                type: "textarea"
            },
                "transport",
            {
                "type": "help",
                "helpvalue": "<div class=\"alert alert-info\">Types of places</div>"
            },
            {
                type: "section",
                htmlClass: "row",
                key: "religious",
                items: [
                    {
                        "key": "religious.temples",
                        title: "Temples",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        },
                        items: [
                            {
                                "type": "section",
                                "htmlClass": "row",
                                items: [
                                    {
                                        key: "religious.temples[].name"
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
                                                "key": "religious.temples[].from"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "religious.temples[].to"

                                            }

                                        ]
                                    }
                            ]
                        }
                    ]
                    },
                    {
                        "key": "religious.churches",
                        title: "Churches",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        },
                        items: [
                            {
                                "type": "section",
                                "htmlClass": "row",
                                items: [
                                    {
                                        key: "religious.churches[].name"
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
                                                "key": "religious.churches[].from"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "religious.churches[].to"

                                            }

                                        ]
                                    }
                            ]
                        }
                    ]
                    },
                    {
                        "key": "religious.mosques",
                        title: "Mosques",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        },
                        items: [
                            {
                                "type": "section",
                                "htmlClass": "row",
                                items: [
                                    {
                                        key: "religious.mosques[].name"
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
                                                "key": "religious.mosques[].from"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "religious.mosques[].to"

                                            }

                                        ]
                                    }
                            ]
                        }
                    ]
                    },
                    {
                        "key": "religious.gurudwara",
                        title: "Gurudwara",
                        "add": "New",
                        "style": {
                            "add": "btn-success"
                        },
                        items: [
                            {
                                "type": "section",
                                "htmlClass": "row",
                                items: [
                                    {
                                        key: "religious.gurudwara[].name"
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
                                                "key": "religious.gurudwara[].from"
                                            }

                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-6 col-md-6 col-sm-6 col-lg-6",
                                        "items": [
                                            {
                                                "key": "religious.gurudwara[].to"

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
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "key": "forts",
                        title: "Forts",
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
                                        key: "forts[].name"
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
                                                key: "forts[].charges"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                                        "items": [
                                            {
                                                key: "forts[].from"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "section",
                                        "htmlClass": "col-xs-4 col-md-4 col-sm-4 col-lg-4",
                                        "items": [
                                            {
                                                key: "forts[].to"
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
