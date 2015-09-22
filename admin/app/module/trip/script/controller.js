angular.module('trip')

.controller('TripDetailController', ['$scope', '$stateParams', function ($scope, $stateParams) {
        'use strict';
        $scope.store = $stateParams.data;
    }])
    .controller('TripEditController', ['$scope', '$stateParams', '$state',
                                       function ($scope, $stateParams, $state, $compile, uiCalendarConfig) {
            'use strict';

            console.log('params' + $stateParams.data);
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
            //calendar
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            //            $scope.changeTo = 'Hungarian';
            /* event source that pulls from google.com */
            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                //                className: 'gcal-event', // an option!
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
                    //url: 'http://google.com/'
                },
                {
                    title: 'breakfast',
                    start: new Date(y, m, d, 8, 0),
                    end: new Date(y, m, d, 9, 0)


                },
                {
                    title: 'beach',
                    start: new Date(y, m, d, 10, 0),
                    end: new Date(y, m, d, 15, 30)

                },
                {
                    title: 'lunch',
                    start: new Date(y, m, d, 12, 0)
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

            /* alert on eventClick */
            $scope.alertEventOnClick = function (date, jsEvent, view) {
                //            $scope.alertMessage = (date.title + ' was clicked ');
                //$('.week-cal').fullCalendar('changeView', 'agendaDay');
                //$('.week-cal').fullCalendar('gotoDate', date);
                $state.go('trip.customize', {
                    data: date
                });

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
            $scope.addEvent = function () {
                $scope.events.push({
                    title: 'Open Sesame',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    className: ['openSesame']
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
                    //                width: 200,
                    height: 450,
                    editable: true,
                    //                header: {
                    //                    left: 'agendaDay month',
                    //                    center: 'title',
                    //                    right: 'today prev,next'
                    //                },
                    header: false,
                    dayClick: $scope.alertEventOnClick,
                    //eventClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    }])
    .controller('TripActiController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';

        $scope.isCollapsed = true;
        //table
        var today = new Date();
        var nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.gridOptions = {
            enableFiltering: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;

            },
            columnDefs: [
                {
                    field: 'name'
                },
                {
                    field: 'gender',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
                    filter: {
                        term: 1,
                        options: [{
                                id: 1,
                                value: 'male'
                            }, {
                                id: 2,
                                value: 'female'
                            }] // custom attribute that goes with custom directive above 
                    },
                    cellFilter: 'mapGender'
                },
                {
                    field: 'company',
                    enableFiltering: false
                },
                {
                    field: 'email',
                    enableFiltering: false
                },
                {
                    field: 'phone',
                    enableFiltering: false
                },
                {
                    field: 'age',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      },
                {
                    field: 'mixedDate',
                    cellFilter: 'date',
                    width: '15%',
                    enableFiltering: false
                }
    ]
        };
        $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
            .success(function (data) {
                $scope.gridOptions.data = data;
                //                $scope.gridOptions.data[0].age = 5;

                data.forEach(function addDates(row, index) {
                    row.mixedDate = new Date();
                    row.mixedDate.setDate(today.getDate() + (index % 14));
                    row.gender = row.gender === 'male' ? '1' : '2';
                });
            });

        function RowEditCtrl($modalInstance, grid, row) {
            var vm = this;

            vm.schema = {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        title: 'Name'
                    },
                    gender: {
                        type: 'string',
                        title: 'Gender'
                    },
                    company: {
                        type: 'string',
                        title: 'Company'
                    },
                    email: {
                        type: 'string',
                        title: 'Email',
                        "pattern": "^\\S+@\\S+$"
                    },
                    phone: {
                        type: 'string',
                        title: 'Phone'
                    },
                    age: {
                        type: 'number',
                        title: 'Age'
                    }
                }
            };
            vm.entity = angular.copy(row.entity);
            vm.form = [
            'name',
            'gender',
            'company',
            'email',
            'phone',
            'age',
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
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        title: 'Name'
                    },
                    gender: {
                        type: 'string',
                        title: 'Gender'
                    },
                    company: {
                        type: 'string',
                        title: 'Company'
                    },
                    email: {
                        type: 'string',
                        title: 'Email',
                        "pattern": "^\\S+@\\S+$"
                    },
                    phone: {
                        type: 'string',
                        title: 'Phone'
                    },
                    age: {
                        type: 'number',
                        title: 'Age'
                    }
                }
            };
            //vm.entity = angular.copy(grid.entity);
            vm.form = [
            'name',
            'gender',
            'company',
            'email',
            'phone',
            'age',
          ];

            vm.save = save;
            vm.entity = {};



            function save() {
                // Copy row values over
                if (vm.entity.gender === 'male') {
                    vm.entity.gender = '1';
                } else {
                    vm.entity.gender = '2';
                }
                $scope.gridOptions.data.push(vm.entity);
                $modalInstance.close();
            }
        };

        $scope.editRow = function (grid, row) {
            $modal.open({
                templateUrl: 'module/trip/view/edit-modal.html',
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
                templateUrl: 'module/trip/view/edit-modal.html',
                controller: ['$modalInstance', RowAddCtrl],
                controllerAs: 'vm',

            });
        };

        $scope.Delete = function (row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
        };


}])

