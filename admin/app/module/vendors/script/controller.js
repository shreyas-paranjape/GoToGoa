/*global angular:false */
angular.module('vendors')

.controller('VendorsDetailController', ['$scope', '$stateParams', 'ModalService', function ($scope, $stateParams, ModalService, $modal) {
    'use strict';
    //console.log($stateParams.data);
    $scope.store = $stateParams.data;
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = this.href.split('#');
        $('.nav a').filter('a[href="#' + target[1] + '"]').tab('show');
    });
    $("#p").click(function () {
        $("#caption").slideToggle("slow");
    });

    $scope.tabs = [false, false, false, false, false, false];
    $scope.selectTab = function (index) {
        $scope.tabs = [false, false, false, false, false, false];
        $scope.tabs[index] = true;
    };

    //map
    $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?v=3.20&client=1091949904876-gsunk50dr8urlurrbgctb323e2q5163i.apps.googleusercontent.com";
    $scope.toggleBounce = function () {
        if (this.getAnimation() != null) {
            this.setAnimation(null);
        } else {
            this.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    $scope.beachPosition = [
        {
            lat: 15.517384,
            lng: 73.762864,
            name: "Candolim"
                },
        {
            lat: 15.480674,
            lng: 73.807338,
            name: "Miramar"
                }
            ];

    $scope.eatPosition = [
        {
            lat: 15.469899,
            lng: 73.807289,
            name: "Martins beach corner"
                },
        {
            lat: 15.464948,
            lng: 73.806733,
            name: "peeps kitchen"
                }
            ];

    $scope.positions = [

               /* {
                    lat: 15.48656,
                    lng: 73.81814
                },
                {
                    lat: 15.482677,
                    lng: 73.807459
                },
                {
                    lat: 15.517280,
                    lng: 73.762879
                }*/
            ];
    $scope.addMarker = function (event) {
        var ll = event.latLng;
        $scope.positions.push({
            lat: ll.lat(),
            lng: ll.lng()
        });
    }
    $scope.beaches = function () {
        $scope.positions = $scope.beachPosition;
    };
    $scope.eat = function () {
        $scope.positions = $scope.eatPosition;
        /* for (var key in $scope.map.markers) {
             $scope.map.markers[key].setMap($scope.map);
         };*/
    };
    $scope.hideMarkers = function () {
        for (var key in $scope.map.markers) {
            $scope.map.markers[key].setMap(null);
        };
    };

    }])

.controller('VendorsListController', ['$scope', '$filter', '$stateParams', 'ModalService','RowEditor',
        function ($scope, $filter, $stateParams, ModalService,RowEditor, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
            'use strict';
            //TODO Here we use the data passed from the form to lookup the hotels
            $scope.items = $stateParams.data;
            $scope.isCollapsed = true;
//            $scope.schema = {
//                "type": "object",
//                "title": "Comment",
//                "properties": {
//                    "name": {
//                        "title": "Name",
//                        "type": "string"
//                    },
//                    "email": {
//                        "title": "Email",
//                        "type": "string",
//                        "pattern": "^\\S+@\\S+$",
//                        //                        "description": "Email will be used for evil."
//                    },
//                    "comment": {
//                        "title": "Comment",
//                        "type": "string",
//                        "maxLength": 20,
//                        "validationMessage": "Don't be greedy!"
//                    }
//                },
//                "required": [
//                    "name",
//    "email",
//    "comment"
//  ]
//            }
//
//            $scope.form = [
//                    "name",
//                    "email",
//                {
//                    "key": "comment",
//                    "type": "textarea",
//                    "placeholder": "Make a comment"
//  },
//                {
//                    "type": "submit",
//                    "style": "btn-info",
//                    "title": "OK"
//  }
//];

//            $scope.model = {};

            //console.log($stateParams.data);
            $scope.swapData = function () {
                if ($scope.gridOpts.data === data1) {
                    $scope.gridOpts.data = data2;
                    $scope.gridOpts.columnDefs = columnDefs2;
                } else {
                    $scope.gridOpts.data = data1;
                    $scope.gridOpts.columnDefs = columnDefs1;
                }
            };

            $scope.addData = function (f, l, c, g) {
                //                var n = $scope.gridOpts.data.length + 1;
                $scope.gridOpts.data.push({
                    "firstName": f,
                    "lastName": l,
                    "company": c,
                    "employed": true,
                    "gender": g
                });
            };

            $scope.removeFirstRow = function () {
                //if($scope.gridOpts.data.length > 0){
                $scope.gridOpts.data.splice(0, 1);
                //}
            };

            $scope.reset = function () {
                data1 = angular.copy(origdata1);
                data2 = angular.copy(origdata2);

                $scope.gridOpts.data = data1;
                $scope.gridOpts.columnDefs = columnDefs1;
            }
            $.editRow = RowEditor.editRow;

            var columnDefs1 = [
                {
                    field: 'id',
                    name: '',
                    cellTemplate: 'module/vendors/view/edit-button.html',
                    width: 40
                },
                {
                    name: 'firstName'
                },
                {
                    name: 'lastName'
                },
                {
                    name: 'company'
                },
                {
                    name: 'gender'
                }
  ];

            var data1 = [
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "gender": "male"
    },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "gender": "female"
    },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "gender": "female"
    },
                {
                    "firstName": "Misty",
                    "lastName": "Oneill",
                    "company": "Letpro",
                    "gender": "female"
    }
  ];

            var origdata1 = angular.copy(data1);
            $scope.gridOpts = {
                columnDefs: columnDefs1,
                data: data1
            };

