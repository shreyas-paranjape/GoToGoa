/*global angular:false */
angular.module('hotel')
    .controller('HotelDetailController', ['$scope', '$stateParams', function ($scope, $stateParams) {
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
        
    }])
    .controller('HotelListController', ['$scope', '$filter', '$stateParams',
        function ($scope, $filter, $stateParams, $stateProvider, $urlRouterProvider) {
            'use strict';
            //TODO Here we use the data passed from the form to lookup the hotels
            $scope.items = $stateParams.data;
            $scope.isCollapsed = true;
            //console.log($stateParams.data);
            $scope.hotels = [
                {
                    "id": 1,
                    "name": "Vivanta",
                    "location": "A",
                    "stars": 2,
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439968738/h1_hfgowt.jpg",
                    "price": accounting.formatMoney(55000, "₹")

                },
                {
                    "id": 2,
                    "name": "Ramada",
                    "location": "B",
                    "stars": 3,
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969053/h2_fqzsot.jpg",
                    "price": accounting.formatMoney(30000, "₹")
                },
                {
                    "id": 3,
                    "name": "Novotel",
                    "location": "A",
                    "stars": 4,
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969097/h3_aucqi5.jpg",
                    "price": accounting.formatMoney(15000, "₹")
                },
                {
                    "id": 4,
                    "name": "Radisson",
                    "location": "B",
                    "stars": 5,
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439969155/h4_alfvl4.jpg",
                    "price": accounting.formatMoney(25000, "₹")
                },
                {
                    "id": 5,
                    "name": "Alua",
                    "location": "D",
                    "stars": 1,
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1439970234/h5_k3gm8q.jpg",
                    "price": accounting.formatMoney(35000, "₹")
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
]);