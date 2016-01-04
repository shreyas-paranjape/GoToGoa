angular.module('activity')
    .controller('ActivityController', ['$scope',
    function ($scope) {
            $scope.pageHeader = "Activity";
        }
  ])
    .controller('ActivityListController', ['$scope', '$filter', '$stateParams', '$timeout', '$log', 'leafletData', '$state',
    function ($scope, $filter, $stateParams, $timeout, $log, leafletData, $state) {
            'use strict';
            $scope.showMap();
            $scope.isCollapsed = true;
            $scope.count = 1;

            $scope.slider = {
                min: 1000,
                max: 18000,
                options: {
                    floor: 0,
                    ceil: 450
                }
            };

            //            $scope.date = new Date();
            //            $scope.calendarOpen = false;
            //            $scope.openCalendar = function (e) {
            //                $scope.calendarOpen = true;
            //            };
            //
            //            $scope.isDisabledDate = function (currentDate, mode) {
            //                return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
            //            };

            /*****datepicker****/
            $scope.dateOptions = {
                showWeeks: true,
                startingDay: 1
            };
            $scope.calendarOpenFrom = false;
            $scope.calendarOpenTo = false;

            $scope.fromDate = new Date();
            $scope.fromDateMin = new Date();

            $scope.toDate = new Date();
            $scope.toDateMin = new Date();
            $scope.toDateMax = new Date();
            $scope.toDate.setDate($scope.fromDate.getDate() + 1);
            $scope.toDateMin.setDate($scope.fromDate.getDate() + 1);
            $scope.toDateMax.setDate($scope.fromDate.getDate() + 90);

            $scope.onFromDateSelect = function (dat) {
                $scope.calendarOpenTo = true;
                $scope.toDate = new Date();
                $scope.toDate.setDate(dat.getDate() + 1);
                $scope.toDateMin = new Date();
                $scope.toDateMin.setDate(dat.getDate() + 1);
            }

            $scope.openCalendarFrom = function (e, date) {
                $scope.calendarOpenFrom = true;
            };
            $scope.openCalendarTo = function (e, date) {
                $scope.calendarOpenTo = true;
            };
            $scope.isDisabledDate = function (currentDate, mode) {
                return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
            };


            /****places*****/
            $scope.places = [];
            $scope.placesdata = [
                {
                    id: 1,
                    label: "Panjim"
                },
                {
                    id: 2,
                    label: "Candolim"
                },
                {
                    id: 3,
                    label: "Mapusa"
                },
                {
                    id: 4,
                    label: "Mapusa"
                },
                {
                    id: 5,
                    label: "Old Goa"
                },
                {
                    id: 6,
                    label: "Ponda"
                },
                {
                    id: 7,
                    label: "Porvorim"
                }
            ];

            $scope.examplesettings7 = {
                smartButtonMaxItems: 3,
                showUncheckAll: false,
                showCheckAll: false,
                enableSearch: true,
                scrollable: true
            };

            /****activities*****/
            $scope.acti = [];
            $scope.actiData = [
                {
                    id: 1,
                    label: "Snorkeling"
                },
                {
                    id: 2,
                    label: "Parasailing"
                },
                {
                    id: 3,
                    label: "Kayaking"
                },
                {
                    id: 4,
                    label: "Scuba Diving"
                },
                {
                    id: 5,
                    label: "Beach Activities"
                }
            ];

            $scope.actisettings = {
                smartButtonMaxItems: 5,
                //                selectionLimit: 1,
                showCheckAll: false,
                scrollable: true
            };

            leafletData.getMap().then(function (map) {
                // L.GeoIP.centerMapOnPosition(map, 15);
            });

            angular.extend($scope, {
                goa: {
                    lat: 15.4989,
                    lng: 73.8278,
                    zoom: 10
                },
                markers: {
                    m1: {
                        lat: 15.399067,
                        lng: 74.013433,
                        focus: false,
                        message: "Ponda ponda",
                        draggable: false
                    }

                },
                defaults: {
                    scrollWheelZoom: false
                },
                paths: {

                }
            });
            $scope.addMarkers = function (location) {
                angular.extend($scope, {
                    markers: {
                        m2: {
                            lat: 15.2736,
                            lng: 73.9581,
                            focus: true,
                            message: "<div ng-controller='ActivityListController' ng-include src=\"'module/activity/view/template.html'\"></div>",
                            draggable: false
                        }
                    }
                });
            };

            //            $scope.openMarker = function () {
            //                console.log("open marker function 1");
            //
            //                $state.go('app.trip.edit');
            //            }



            $scope.addPath = function (pathName, path) {
                angular.extend($scope, {
                    paths: {
                        pathName: path
                    }
                });
            };

            $scope.clearPaths = function () {
                angular.extend($scope, {
                    paths: {}
                });
            };
            $scope.clearMarkers = function () {
                angular.extend($scope, {
                    markers: {}
                });
            };





            $scope.cardMouseEnter = function (i) {
                $scope.clearPaths();
                $scope.clearMarkers();
                //                $scope.addPath("p" + i, {
                //                    color: 'red',
                //                    weight: 3,
                //                    latlngs: [
                //                        {
                //                            lat: 15.4989,
                //                            lng: 73.8278
                //                                            },
                //                        {
                //                            lat: 15.4000,
                //                            lng: 74.0200
                //                                            },
                //                        {
                //                            lat: 15.2736,
                //                            lng: 73.9581
                //                                            }
                //                            ],
                //                    message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>"
                //
                //                });
                $scope.addMarkers({});

            };
            $scope.openMarker = function () {
                console.log("open marker function");
                $state.go('app.trip.edit');
            }
            $scope.cardMouseLeave = function () {

            }
            $scope.activity = [
                {
                    id: '1',
                    title: "Activity 1",
                    "location": "A",
                    rating: 4,
                    actitype: 'Parasailing',
                    price: '10000',
                    noppl: 2,
                    url: '../../../images/travel.jpg'

            },
                {
                    id: '2',
                    title: "Activity 2",
                    "location": "B",
                    rating: 5,
                    actitype: 'Kayaking',
                    price: '20000',
                    noppl: 4,
                    url: '../../../images/travel1.jpg'
            },
                {
                    id: '3',
                    title: "Activity 3",
                    "location": "B",
                    rating: 3,
                    actitype: 'Partying',
                    price: '5000',
                    noppl: 'unlimited',
                    url: '../../../images/travel1.jpg'
            },
                {
                    id: '4',
                    title: "Activity 4",
                    "location": "A",
                    rating: 3.5,
                    actitype: 'Mountain Climbing',
                    price: '3000',
                    noppl: 'unlimited',
                    url: '../../../images/travel1.jpg'
            }
          ];

            /****** sorts and filters****/
            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
                $scope.activity = orderBy($scope.activity, predicate, reverse);
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
            $scope.locationFilter = function (activity) {
                if ($scope.locationIncludes.length > 0) {
                    if ($.inArray(activity.location, $scope.locationIncludes) < 0)
                        return;
                }

                return activity;
            }

            
            $scope.translate = function (value) {
                return '₹' + value;
            }

            $scope.onSliderChange = function () {
                console.log('changed', $scope.priceSlider);
            }



            $scope.maxDate = new Date(2020, 5, 22);

            $scope.status = {
                opened: false
            };
            $scope.open = function () {
                console.log('hiiiiiiii');
                $timeout(function () {
                    $scope.status.opened = true;
                });
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.status = {
                isopen: false
            };

            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };

            //second clanedar
            $scope.status1 = {
                opened: false
            };
            $scope.open1 = function () {
                $timeout(function () {
                    $scope.status1.opened = true;
                });
            };

            $scope.dateOptions1 = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.status1 = {
                isopen: false
            };

            $scope.toggleDropdown = function ($event1) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status1.isopen = !$scope.status1.isopen;
            };

    }
  ])
    .controller('ActivityEditController', ['$scope', 'Restangular', '$stateParams', '$timeout', '$document', 'leafletData',
    function ($scope, Restangular, $stateParams, $timeout, $document, leafletData) {
            'use strict';
            $scope.activity = [];

            // Define resource 
            //defines the url name
            var actiRes = Restangular.all('activities');

            // CALL POST
            actiRes.post({
                "data": "ping"
            });

            // CALL GET
            actiRes.getList().then(function (actiList) {
                angular.forEach(actiList, function (value, key) {
                    $scope.activity.push(value);
                });
            });

            $scope.tabs = [{
                id: 0,
                title: 'Day 1',
                active: true
      }, {
                id: 10,
                title: 'Day 2',
                active: false
      }, {
                id: 20,
                title: 'Day 3',
                active: false
      }];



            $scope.gotoEvent = function (event_id) {
                var tabId = Math.floor(event_id / 10);
                $scope.tabs[tabId].active = true;
                $timeout(function () {
                    $document.scrollToElement(
                        angular.element(document.getElementById(event_id)), 0, 3000);
                }, 1000, false);
            }
            $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?v=3.20&client=1091949904876-gsunk50dr8urlurrbgctb323e2q5163i.apps.googleusercontent.com";
            var marker, map;
            $scope.$on('mapInitialized', function (evt, evtMap) {
                map = evtMap;
                marker = map.markers[0];
            });
            $scope.centerChanged = function (event) {
                $timeout(function () {
                    map.panTo(marker.getPosition());
                }, 3000);
            }
            $scope.click = function (event) {
                    map.setZoom(8);
                    map.setCenter(marker.getPosition());
                }
                //carousel
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [
                {
                    id: '1',
                    title: 'Trek',
                    descr: 'Starts early morning at 6 am',
                    rating: '3.5',
                    location: 'Chorla Ghat',
                    url: '../../../images/b2.jpg',
                    //                    price: accounting.formatMoney(500, "₹"),
                    x: '15.4000',
                    y: '74.0200'
                },
                {
                    id: '2',
                    title: 'Miramar Beach',
                    descr: 'beach beach beach beach',
                    rating: '4',
                    location: 'Panjim',
                    url: '../../../images/b1.jpg',
                    //                    price: accounting.formatMoney(800, "₹"),
                    x: '15.482490',
                    y: '73.807244'
                },
                {
                    id: '3',
                    title: 'cvcv',
                    descr: 'Starts early morning at 6 am',
                    rating: '3.5',
                    location: 'Chorla Ghat',
                    url: '../../../images/trek.jpg',
                    //                    price: accounting.formatMoney(500, "₹"),
                    x: '15.4000',
                    y: '74.0200'
                },
                {
                    id: '4',
                    title: 'vxvcx vcv',
                    descr: 'beach beach beach beach',
                    rating: '4',
                    location: 'Panjim',
                    url: '../../../images/beach.jpg',
                    //                    price: accounting.formatMoney(800, "₹"),
                    x: '15.482490',
                    y: '73.807244'
                }
            ];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;

            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
    }
  ])
    .controller('ActivityDetailController', ['$scope', 'Restangular', '$stateParams', '$timeout', '$document', 'leafletData',
    function ($scope, Restangular, $stateParams, $timeout, $document, leafletData) {
            'use strict';
            //            $scope.hideMap();
            $scope.store = $stateParams.data;
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = this.href.split('#');
                $('.nav a').filter('a[href="#' + target[1] + '"]').tab('show');
            });
            $("#p").click(function () {
                $("#caption").slideToggle("slow");
            });

            $scope.tabs = [false, false, false, false, false];
            $scope.selectTab = function (index) {
                $scope.tabs = [false, false, false, false, false];
                $scope.tabs[index] = true;
            };
    }]);