.filter('mapGender', function () {
    var genderHash = {
        1: 'male',
        2: 'female'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return genderHash[input];
        }
    };
})

.directive('myCustomDropdown', function () {
    return {
        template: '<select class="form-control" ng-model="colFilter.term" ng-options="option.id as option.value for option in colFilter.options"></select>'
    };
})

.controller('myCustomModalCtrl', function ($scope, $compile, $timeout) {
    var $elm;

    $scope.showAgeModal = function () {
        $scope.listOfAges = [];

        $scope.col.grid.appScope.gridOptions.data.forEach(function (row) {
            if ($scope.listOfAges.indexOf(row.age) === -1) {
                $scope.listOfAges.push(row.age);
            }
        });
        $scope.listOfAges.sort();

        $scope.gridOptions = {
            data: [],
            enableColumnMenus: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;

                if ($scope.colFilter && $scope.colFilter.listTerm) {
                    $timeout(function () {
                        $scope.colFilter.listTerm.forEach(function (age) {
                            var entities = $scope.gridOptions.data.filter(function (row) {
                                return row.age === age;
                            });

                            if (entities.length > 0) {
                                $scope.gridApi.selection.selectRow(entities[0]);
                            }
                        });
                    });
                }
            }
        };

        $scope.listOfAges.forEach(function (age) {
            $scope.gridOptions.data.push({
                age: age
            });
        });

        var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Ages</div><div class="modal-body"><div id="grid1" ui-grid="gridOptions" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
        $elm = angular.element(html);
        angular.element(document.body).prepend($elm);

        $compile($elm)($scope);

    };

    $scope.close = function () {
        var ages = $scope.gridApi.selection.getSelectedRows();
        $scope.colFilter.listTerm = [];

        ages.forEach(function (age) {
            $scope.colFilter.listTerm.push(age.age);
        });

        $scope.colFilter.term = $scope.colFilter.listTerm.join(', ');
        $scope.colFilter.condition = new RegExp($scope.colFilter.listTerm.join('|'));

        if ($elm) {
            $elm.remove();
        }
    };
})

.directive('myCustomModal', function () {
        return {
            template: '<label>{{colFilter.term}}</label><button ng-click="showAgeModal()">...</button>',
            controller: 'myCustomModalCtrl'
        };
    })
    //map





