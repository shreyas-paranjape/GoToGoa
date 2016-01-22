angular.module('app')
    .controller('AppListController', ['$scope', '$filter', '$stateParams', '$timeout', 'leafletData',
    function ($scope, $filter, $stateParams, $timeout, leafletData) {
            'use strict';

            $scope.mapVisible = true;

            $scope.hideMap = function () {
                $scope.mapVisible = false;
            }

            $scope.showMap = function () {
                $scope.mapVisible = true;
            }

            leafletData.getMap().then(function (map) {
                // L.GeoIP.centerMapOnPosition(map, 15);
            });

            angular.extend($scope, {
                goa: {
                    lat: 15.4989,
                    lng: 73.8278,
                    zoom: 11
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
                paths: {

                },
                defaults: {
                    scrollWheelZoom: false
                }
            });
            $scope.addMarkers = function (location) {
                angular.extend($scope, {
                    markers: {
                        m2: {
                            lat: 15.2736,
                            lng: 73.9581,
                            focus: true,
                            message: "<div ng-controller='AppListController' ng-include src=\"'module/app/view/template.html'\"></div>",
                            draggable: false
                        }
                    }
                });
            };

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

            //            $scope.cardMouseOver = function () {
            //                $scope.addMarkers({
            //                    m2: {
            //                        lat: 15.282517,
            //                        lng: 73.993368,
            //                        focus: false,
            //                        message: "Margao",
            //                        draggable: false
            //                    }
            //                });
            //            };
            //            $scope.addPath = function () {
            //                angular.extend($scope, {
            //                    paths: {
            //                        p1: {
            //                            color: '#000000',
            //                            weight: 8,
            //                            latlngs: [
            //                                {
            //                                    lat: 15.4989,
            //                                    lng: 73.8278
            //                                },
            //                                {
            //                                    lat: 15.4000,
            //                                    lng: 74.0200
            //                                },
            //                                {
            //                                    lat: 15.2736,
            //                                    lng: 73.9581
            //                                }
            //                ],
            //                        }
            //                    },
            //                    markers: {
            //                        panaji: {
            //                            lat: 15.4989,
            //                            lng: 73.8278,
            //                            icon: {
            //                                iconUrl: '../../../../images/tajmahal100.png',
            //                                iconSize: [80, 80],
            //                                iconAnchor: [40, 80],
            //                                popupAnchor: [0, 0],
            //                                shadowSize: [0, 0],
            //                                shadowAnchor: [0, 0]
            //                            }
            //                        },
            //                        ponda: {
            //                            lat: 15.4000,
            //                            lng: 74.0200,
            //                            icon: {
            //                                iconUrl: '../../images/tajmahal100.png',
            //                                iconSize: [80, 80],
            //                                iconAnchor: [40, 80],
            //                                popupAnchor: [0, 0],
            //                                shadowSize: [0, 0],
            //                                shadowAnchor: [0, 0]
            //                            }
            //                        },
            //                        margao: {
            //                            lat: 15.2736,
            //                            lng: 73.9581,
            //                            icon: {
            //                                iconUrl: '../../images/tajmahal100.png',
            //                                iconSize: [60, 60],
            //                                iconAnchor: [30, 60],
            //                                popupAnchor: [0, 0],
            //                                shadowSize: [0, 0],
            //                                shadowAnchor: [0, 0]
            //                            }
            //                        }
            //                    }
            //                });
            //            };
            $scope.act_items = [
        'Dine & Wine',
        'Sports',
        'Visit a Destination'
      ];
            $scope.stay_items = [
        'Hotel',
        'HomeStay',
        'Other'
      ];
            $scope.travel_items = [
        'Book a Taxi',
        'Rent a Car',
        'Rent a Bike'
      ];
            $scope.status = {
                isopen: false
            };
            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };

            //modal
            $scope.animationsEnabled = true;

            /*$scope.open = function () {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl'
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };*/
    }
  ])
    .controller('AppLoginController', ['$scope', '$filter', '$stateParams', '$timeout', 'leafletData',
    function ($scope, $filter, $stateParams, $timeout, leafletData) {
            'use strict';
            $scope.hideMap();

    }])
    .controller('AppSignupController', ['$scope', '$filter', '$stateParams', '$timeout', 'leafletData',
    function ($scope, $filter, $stateParams, $timeout, leafletData) {
            'use strict';
            $scope.hideMap();

    }]);
/*.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);*/