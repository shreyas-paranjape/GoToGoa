angular.module('directives').controller('TaxiCardController', ['$scope', '$attrs', '$state',
  function ($scope, $attrs, $state) {
        this.init = function (element) {};
        $scope.states = ['event', 'category'];
        $scope.currentState = $scope.states[0];


        $scope.myInterval = 0;
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
        $scope.change = function () {
            $state.go('app.taxi.detail');
            /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
        }
  }
]);
angular.module('directives').directive('taxicard',
    function () {
        return {
            restrict: 'EA',
            templateUrl: '/directive/taxi-card/layout/taxi-card.html',
            controller: 'TaxiCardController',
            scope: true,
            link: function (scope, element, attrs, cardController) {
                cardController.init(element);
            }
        }
    });
