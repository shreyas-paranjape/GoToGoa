angular.module('restaurant')
    .controller('RestaurantController', ['$scope',
    function ($scope) {
            $scope.pageHeader = "Restaurant";
    }
  ])
    .controller('RestaurantListController', ['$scope', '$filter', '$stateParams', '$timeout', '$log', 'leafletData', '$state',
    function ($scope, $filter, $stateParams, $timeout, $log, leafletData, $state) {
            'use strict';
            $scope.showMap();
            $scope.isCollapsed = true;
            $scope.slider = {
                min: 1000,
                max: 18000,
                options: {
                    floor: 0,
                    ceil: 450
                }
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
            $scope.restaurant = [
                {
                    id: '1',
                    title: "Restaurant 1",
                    price: '10,000',
                    rating: 4,
                    url: '../../../images/r1.jpg',
                    cuisine: 'Chinese'

            },
                {
                    id: '2',
                    title: "Restaurant 2",
                    price: '20,000',
                    rating: 3,
                    url: '../../../images/r1.jpg',
                    cuisine: 'Indian'
            },
                {
                    id: '3',
                    title: "Restaurant 3",
                    price: '10,000',
                    rating: 2,
                    url: '../../../images/r1.jpg',
                    cuisine: 'Continental'

            },
                {
                    id: '4',
                    title: "Restaurant 4",
                    price: '20,000',
                    rating: 4,
                    url: '../../../images/r1.jpg',
                    cuisine: 'Goan'
            }
          ];

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

            /****Cuisines**/
            $scope.cuisines = [];
            $scope.cuisinesData = [
                {
                    id: 1,
                    label: "North Indian"
                },
                {
                    id: 2,
                    label: "South Indian"
                },
                {
                    id: 3,
                    label: "Chinese"
                },
                {
                    id: 4,
                    label: "Goan"
                },
                {
                    id: 5,
                    label: "Sea food"
                },
                {
                    id: 6,
                    label: "Continental"
                },
                {
                    id: 7,
                    label: "Street Food"
                }
            ];

            $scope.cuisineSettings = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showCheckAll: false,
                scrollable: true
            };

            /***establishment type**/
            $scope.est = [];
            $scope.estData = [
                {
                    id: 1,
                    label: "Casual Dining"
                },
                {
                    id: 2,
                    label: "Bars"
                },
                {
                    id: 3,
                    label: "Quick Bites"
                },
                {
                    id: 4,
                    label: "Fine Dining"
                },
                {
                    id: 5,
                    label: "Shacks"
                },
                {
                    id: 6,
                    label: "Cafes"
                },
                {
                    id: 7,
                    label: "Pubs"
                }
            ];

            $scope.estSettings = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showCheckAll: false,
                scrollable: true
            };

            /***rating**/
            $scope.rating = [];
            $scope.ratingData = [
                {
                    id: 1,
                    label: "2 star"
                },
                {
                    id: 2,
                    label: "3 star"
                },
                {
                    id: 3,
                    label: "4 & above"
                }
            ];

            $scope.ratingSettings = {
                smartButtonMaxItems: 1,
                selectionLimit: 1,
                showCheckAll: false
            };

            /***amanties**/
            $scope.amenities = [];
            $scope.amenitiesData = [
                {
                    id: 1,
                    label: "Pure veg"
                },
                {
                    id: 2,
                    label: "Credit cards accepted"
                },
                {
                    id: 3,
                    label: "Buffet"
                },
                {
                    id: 4,
                    label: "Happy Hour"
                },
                {
                    id: 5,
                    label: "Alcohol served"
                },
                {
                    id: 6,
                    label: "Alcohol not served"
                }
            ];

            $scope.amenitiesSettings = {
                smartButtonMaxItems: 6,
                showCheckAll: false
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
    .controller('RestaurantEditController', ['$scope', 'Restangular', '$stateParams', '$timeout', '$document', 'leafletData',
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
    .controller('RestaurantDetailController', ['$scope', '$stateParams', function ($scope, $stateParams) {
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
}]);