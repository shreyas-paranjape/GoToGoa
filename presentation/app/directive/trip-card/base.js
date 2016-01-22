angular.module('directives').controller('TripCardController', ['$scope', '$filter', 'Restangular', '$attrs', '$state',
  function ($scope, $filter, Restangular, $attrs, $state) {
        this.init = function (element) {};
        $scope.states = ['event', 'category'];
        $scope.currentState = $scope.states[0];

        $scope.trips = [
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
                },
            {
                id: '3',
                title: 'Trip 3',
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
            ];
        var orderBy = $filter('orderBy');
        $scope.order = function (predicate, reverse) {
            $scope.trips = orderBy($scope.trips, predicate, reverse);
        };
        // Define resource 
        //defines the url name
        var tripRes = Restangular.all('trips');

        // CALL GET
        tripRes.getList().then(function (tripList) {
            angular.forEach(tripList, function (value, key) {
                $scope.trips.push(value);
            });
        });
        $scope.change = function () {
            $state.go('app.trip.edit');
            /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
        }
  }
]);
angular.module('directives').directive('tripcard',
    function () {
        return {
            restrict: 'EA',
            templateUrl: '/directive/trip-card/layout/trip-card.html',
            controller: 'TripCardController',
            scope: {},
            link: function (scope, element, attrs, tripcardController) {
                tripcardController.init(element);
            }
        }
    });
