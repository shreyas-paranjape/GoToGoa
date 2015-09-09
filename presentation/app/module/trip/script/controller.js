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
    .controller('TripListController', ['$scope', '$filter', '$stateParams', function ($scope, $filter, $stateParams, $stateProvider, $urlRouterProvider, $compile, uiCalendarConfig) {
        'use strict';

        $scope.isCollapsed = true;
        //map
        $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?v=3.20&client=1091949904876-gsunk50dr8urlurrbgctb323e2q5163i.apps.googleusercontent.com";
        $scope.toggleBounce = function () {
            if (this.getAnimation() != null) {
                this.setAnimation(null);
            } else {
                this.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        $scope.years = [
            "2015",
            "2014",
            "2013",
            "2012",
            "2011",
            "2010"
        ];
        $scope.selectYear = []; //current select item

        /*changeYear function will be called if dropdown change*/
        //        $scope.changeYear = function () {
        //            console.log("YearController say... " + $scope.selectYear);
        //        }
        $scope.adults = [
            "2 adults",
            "4 adults",
            "6 adults",
            "7 adults",
            "40 adults"
        ];
        $scope.selectAdults = [];
        $scope.budgets = [

            accounting.formatMoney(25000, "₹", 0),
            accounting.formatMoney(105000, "₹", 0),
            accounting.formatMoney(6000, "₹", 0),
            accounting.formatMoney(35000, "₹", 0)
        ];
        $scope.selectBudgets = [];
        $scope.interests = [
            "activities",
            "relaxation",
            "family time",
            "party",
            "beaches",
            "business"
        ];
        $scope.selectinterests = [];
        $scope.example13model = [];
        $scope.example13data = [
            {
                id: 1,
                label: "activities"
            },
            {
                id: 2,
                label: "relaxation"
            },
            {
                id: 3,
                label: "family time"
            },
            {
                id: 4,
                label: "party"
            },
            {
                id: 5,
                label: "beaches"
            },
            {
                id: 6,
                label: "business"
            }];
        $scope.example13settings = {
            smartButtonMaxItems: 3,
            //            smartButtonTextConverter: function (itemText, originalItem) {
            //                if (itemText === 'Jhon') {
            //                    return 'Jhonny!';
            //                }
            //
            //                return itemText;
            //            }
        };
        $scope.type_trips = [
            "comfortable",
            "adventurous",
            "business",
            "bjhjhv"
        ];
        $scope.selecttype_trips = [];
        $scope.companion = [
            "family",
            "friends",
            "office collegaues"

        ];
        $scope.selectcompanion = [];
        $scope.places = [
            "miramar",
            "margao",
            "arpora",
            "candolim",
            "calangute"

        ];
        $scope.selectplaces = [];
        //datepicker
        //datepicker
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events1 = [
            {
                date: tomorrow,
                status: 'full'
      },
            {
                date: afterTomorrow,
                status: 'partially'
      }
    ];

        $scope.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

        //dropdown
        $scope.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function (open) {
            $log.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.hotels = [
            {
                "id": 1,
                "name": "Trip 1",
                "location": "A",
                "stars": 2,
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439968738/h1_hfgowt.jpg",
                "price": accounting.formatMoney(55000, "₹", 0)

                },
            {
                "id": 2,
                "name": "Trip 2",
                "location": "B",
                "stars": 3,
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969053/h2_fqzsot.jpg",
                "price": accounting.formatMoney(30000, "₹", 0)
                },
            {
                "id": 3,
                "name": "Trip 3",
                "location": "A",
                "stars": 4,
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969097/h3_aucqi5.jpg",
                "price": accounting.formatMoney(15000, "₹", 0)
                },
            {
                "id": 4,
                "name": "Trip 4",
                "location": "B",
                "stars": 5,
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969155/h4_alfvl4.jpg",
                "price": accounting.formatMoney(25000, "₹", 0)
                },
            {
                "id": 5,
                "name": "Trip 5",
                "location": "D",
                "stars": 1,
                "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439970234/h5_k3gm8q.jpg",
                "price": accounting.formatMoney(35000, "₹", 0)
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
                //                $stateParams
                $scope.locationIncludes.push(location);
            }
        }
        $scope.locationFilter = function (hotels) {
            if ($scope.locationIncludes.length > 0) {
                if ($.inArray(hotels.location, $scope.locationIncludes) < 0)
                    return;
            }

            return hotels;
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
                height: 242,
                editable: true,
                header: false,
                //                header: {
                //                    left: '',
                //                    center: 'title',
                //                    right: 'today prev,next'
                //                },
                defaultView: 'agendaDay',
                dayClick: $scope.alertEventOnClick,
                //eventClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

        $scope.rate = 2;
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        //        $scope.ratingStates = [
        //            {
        //                stateOn: 'glyphicon-ok-sign',
        //                stateOff: 'glyphicon-ok-circle'
        //            },
        //            {
        //                stateOn: 'glyphicon-star',
        //                stateOff: 'glyphicon-star-empty'
        //            },
        //            {
        //                stateOn: 'glyphicon-heart',
        //                stateOff: 'glyphicon-ban-circle'
        //            },
        //            {
        //                stateOn: 'glyphicon-heart'
        //            },
        //            {
        //                stateOff: 'glyphicon-off'
        //            }
        //  ];


    }])
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

            }]);
