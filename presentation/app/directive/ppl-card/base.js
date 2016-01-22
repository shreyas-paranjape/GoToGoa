angular.module('directives').controller('PplCardController', ['$scope', 'Restangular', '$attrs', '$state',
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
]);
angular.module('directives').directive('pplcard',
    function () {
        return {
            restrict: 'EA',
            templateUrl: '/directive/ppl-card/layout/pplCard.html',
            controller: 'PplCardController',
            scope: true,
            link: function (scope, element, attrs, pplcardController) {
                pplcardController.init(element);
            }
        }
    });