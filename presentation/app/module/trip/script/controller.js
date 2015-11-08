angular.module('trip')
    .controller('TripListController', ['$scope', 'Restangular', '$filter', '$stateParams', '$timeout', 'leafletData', '$state', '$uibModal',
    function ($scope, Restangular, $filter, $stateParams, $timeout, leafletData, $state, $uibModal) {
            'use strict';

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


            Restangular
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
    .controller('TripEditController', [
    '$scope', 'Restangular', '$stateParams', '$timeout', '$document', 'leafletData',
    function ($scope, Restangular, $stateParams, $timeout, $document, leafletData) {
            'use strict';

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
            $scope.trips = [];

            // Define resource 
            //defines the url name
            var tripRes = Restangular.all('trips');

            // CALL POST
            tripRes.post({
                "data": "ping"
            });

            // CALL GET
            tripRes.getList().then(function (tripList) {
                angular.forEach(tripList, function (value, key) {
                    $scope.trips.push(value);
                });
            });

            /*$scope.trips = [
                {
                    id: '1',
                    title: 'Trip 1',
                    active: true,
                    descr: 'lorem lorem lorem',
                    days: [{
                            id: 0,
                            title: 'Day 1',
                            active: true,
                            events: [{
                                    title: 'skydiving',
                                    descr: 'sky sky sky',
                                    start_time: '9.30 am',
                                    end_time: '11.30 am'
                        },
                                {
                                    title: 'skydiving2',
                                    descr: 'sky sky sky sky',
                                    start_time: '12.30 pm',
                                    end_time: '2 pm'
                            }]
                    },
                        {
                            id: 10,
                            title: 'Day 2',
                            active: false,
                            events: [{
                                    title: 'skydiving3',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '6.30 pm',
                                    end_time: '8.30 pm'
                                },
                                {
                                    title: 'skydiving4',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '7.30 pm',
                                    end_time: '9 pm'
                            }]
                    },
                        {
                            id: 20,
                            title: 'Day 3',
                            active: false,
                            events: [{
                                    title: 'skydiving5',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '6.30 pm',
                                    end_time: '8.30 pm'
                                },
                                {
                                    title: 'skydiving6',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '7.30 pm',
                                    end_time: '9 pm'
                            }]
                    },
                        {
                            id: 30,
                            title: 'Day 4',
                            active: false,
                            events: [{
                                    title: 'skydiving7',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '6.30 pm',
                                    end_time: '8.30 pm'
                                },
                                {
                                    title: 'skydiving8',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '7.30 pm',
                                    end_time: '9 pm'
                            }]
                    }]
                },
                {
                    id: '2',
                    title: 'Trip 2',
                    active: false,
                    descr: 'lorem lorem lorem',
                    days: [{
                            id: 0,
                            title: 'Day 1',
                            active: false,
                            events: [{
                                    title: 'skydiving',
                                    descr: 'sky sky sky',
                                    start_time: '9.30 am',
                                    end_time: '11.30 am'
                        },
                                {
                                    title: 'skydiving2',
                                    descr: 'sky sky sky sky',
                                    start_time: '12.30 pm',
                                    end_time: '2 pm'
                            }]
                    },
                        {
                            id: 10,
                            title: 'Day 2',
                            active: false,
                            events: [{
                                    title: 'skydiving3',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '6.30 pm',
                                    end_time: '8.30 pm'
                                },
                                {
                                    title: 'skydiving4',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '7.30 pm',
                                    end_time: '9 pm'
                            }]
                    },
                        {
                            id: 20,
                            title: 'Day 3',
                            active: true,
                            events: [{
                                    title: 'skydiving5',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '6.30 pm',
                                    end_time: '8.30 pm'
                                },
                                {
                                    title: 'skydiving6',
                                    descr: 'sky sky sky sky sky',
                                    start_time: '7.30 pm',
                                    end_time: '9 pm'
                            }]
                    }]
                }
            ];*/
            $scope.gotoEvent = function (event_id) {
                var tabId = Math.floor(event_id / 10);
                var day = $scope.trips[days]
                $scope.day[tabId].active = true;
                $timeout(function () {
                    $document.scrollToElement(
                        angular.element(document.getElementById(event_id)), 0, 3000);
                }, 1000, false);
            }


            //            $scope.events = [{
            //                id: '1',
            //                title: 'Trek',
            //                descr: 'Starts early morning at 6 am',
            //                rating: '3.5',
            //                location: 'Chorla Ghat',
            //                url: '../../../images/trek.jpg',
            //                //                    price: accounting.formatMoney(500, "₹"),
            //                x: '15.4000',
            //                y: '74.0200'
            //                }, {
            //                id: '2',
            //                title: 'Miramar Beach',
            //                descr: 'beach beach beach beach',
            //                rating: '4',
            //                location: 'Panjim',
            //                url: '../../../images/beach.jpg',
            //                //                    price: accounting.formatMoney(800, "₹"),
            //                x: '15.482490',
            //                y: '73.807244'
            //                }];
            //
            //            $scope.category = [
            //
            //                ];

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
  ]);