.controller('TripCustomController', ['$scope', '$filter', '$stateParams', function ($scope, $filter, $stateParams, uiCalendarConfig) {
        'use strict';
        //$scope.info_date = $stateParams.data;
        $scope.hotels = [
            {
                "id": 1,
                "name": "Mandovi",
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439968738/h1_hfgowt.jpg",
                "price": accounting.formatMoney(3000, "₹", 0)
                },
            {
                "id": 2,
                "name": "Deltin Palms",
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969053/h2_fqzsot.jpg",
                "price": accounting.formatMoney(11000, "₹", 0)
                },
            {
                "id": 3,
                "name": "Cidade Goa",
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969097/h3_aucqi5.jpg",
                "price": accounting.formatMoney(10000, "₹", 0)
                }

        ];
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
            //                className: 'gcal-event', // an option!
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
                //                start: $stateParams.data.add(parseInt(9), 'h'),
                //                end: $stateParams.data.add(parseInt(11), 'h'),
                start: moment()
                    //                end: moment().add(parseInt(1), 'h')
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
                title: 'breakfast',
                start: new Date(y, m, d, 8, 0),
                end: new Date(y, m, d, 9, 0)


                    },
            {
                title: 'beach',
                start: new Date(y, m, d, 10, 0),
                end: new Date(y, m, d, 15, 30)

                    },
            {
                title: 'lunch',
                start: new Date(y, m, d, 12, 0)
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

        /* alert on eventClick */
        $scope.alertEventOnClick = function (date, jsEvent, view) {
            //            $scope.alertMessage = (date.title + ' was clicked ');
            //$('.week-cal').fullCalendar('changeView', 'agendaDay');
            //$('.week-cal').fullCalendar('gotoDate', date);
            $state.go('trip.customize', {
                data: date
            });

        };

        $scope.alertDefaultEventOnClick = function (date, jsEvent, view) {
            //            $scope.alertMessage = (date.title + ' was clicked ');
            //$('.week-cal').fullCalendar('changeView', 'agendaDay');
            //$('.week-cal').fullCalendar('gotoDate', date);
            $scope.addDefaultEvent(date);

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
        $scope.addDefaultEvent = function (date) {
            $scope.events.push({
                title: 'Add Event',
                start: date,
                end: date,
                className: ['openSesame']
            });
        };
        /* add custom event*/
        $scope.addEvent = function (hotelName) {
            $scope.events.push({
                title: hotelName,
                start: new Date(y, m, d, 9, 0),
                end: new Date(y, m, d, 10, 0),
                className: ['openSesame']
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
                //                width: 200,
                height: 600,
                editable: true,
                defaultView: 'agendaDay',
                defaultDate: $stateParams.data,
                header: {
                    left: '',
                    center: 'title',
                    right: 'today prev,next'
                },
                //header: false,
                dayClick: $scope.alertDefaultEventOnClick,

                //eventClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

            }])
    .controller('TripDayController', ['$scope', '$filter', '$stateParams', '$state', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $state, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';

        function RowEditCtrl($modalInstance, grid, row) {
            var vm = this;

            vm.schema = {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        title: 'Name'
                    },
                    desc: {
                        type: 'string',
                        title: 'Description'
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

        function RowAddCtrl($modalInstance) {
            var vm = this;



            vm.save = save;
            vm.entity = {};

            function save() {
                // Copy row values over
                //                row.entity = angular.extend(row.entity, vm.entity);
                $scope.gridOpts.data.push(vm.entity);
                $modalInstance.close();
            }
        };


        $scope.schema = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    title: "Name"
                },
                desc: {
                    type: "string",
                    title: "Description",
                    maxLength: 20
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
                events: {
                    type: "array",
                    //title: "Event Eligibility",
                    items: {
                        type: "object",
                        properties: {
                            acti: {
                                title: "Activity",
                                type: "string"
                            },
                            dest: {
                                title: "Destination",
                                type: "string"
                            },
                            strt: {
                                title: "Start time",
                                type: "string",
                                "format": "timepicker"
                            },
                            end: {
                                title: "End time",
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
                "key": "desc",
                "type": "textarea",
                "placeholder": "Enter the deal description"
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
                        title: "Recurrence rule",
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
                        "htmlClass": "row",
                        "items": [
                            {
                                "key": "events",
                                "timeOptions": {
                                    "minuteStep": 15,
                                    "autoclose": 1
                                },
                                title: "Events",
                                "add": "New",
                                "style": {
                                    "add": "btn-success"
                                }
                            }
                        ]
                    }
                ]
            }
        ];
        $scope.model = {};

        $scope.save = function () {
            // Copy row values over
            //                row.entity = angular.extend(row.entity, vm.entity);
            $scope.gridOpts.data.push($scope.model);
//            close();
        }
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
            //            $modal.open({
            //                templateUrl: 'module/deals/view/edit-modal.html',
            //                controller: ['$modalInstance', RowAddCtrl],
            //                controllerAs: 'vm',
            //
            //            });
            $state.go('trip.day.form');

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
                    name: 'acti'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'strt'
                },
                {
                    name: 'end'
                }
              ],
            data: [
                {
                    "name": "Cox",
                    "desc": "Carney",
                    "recr_freq": "Daily",
                    "at": "12.30 am",
                    "acti": "Skydiving",
                    "dest": "Margao",
                    "strt": "12.00 pm",
                    "end": "5.00 pm"
                  }


                ]
        };
    }])
    .controller('TripDayFormController', ['$scope', '$filter', '$stateParams', '$modal', '$http', 'uiGridConstants', function ($scope, $filter, $stateParams, $modal, $http, uiGridConstants, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';
        $scope.schema = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    title: "Name"
                },
                desc: {
                    type: "string",
                    title: "Description",
                    maxLength: 20
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
                events: {
                    type: "array",
                    //title: "Event Eligibility",
                    items: {
                        type: "object",
                        properties: {
                            acti: {
                                title: "Activity",
                                type: "string"
                            },
                            dest: {
                                title: "Destination",
                                type: "string"
                            },
                            strt: {
                                title: "Start time",
                                type: "string",
                                "format": "timepicker"
                            },
                            end: {
                                title: "End time",
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
                "key": "desc",
                "type": "textarea",
                "placeholder": "Enter the deal description"
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
                        title: "Recurrence rule",
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
                        "htmlClass": "row",
                        "items": [
                            {
                                "key": "events",
                                "timeOptions": {
                                    "minuteStep": 15,
                                    "autoclose": 1
                                },
                                title: "Events",
                                "add": "New",
                                "style": {
                                    "add": "btn-success"
                                }
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
            }]);
