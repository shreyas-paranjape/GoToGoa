/*global angular:false */
angular.module('itenarary')
    .controller('ItenararyPlannerController', ['$scope',
    function ($scope) {
            'use strict';
    }])
    .controller('ItenararyDetailController', ['$scope',
    function ($scope, $compile, uiCalendarConfig) {
            'use strict';
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


            $scope.details = [
                {
                    "time": "10am",
                    "title": "Miramar",
                    "desr": "miramar ipsum Lorem ipsum",
                    "color": "red",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438753181/goaamigo/beach1.jpg",
                    "detail": [
                        {
                            "title": "jet Ski",
                            "desr": "jet ski jet ski jet ski",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]
               },
                {
                    "time": "12am",
                    "title": "Colva",
                    "desr": "colva Lorem ipsum",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438753323/goaamigo/beach2.jpg",
                    "color": "yellow",
                    "detail": [
                        {
                            "title": "Sailing",
                            "desr": "Sailing Sailing Sailing sailing",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]

               },
                {
                    "time": "12.30pm",
                    "title": "Baga",
                    "desr": "baga ipsum Lorem ipsum",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438754256/goaamigo/beach3.jpg",
                    "color": "green",
                    "detail": [
                        {
                            "title": "Kayaking",
                            "desr": "Kayaking  Kayaking  Kayaking",
                        },
                        {
                            "title": "Scuba-Diving",
                            "desr": "Scuba-Diving Scuba-Diving Scuba-Diving",
                        }
                     ]
               },
                {
                    "time": "1.30 pm",
                    "title": "Agonda",
                    "desr": "agonda ipsum Lorem ipsum",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438754283/goaamigo/beach4.jpg",
                    "color": "blue",
                    "detail": [
                        {
                            "title": "jet Ski",
                            "desr": "jet ski jet ski jet ski",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]
                },
                {
                    "time": "7 pm",
                    "title": "Terekhol",
                    "desr": "terekhol terekhol",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438771022/beach5_lifamv.jpg",
                    "color": "brown",
                    "detail": [
                        {
                            "title": "sea surfing",
                            "desr": "sea surfing sea surfing sea surfing",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]
                }
        ];
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
                    height: 450,
                    editable: true,
                    header: {
                        left: 'agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];



            /* event sources array*/


    }]);
