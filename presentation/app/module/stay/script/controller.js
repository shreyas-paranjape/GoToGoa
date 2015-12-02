angular.module('stay')
    .controller('StayController', ['$scope', function ($scope) {
        'use strict';
        $scope.pageHeader = "Stay";
  }])
    .controller('StayListController', ['$scope', '$filter', '$stateParams', '$timeout', '$log', 'leafletData', '$state',
    function ($scope, $filter, $stateParams, $timeout, $log, leafletData, $state) {
            'use strict';
            leafletData.getMap().then(function (map) {
                // L.GeoIP.centerMapOnPosition(map, 15);
            });
            $scope.stays = [
                {
                    id: '1',
                    title: "Hotel 1",
                    price: '10000',
                    url: '../../../images/stay.jpg'

            },
                {
                    id: '2',
                    title: "Hotel 2",
                    price: '20000',
                    url: '../../../images/stay1.jpg'
            }
          ];
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
                            message: "<div ng-controller='StayListController' ng-include src=\"'module/stay/view/template.html'\"></div>",
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

            $scope.priceSlider = {
                min: 500,
                max: 15000,
                ceil: 20000,
                floor: 0
            };

            $scope.translate = function (value) {
                return '₹' + value;
            }

            $scope.onSliderChange = function () {
                console.log('changed', $scope.priceSlider);
            }
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

            $scope.adults = [];
            $scope.adultsdata = [{
                id: 1,
                label: "2 adults"
      }, {
                id: 2,
                label: "3 adults"
      }, {
                id: 3,
                label: "4 adults"
      }, {
                id: 4,
                label: "5 adults"
      }];

            $scope.examplesettings1 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1
            };

            $scope.places = [];
            $scope.placesdata = [{
                id: 1,
                label: "Panjim"
      }, {
                id: 2,
                label: "Margao"
      }, {
                id: 3,
                label: "Candolim"
      }, {
                id: 4,
                label: "Mapusa"
      }];

            $scope.examplesettings2 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1
            };

            $scope.amt = [];
            $scope.amtdata = [{
                id: 1,
                label: "Rs.1000-Rs.2000"
      }, {
                id: 2,
                label: "Rs.2000-Rs.5000"
      }, {
                id: 3,
                label: "Rs.5000-Rs.7500"
      }, {
                id: 4,
                label: "Rs.8000-Rs.10000"
      }];

            $scope.examplesettings3 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1
            };
            $scope.companion = [];
            $scope.companiondata = [{
                id: 1,
                label: "Family"
      }, {
                id: 2,
                label: "Friends"
      }, {
                id: 3,
                label: "Colleagues"
      }];

            $scope.examplesettings4 = {
                smartButtonMaxItems: 1,
                selectionLimit: 1
            };
            $scope.amenities = [];
            $scope.amenitiesdata = [{
                id: 1,
                label: "ac"
      }, {
                id: 2,
                label: "wifi"
      }, {
                id: 3,
                label: "beaches"
      }];

            $scope.examplesettings5 = {
                smartButtonMaxItems: 3,
            };

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
    .controller('StayEditController', [
    '$scope', '$stateParams', '$timeout', '$document',
    function ($scope, $stateParams, $timeout, $document) {
            'use strict';

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


            $scope.events = [{
                id: '1',
                title: 'Trek',
                descr: 'Starts early morning at 6 am',
                rating: '3.5',
                location: 'Chorla Ghat',
                url: '../../../images/trek.jpg',
                //                    price: accounting.formatMoney(500, "₹"),
                x: '15.4000',
                y: '74.0200'
      }, {
                id: '2',
                title: 'Miramar Beach',
                descr: 'beach beach beach beach',
                rating: '4',
                location: 'Panjim',
                url: '../../../images/beach.jpg',
                //                    price: accounting.formatMoney(800, "₹"),
                x: '15.482490',
                y: '73.807244'
      }];

            $scope.category = [

      ];
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
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;

            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
    }
  ]);
