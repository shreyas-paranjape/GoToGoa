angular.module('hotel')

.controller('HotelsController', ['$scope', '$filter', '$stateParams', function ($scope, $filter, $stateParams, $stateProvider, $urlRouterProvider) {
    //TODO Here we use the data passed from the form to lookup the hotels
    
    $scope.items = $stateParams.data;
    
    $scope.hotels = [
    {"id":1, "name":"Vivanta", "location":"A", "stars":2},
    {"id":2, "name":"Ramada", "location":"B", "stars":3},
    {"id":3, "name":"Novotel", "location":"A", "stars":4},
    {"id":4, "name":"Radisson", "location":"B", "stars":5}
    ];
    
    var orderBy = $filter('orderBy');
    
    $scope.order = function(predicate, reverse) {
      $scope.hotels = orderBy($scope.hotels, predicate, reverse);
    };
    
    
    $scope.locationIncludes = [];
    
    $scope.includeLocation = function(location) {
        var i = $.inArray(location, $scope.locationIncludes);
        if (i > -1) {
            $scope.locationIncludes.splice(i, 1);
        } else {
            $scope.locationIncludes.push(location);
        }
    }
    
    $scope.locationFilter = function(hotels) {
        if ($scope.locationIncludes.length > 0) {
            if ($.inArray(hotels.location, $scope.locationIncludes) < 0)
                return;
        }
        
        return hotels;
    }

}]);


  