//            function RowEditor($rootScope, $modal) {
//                var service = {};
//                service.editRow = editRow;
//
//                function editRow(grid, row) {
//                    $modal.open({
//                        templateUrl: 'module/vendors/view/edit-modal.html',
//                        controller: ['$modalInstance', 'grid', 'row'],
//                        controllerAs: 'vm',
//                        resolve: {
//                            grid: function () {
//                                return grid;
//                            },
//                            row: function () {
//                                return row;
//                            }
//                        }
//                    });
//                }
//                return service;
//            }

            function RowEditCtrl($modalInstance, grid, row) {
                var vm = this;

                vm.schema = {
                    "type": "object",
                    "title": "Comment",
                    "properties": {
                        "FirstName": {
                            "title": "FirstName",
                            "type": "string"
                        },
                        "LastName": {
                            "title": "LastName",
                            "type": "string"
                            //                        "description": "Email will be used for evil."
                        },
                        "Company": {
                            "title": "Company",
                            "type": "string"
                        }
                    },
                    "required": [
                    "name", "email", "comment"
                    ]
                }
                vm.entity = angular.copy(row.entity);
                vm.form = [
                    'FirstName','LastName','Company',
                    
  ];

                vm.save = save;

                function save() {
                    // Copy row values over
                    row.entity = angular.extend(row.entity, vm.entity);
                    $modalInstance.close(row.entity);
                }
            }

            var columnDefs2 = [
                {
                    name: 'firstName'
                },
                {
                    name: 'lastName'
                },
                {
                    name: 'company'
                },
                {
                    name: 'employed'
                }
  ];

            var data2 = [
                {
                    "firstName": "Waters",
                    "lastName": "Shepherd",
                    "company": "Kongene",
                    "employed": true
    },
                {
                    "firstName": "Hopper",
                    "lastName": "Zamora",
                    "company": "Acium",
                    "employed": true
    },
                {
                    "firstName": "Marcy",
                    "lastName": "Mclean",
                    "company": "Zomboid",
                    "employed": true
    },
                {
                    "firstName": "Tania",
                    "lastName": "Cruz",
                    "company": "Marqet",
                    "employed": true
    },
                {
                    "firstName": "Kramer",
                    "lastName": "Cline",
                    "company": "Parleynet",
                    "employed": false
    },
                {
                    "firstName": "Bond",
                    "lastName": "Pickett",
                    "company": "Brainquil",
                    "employed": false
    }
  ];

            var origdata2 = angular.copy(data2);


            //modal
            //            $scope.show = function () {
            //                ModalService.showModal({
            //                    templateUrl: 'modal.html',
            //                    controller: 'VendorsListController',
            //                }).then(function (modal) {
            //                    modal.element.modal();
            //                    modal.close.then(function (result) {
            //                        $scope.message = "You said " + result;
            //                    });
            //                });
            //            };
            //trial data

            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
                $scope.hotels = orderBy($scope.hotels, predicate, reverse);
            };
            $scope.locationIncludes = [];
            $scope.includeLocation = function (location) {
                var i = $.inArray(location, $scope.locationIncludes);
                if (i > -1) {
                    $scope.locationIncludes.splice(i, 1);
                } else {
                    $stateParams
                    $scope.locationIncludes.push(location);
                }
            }
            $scope.locationFilter = function (hotels) {
                if ($scope.locationIncludes.length > 0) {
                    if ($.inArray(hotels.location, $scope.locationIncludes) < 0)
                        return;
                }

                return hotels;
            }

            //calendar
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            //            $scope.changeTo = 'Hungarian';
            /* event source that pulls from google.com */
            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event', // an option!
                //currentTimezone: 'America/Chicago' // an option!
            };
            /* event source that contains custom events on the scope */
            $scope.events = [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                },
                {
                    title: 'breakfast',
                    start: new Date(y, m, d, 8, 0),
                    end: new Date(y, m, d, 9, 0),

                },
                {
                    title: 'beach',
                    start: new Date(y, m, d, 10, 0),
                    end: new Date(y, m, d, 15, 30),

                },
                {
                    title: 'lunch',
                    start: new Date(y, m, d, 12, 0),
                    //                    end: new Date(y, m, d,15,30),

                }
    ];
            /* event source that calls a function on every view switch */
            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{
                    title: 'Feed Me ' + m,
                    start: s + (50000),
                    end: s + (100000),
                    allDay: false,
                    className: ['customFeed']
                }];
                callback(events);
            };

            //            $scope.calEventsExt = {
            //                color: '#f00',
            //                textColor: 'yellow',
            //                events: [
            //                    {
            //                        type: 'party',
            //                        title: 'Lunch',
            //                        start: new Date(y, m, d, 12, 0),
            //                        end: new Date(y, m, d, 14, 0),
            //                        allDay: false
            //                    },
            //                    {
            //                        type: 'party',
            //                        title: 'Lunch 2',
            //                        start: new Date(y, m, d, 12, 0),
            //                        end: new Date(y, m, d, 14, 0),
            //                        allDay: false
            //                    },
            //                    {
            //                        type: 'party',
            //                        title: 'Click for Google',
            //                        start: new Date(y, m, 28),
            //                        end: new Date(y, m, 29),
            //                        url: 'http://google.com/'
            //                    }
            //        ]
            //            };
            /* alert on eventClick */
            $scope.alertOnEventClick = function (date, jsEvent, view) {
                $scope.alertMessage = (date.title + ' was clicked ');
            };
            /* alert on Drop */
            $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
            };
            /* alert on Resize */
            $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
            };
            /* add and removes an event source of choice */
            $scope.addRemoveEventSource = function (sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function (value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            };
            /* add custom event*/
            $scope.addEvent = function (hotelName) {
                $scope.events.push({
                    title: hotelName,
                    start: new Date(y, m, d, 17, 0),
                    end: new Date(y, m, d, 18, 0),
                    //className: ['openSesame']
                });
            };
            /* remove event */
            $scope.remove = function (index) {
                $scope.events.splice(index, 1);
            };
            /* Change View */
            $scope.changeView = function (view, calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            };
            /* Change View */
            $scope.renderCalender = function (calendar) {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };
            /* Render Tooltip */
            $scope.eventRender = function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };
            /* config object */
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    defaultView: 'agendaDay',
                    header: {
                        left: '',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };





            /* event sources array*/
            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
            $scope.myInterval = 3000;
            $scope.slides = [
                {
                    image: 'http://lorempixel.com/400/200/'
        },
                {
                    image: 'http://lorempixel.com/400/200/food'
        },
                {
                    image: 'http://lorempixel.com/400/200/sports'
        },
                {
                    image: 'http://lorempixel.com/400/200/people'
        }
      ];
                }
                ])
    .controller('ModalController', function ($scope, close) {

        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

    });