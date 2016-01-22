angular.module('directives')
    .controller('BudgetCardController', ['$scope', 'Restangular', '$attrs', '$state',
  function ($scope, Restangular, $attrs, $state) {
            this.init = function (element) {};
            $scope.states = ['event', 'category'];
            $scope.currentState = $scope.states[0];
            //        $scope.activity = [];

            $scope.max = 5;
            $scope.isReadonly = true;

            // Define resource 
            //defines the url name
            //        var actiRes = Restangular.all('activities');
            //
            //        // CALL GET
            //        actiRes.getList().then(function (actiList) {
            //            angular.forEach(actiList, function (value, key) {
            //                $scope.activity.push(value);
            //            });
            //        });
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
            $scope.change1 = function () {
                $state.go('app.activity.edit');
                /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
            }
  }
])
    .controller('DateCardController', ['$scope', 'Restangular', '$attrs', '$state',
  function ($scope, Restangular, $attrs, $state) {
            this.init = function (element) {};
            $scope.states = ['event', 'category'];
            $scope.currentState = $scope.states[0];
            //        $scope.activity = [];

            $scope.max = 5;
            $scope.isReadonly = true;

            // Define resource 
            //defines the url name
            //        var actiRes = Restangular.all('activities');
            //
            //        // CALL GET
            //        actiRes.getList().then(function (actiList) {
            //            angular.forEach(actiList, function (value, key) {
            //                $scope.activity.push(value);
            //            });
            //        });
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
            $scope.change1 = function () {
                $state.go('app.activity.edit');
                /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
            }
  }
])
    .controller('PaceCardController', ['$scope', 'Restangular', '$attrs', '$state',
  function ($scope, Restangular, $attrs, $state) {
            this.init = function (element) {};
            $scope.states = ['event', 'category'];
            $scope.currentState = $scope.states[0];
            //        $scope.activity = [];

            $scope.max = 5;
            $scope.isReadonly = true;

            // Define resource 
            //defines the url name
            //        var actiRes = Restangular.all('activities');
            //
            //        // CALL GET
            //        actiRes.getList().then(function (actiList) {
            //            angular.forEach(actiList, function (value, key) {
            //                $scope.activity.push(value);
            //            });
            //        });
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
            $scope.change1 = function () {
                $state.go('app.activity.edit');
                /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
            }
  }
])
    .controller('PplCardController', ['$scope', 'Restangular', '$attrs', '$state',
  function ($scope, Restangular, $attrs, $state) {
            this.init = function (element) {};
            $scope.states = ['event', 'category'];
            $scope.currentState = $scope.states[0];
            //        $scope.activity = [];

            $scope.max = 5;
            $scope.isReadonly = true;

            // Define resource 
            //defines the url name
            //        var actiRes = Restangular.all('activities');
            //
            //        // CALL GET
            //        actiRes.getList().then(function (actiList) {
            //            angular.forEach(actiList, function (value, key) {
            //                $scope.activity.push(value);
            //            });
            //        });
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
            $scope.change1 = function () {
                $state.go('app.activity.edit');
                /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
            }
  }
])
    .controller('CardController', ['$scope', 'Restangular', '$attrs', '$state',
  function ($scope, Restangular, $attrs, $state) {
            this.init = function (element) {};
            $scope.states = ['event', 'category'];
            $scope.isCollapsed = true;
            $scope.currentState = $scope.states[0];
            //        $scope.activity = [];

            $scope.max = 5;
            $scope.isReadonly = true;

            // Define resource 
            //defines the url name
            //        var actiRes = Restangular.all('activities');
            //
            //        // CALL GET
            //        actiRes.getList().then(function (actiList) {
            //            angular.forEach(actiList, function (value, key) {
            //                $scope.activity.push(value);
            //            });
            //        });
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
            $scope.change1 = function () {
                $state.go('app.activity.edit');
                /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
            }
  }
]);
angular.module('directives')
    .directive('budgetcard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/budgetCard.html',
                controller: 'BudgetCardController',
                scope: true,
                link: function (scope, element, attrs, budcardController) {
                    budcardController.init(element);
                }
            }
        })
    .directive('datecard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/dateCard.html',
                controller: 'DateCardController',
                scope: true,
                link: function (scope, element, attrs, datecardController) {
                    datecardController.init(element);
                }
            }
        })
    .directive('pacecard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/paceCard.html',
                controller: 'PaceCardController',
                scope: true,
                link: function (scope, element, attrs, pacecardController) {
                    pacecardController.init(element);
                }
            }
        })
    .directive('pplcard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/pplCard.html',
                controller: 'PplCardController',
                scope: true,
                link: function (scope, element, attrs, pplcardController) {
                    pplcardController.init(element);
                }
            }
        })
    .directive('todocard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/todoCard.html',
                controller: 'CardController',
                scope: true,
                link: function (scope, element, attrs, todocardController) {
                    todocardController.init(element);
                }
            }
        })
    .directive('amenitycard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/amenity.html',
                controller: 'CardController',
                scope: true,
                link: function (scope, element, attrs, todocardController) {
                    todocardController.init(element);
                }
            }
        })
    .directive('ratingcard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/rating.html',
                controller: 'CardController',
                scope: true,
                link: function (scope, element, attrs, todocardController) {
                    todocardController.init(element);
                }
            }
        })
    .directive('locationcard',
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/directive/preferences/layout/location.html',
                controller: 'CardController',
                scope: true,
                link: function (scope, element, attrs, todocardController) {
                    todocardController.init(element);
                }
            }
        });