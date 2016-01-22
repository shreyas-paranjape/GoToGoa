angular.module('trip')
    .controller('TripListController', ['$scope', 'Restangular', '$filter', '$stateParams', '$timeout', 'leafletData', '$state', '$uibModal',
    function ($scope, Restangular, $filter, $stateParams, $timeout, leafletData, $state, $uibModal) {
            'use strict';

            $scope.hideMap();
            $scope.slider = {
                min: 1000,
                max: 18000,
                options: {
                    floor: 0,
                    ceil: 450
                }
            };
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
                            focus: false,
                            message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>",
                            draggable: false
                        },
                        m3: {
                            lat: 15.399067,
                            lng: 74.013433,
                            focus: true,
                            message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>",
                            draggable: false
                        }
                    }
                });
            };

            $scope.open = function () {
                $state.go('app.trip.edit');
            }


            //            Restangular
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
                $scope.addPath("p" + i, {
                    color: 'red',
                    weight: 4,
                    message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>",
                    latlngs: [
                        {
                            lat: 15.4989,
                            lng: 73.8278
                        },
                        {
                            lat: 15.4000,
                            lng: 74.0200
                        },
                        {
                            lat: 15.2736,
                            lng: 73.9581
                        }
                    ]

                });
                $scope.addMarkers({});

            };
            $scope.open = function () {
                $state.go('app.trip.edit');
            }
            $scope.cardMouseLeave = function () {

            }


            $scope.translate = function (value) {
                return '₹' + value;
            }

            $scope.onSliderChange = function () {
                console.log('changed', $scope.priceSlider);
            }
            $scope.dirty = {};

            var states = ['Alabama', 'Alaska', 'California', /* ... */ ];

            function suggest_state(term) {
                var q = term.toLowerCase().trim();
                var results = [];

                // Find first 10 states that start with `term`.
                for (var i = 0; i < states.length && results.length < 10; i++) {
                    var state = states[i];
                    if (state.toLowerCase().indexOf(q) === 0)
                        results.push({
                            label: state,
                            value: state
                        });
                }

                return results;
            }

            $scope.autocomplete_options = {
                suggest: suggest_state
            };
            $scope.examplemodel = [];
            $scope.exampledata = [{
                id: 1,
                label: "David"
      }, {
                id: 2,
                label: "Jhon"
      }, {
                id: 3,
                label: "Lisa"
      }, {
                id: 4,
                label: "Nicole"
      }, {
                id: 5,
                label: "Danny"
      }];

            $scope.examplesettings = {
                smartButtonMaxItems: 5,
                //                smartButtonTextConverter: function (itemText, originalItem) {
                //                    if (itemText === 'Jhon') {
                //                        return 'Jhonny!';
                //                    }
                //
                //                    return itemText;
                //                }
            };

            /******no of adults****/
            $scope.adults = [];
            $scope.adultsdata = [
                {
                    id: 1,
                    label: "2"
                },
                {
                    id: 2,
                    label: "3"
                },
                {
                    id: 3,
                    label: "4"
                },
                {
                    id: 4,
                    label: "5"
                },
                {
                    id: 5,
                    label: "7"
                }
            ];

            $scope.examplesettings1 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showUncheckAll: false
            };
            $scope.adultsacustomTexts = {
                buttonDefaultText: 'No of people'
            };

            /******budget*****/
            $scope.budget = [];
            $scope.budgetdata = [
                {
                    id: 1,
                    label: "₹5,000 - ₹10,000"
                },
                {
                    id: 2,
                    label: "₹10,000 - ₹15,0000"
                },
                {
                    id: 3,
                    label: "₹15,000 - ₹20,0000"
                },
                {
                    id: 4,
                    label: "₹20,000 - ₹25,0000"
                }
            ];

            $scope.examplesettings3 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showCheckAll: false,
                showUncheckAll: false
            };

            /******pace*****/
            $scope.pace = [];
            $scope.pacedata = [
                {
                    id: 1,
                    label: "Fast"
                },
                {
                    id: 2,
                    label: "Relaxed"
                }
            ];

            $scope.examplesettings8 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showCheckAll: false,
                showUncheckAll: false
            };

            /*****interest******/
            $scope.interests = [];
            $scope.interestdata = [
                {
                    id: 1,
                    label: "Skydiving"
                },
                {
                    id: 2,
                    label: "Temple/church visits"
                },
                {
                    id: 3,
                    label: "Beach"
                },
                {
                    id: 4,
                    label: "Yoga"
                }
            ];

            $scope.examplesettings4 = {
                smartButtonMaxItems: 4,
                scrollable: true
            };
            $scope.visitcustomTexts = {
                buttonDefaultText: 'Do'
            };

        //visit
            $scope.visits = [];
            $scope.visitsdata = [
                {
                    id: 1,
                    label: "Miramar"
                },
                {
                    id: 2,
                    label: "Candolim"
                },
                {
                    id: 3,
                    label: "Colva"
                },
                {
                    id: 4,
                    label: "Baga"
                }
            ];

            $scope.examplesettings9 = {
                smartButtonMaxItems: 4,
                scrollable: true
            };
            $scope.customTexts = {
                buttonDefaultText: 'Visit'
            };
        
            /*****type of trip******/
            $scope.type_trip = [];
            $scope.triptypedata = [
                {
                    id: 1,
                    label: "Comfortable trip"
                },
                {
                    id: 2,
                    label: "Spiritual trip"
                },
                {
                    id: 3,
                    label: "Romantic trip"
                }
            ];
            $scope.examplesettings5 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showUncheckAll: false
            };
            $scope.tripcustomTexts = {
                buttonDefaultText: 'Type of trip'
            };

            /******companions***/
            $scope.companion = [];
            $scope.companiondata = [
                {
                    id: 1,
                    label: "Family"
                },
                {
                    id: 2,
                    label: "Friends"
                },
                {
                    id: 3,
                    label: "Colleagues"
                }
            ];

            $scope.examplesettings6 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showUncheckAll: false
            };
            $scope.companioncustomTexts = {
                buttonDefaultText: 'Type'
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
            $scope.placescustomTexts = {
                buttonDefaultText: 'Stay'
            };

            //            var date = new Date();

            $scope.dt = new Date();


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
            //            $scope.disabled = function (date, mode) {
            //                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 3));
            //            };
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: 'false'
            };

            $scope.formats = ['dd-MMMM-yyyy'];
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
                startingDay: 1,
                showWeeks: 'false'
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

            $scope.trips = [];

            // Define resource 
            //defines the url name
            var tripRes = Restangular.all('trips');

            // CALL GET
            tripRes.getList().then(function (tripList) {
                angular.forEach(tripList, function (value, key) {
                    $scope.trips.push(value);
                });
            });

            //modal
            //            $scope.animationsEnabled = true;
            //
            //            $scope.open = function () {
            //
            //                var modalInstance = $uibModal.open({
            //                    animation: $scope.animationsEnabled,
            //                    templateUrl: 'myModalContent.html',
            //                    controller: 'ModalInstanceCtrl'
            //                });
            //            };
            //
            //            $scope.toggleAnimation = function () {
            //                $scope.animationsEnabled = !$scope.animationsEnabled;
            //            };

                }
                ])
    .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('TripEditController', ['$scope', 'Restangular', '$stateParams', '$timeout', '$document', 'leafletData',
    function ($scope, Restangular, $stateParams, $timeout, $document, leafletData) {
            'use strict';
            //            $scope.events[{
            //                    id: 1,
            //                    title: "Hotel A",
            //                    desc: "xyz xyz xyz"
            //                }, {
            //                    id: 2,
            //                    title: "Non-geared vehicle",
            //                    desc: "deo, activa, pleasure"
            //                }, {
            //                    id: 3,
            //                    title: "Ritz restaurant",
            //                    desc: "xyz xyz xyz"
            //                }, {
            //                    id: 4,
            //                    title: "parasailing",
            //                    desc: "xyz xyz xyz"
            //                }, {
            //                    id: 5,
            //                    title: "Bullet",
            //                    desc: "12346468844"
            //                }, {
            //                    id: 6,
            //                    title: "Hotel B",
            //                    desc: "xyz xyz xyz"
            //                }, {
            //                    id: 7,
            //                    title: "Trekking",
            //                    desc: "abc abc abc abc"
            //                }, {
            //                    id: 8,
            //                    title: "Peep Kitchen",
            //                    desc: "xyz xyz xyz"
            //                }
            //
            //                ];
            $scope.cardMouseOver = function () {
                    $scope.addPath();
                }
                //            $scope.tabs = [{
                //                id: 0,
                //                title: 'Day 1',
                //                active: true
                //      }, {
                //                id: 10,
                //                title: 'Day 2',
                //                active: false
                //      }, {
                //                id: 20,
                //                title: 'Day 3',
                //                active: false
                //      }];
                //            $scope.trips = [];
                //
                //            // Define resource 
                //            //defines the url name
                //            var tripRes = Restangular.all('trips');
                //
                //            // CALL POST
                //            tripRes.post({
                //                "data": "ping"
                //            });
                //
                //            // CALL GET
                //            tripRes.getList().then(function (tripList) {
                //                angular.forEach(tripList, function (value, key) {
                //                    $scope.trips.push(value);
                //                });
                //            });
                //
                //            /*;*/
                //            $scope.gotoEvent = function (event_id) {
                //                var tabId = Math.floor(event_id / 10);
                //                var day = $scope.trips[days]
                //                $scope.day[tabId].active = true;
                //                $timeout(function () {
                //                    $document.scrollToElement(
                //                        angular.element(document.getElementById(event_id)), 0, 3000);
                //                }, 1000, false);
                //            }



            $scope.events = [
                {
                    id: 1,
                    type: "Stay",
                    title: "Hotel A",
                    desc: "xyz xyz xyz"
                    },
                {
                    id: 2,
                    type: "Travel",
                    title: "Non-geared vehicle",
                    desc: "deo, activa, pleasure"
                    },
                {
                    id: 3,
                    type: "Food",
                    title: "Ritz restaurant",
                    desc: "xyz xyz xyz"
                       },
                {
                    id: 4,
                    type: "Activity",
                    title: "parasailing",
                    desc: "xyz xyz xyz"
                           },
                {
                    id: 5,
                    type: "Travel",
                    title: "Bullet",
                    desc: "12346468844"
                        },
                {
                    id: 6,
                    type: "Stay",
                    title: "Hotel B",
                    desc: "xyz xyz xyz"
                            },
                {
                    id: 7,
                    type: "Activity",
                    title: "Trekking",
                    desc: "abc abc abc abc"
                            },
                {
                    id: 8,
                    type: "Food",
                    title: "Peep Kitchen",
                    desc: "xyz xyz xyz"
                            }
            ];
            $scope.days = [
                {
                    id: 1,
                    title: 'Day 1',
                    lati: 15.2736,
                    longi: 73.9581,
                    mapTitle: "Margao",
                    stay: "Hotel Taj",
                    travel: "Thar",
                    acti: [
                        {
                            title: "XYZ",
                            subdesc: "DAy 1",
                            descr: "lorem porem lorem",
                            url: "../../../images/b1.jpg"
                        },
                        {
                            title: "AbC",
                            subdesc: "DAy 1",
                            descr: "lorem porem lorem",
                            url: "http://placehold.it/427x350"
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Day 2',
                    lati: 15.60,
                    longi: 73.95,
                    mapTitle: "bicholim",
                    stay: "Hotel Mandovi",
                    travel: "Car",
                    acti: [
                        {
                            title: "PQR",
                            subdesc: "DAy 2",
                            descr: "lorem porem lorem",
                            url: "../../../images/b2.jpg"
                        },
                        {
                            title: "HIJ",
                            subdesc: "DAy 2",
                            descr: "lorem porem lorem",
                            url: "http://placehold.it/427x350"
                        }
                    ]
                }
            ];
            $scope.typeIncludes = [];
            $scope.includeType = function (type) {
                var i = $.inArray(type, $scope.typeIncludes);
                if (i > -1) {
                    $scope.typeIncludes.splice(i, 1);
                } else {
                    $stateParams
                    $scope.typeIncludes.push(type);
                }
            }
            $scope.typeFilter = function (events) {
                if ($scope.typeIncludes.length > 0) {
                    if ($.inArray(events.type, $scope.typeIncludes) < 0)
                        return;
                }

                return events;
            }
            $scope.addToEvent = function (Id) {
                    $scope.try = $scope.days.filter(function (pane) {
                        return pane.active;
                    })[0];
                    console.log($scope.try);
                    if (Id == 0) {
                        $scope.try1 = $scope.events[Id];
                        //                        console.log($scope.try1);
                        //                        $scope.try.acti.push(try1);
                        //                        $scope.newTry2 = $scope.try.acti.splice(1, 0, $scope.try1);
                        //                        console.log("New result TRy2", +$scope.newTry2);
                    } else {
                        $scope.new = Id - 1;
                        $scope.try1 = $scope.events[$scope.new];
                    }
                    console.log($scope.try1);
                    $scope.try.acti.push($scope.try1);
                    //                 $scope.newTry2 = $scope.try.acti.splice(1,0,$scope.try1);
                    console.log("result Try", +$scope.try);

                    //                    if (Id == 0) {
                    //                        $scope.try1 = $scope.events[Id];
                    //                        console.log($scope.try1);
                    ////                        $scope.try.acti.push(try1);
                    //                        $scope.newTry2 = $scope.try.acti.splice(1,0,$scope.try1);
                    //                        console.log("New result TRy2", +$scope.newTry2);
                    //                    } else {
                    //                        $scope.new = Id - 1;
                    //                        $scope.try1 = $scope.events[$scope.new];
                    //                    }
                    //                    console.log($scope.try1);

                }
                /* $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?v=3.20&client=1091949904876-gsunk50dr8urlurrbgctb323e2q5163i.apps.googleusercontent.com";
                  var marker, map;
                  $scope.$on('mapInitialized', function(evt, evtMap) {
                    map = evtMap;
                    marker = map.markers[0];
                  });
                  $scope.centerChanged = function(event) {
                    $timeout(function() {
                      map.panTo(marker.getPosition());
                    }, 3000);
                  }
                  $scope.click = function(event) {
                      map.setZoom(8);
                      map.setCenter(marker.getPosition());
                    }
                    //carousel
                  $scope.myInterval = 5000;
                  $scope.noWrapSlides = false;
                  var slides = $scope.slides = [{
                    id: '1',
                    title: 'Trek',
                    descr: 'Starts early morning at 6 am',
                    rating: '3.5',
                    location: 'Chorla Ghat',
                    url: '../../../images/b2.jpg',
                    //                    price: accounting.formatMoney(500, "₹"),
                    x: '15.4000',
                    y: '74.0200'
                  }, {
                    id: '2',
                    title: 'Miramar Beach',
                    descr: 'beach beach beach beach',
                    rating: '4',
                    location: 'Panjim',
                    url: '../../../images/b1.jpg',
                    //                    price: accounting.formatMoney(800, "₹"),
                    x: '15.482490',
                    y: '73.807244'
                  }, {
                    id: '3',
                    title: 'cvcv',
                    descr: 'Starts early morning at 6 am',
                    rating: '3.5',
                    location: 'Chorla Ghat',
                    url: '../../../images/trek.jpg',
                    //                    price: accounting.formatMoney(500, "₹"),
                    x: '15.4000',
                    y: '74.0200'
                  }, {
                    id: '4',
                    title: 'vxvcx vcv',
                    descr: 'beach beach beach beach',
                    rating: '4',
                    location: 'Panjim',
                    url: '../../../images/beach.jpg',
                    //                    price: accounting.formatMoney(800, "₹"),
                    x: '15.482490',
                    y: '73.807244'
                  }];
                  $scope.addSlide = function() {
                    var newWidth = 600 + slides.length + 1;

                  };
                  for (var i = 0; i < 4; i++) {
                    $scope.addSlide();
                  }*/
    }
  ])
    .controller('TripDetailController', ['$scope', 'Restangular', '$filter', '$stateParams', '$timeout', 'leafletData', '$state', '$uibModal',
    function ($scope, Restangular, $filter, $stateParams, $timeout, leafletData, $state, $uibModal) {
            'use strict';
            leafletData.getMap().then(function (map) {
                // L.GeoIP.centerMapOnPosition(map, 15);
            });

            $scope.tabs = [
                {
                    title: 'Dynamic Title 1',
                    content: 'Dynamic content 1'
                },
                {
                    title: 'Dynamic Title 2',
                    content: 'Dynamic content 2',
                    disabled: true
                }
  ];

            $scope.alertMe = function () {
                setTimeout(function () {
                    $window.alert('You\'ve selected the alert tab!');
                });
            };

            angular.extend($scope, {
                days: {
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
                    },
                    m2: {
                        lat: 15.4989,
                        lng: 73.8278,
                        focus: false,
                        message: "Panaji",
                        draggable: false
                    }

                },
                defaults: {
                    scrollWheelZoom: false
                },
                paths: {

                }
            });

            $scope.clearMarkers = function () {
                angular.extend($scope, {
                    markers: {}
                });
            };
            $scope.days = [
                {
                    id: 1,
                    title: 'Day 1',
                    lati: 15.2736,
                    longi: 73.9581,
                    mapTitle: "Margao",
                    stay: "Hotel Taj",
                    travel: "Thar",
                    acti: [
                        {
                            title: "XYZ",
                            subdesc: "DAy 1",
                            descr: "lorem porem lorem",
                            url: "../../../images/b1.jpg"
                        },
                        {
                            title: "AbC",
                            subdesc: "DAy 1",
                            descr: "lorem porem lorem",
                            url: "http://placehold.it/427x350"
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Day 2',
                    lati: 15.60,
                    longi: 73.95,
                    mapTitle: "bicholim",
                    stay: "Hotel Mandovi",
                    travel: "Car",
                    acti: [
                        {
                            title: "PQR",
                            subdesc: "DAy 2",
                            descr: "lorem porem lorem",
                            url: "../../../images/b2.jpg"
                        },
                        {
                            title: "HIJ",
                            subdesc: "DAy 2",
                            descr: "lorem porem lorem",
                            url: "http://placehold.it/427x350"
                        }
                    ]
                }
            ];
            $scope.try = $scope.days[0];
            $scope.active = function () {
                $scope.try = $scope.days.filter(function (pane) {
                    return pane.active;
                })[0];
                //                return $scope.days.filter(function (pane) {
                //                    return pane.active;
                //                })[0];
                console.log($scope.try);
            };


            //            $scope.selectDay = function (Dayid) {
            ////                var i;
            //            $scope.selected = [];
            //                
            //            for (Dayid = $scope; Dayid < $scope.days[1].id; i++) {
            //                $scope.selected = $scope.days[i].acti[0];
            //                console.log($scope.selected);
            //            }
            //                $scope.id = $scope.Dayid;
            //                console.log($scope.id);
            //            }
            $scope.addMarkers = function () {
                angular.extend($scope, {
                    markers: {
                        m2: {
                            lat: $scope.days[0].lati,
                            lng: $scope.days[0].longi,
                            focus: true,
                            message: $scope.days[0].mapTitle,
                            //                            message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>",
                            draggable: false
                        }
                    }
                });
            };
            $scope.addMarkers2 = function () {
                angular.extend($scope, {
                    markers: {
                        m2: {
                            lat: $scope.days[1].lati,
                            lng: $scope.days[1].longi,
                            focus: true,
                            message: $scope.days[1].mapTitle,
                            //                            message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>",
                            draggable: false
                        }
                    }
                });
            };


            $scope.cardMouseEnter1 = function (i) {
                //                $scope.clearPaths();
                //                $scope.clearMarkers();
                $scope.addPath("p" + i, {
                    color: 'red',
                    weight: 4,
                    message: "<div ng-controller='TripListController' ng-include src=\"'module/trip/view/template.html'\"></div>",
                    latlngs: [
                        {
                            lat: 15.4989,
                            lng: 73.8278
                        },
                        {
                            lat: 15.4000,
                            lng: 74.0200
                        },
                        {
                            lat: 15.2736,
                            lng: 73.9581
                        }
                    ]

                });
                $scope.addMarkers({});

            };


    }]);