angular.module('trip')
  .controller('TripListController', ['$scope', '$filter', '$stateParams',
    function($scope, $filter, $stateParams) {
      'use strict';
    }
  ])
  .controller('TripEditController', [
    '$scope', '$stateParams', '$timeout', '$document',
    function($scope, $stateParams, $timeout, $document) {
      'use strict';

      $scope.tabs = [{
        id: 0,
        title: 'Day 1',
        active: false
      }, {
        id: 10,
        title: 'Day 2',
        active: true
      }, {
        id: 20,
        title: 'Day 3',
        active: false
      }];

      $scope.gotoEvent = function(event_id) {
        var tabId = Math.floor(event_id / 10);
        $scope.tabs[tabId].active = true;
        $timeout(function() {
          $document.scrollToElement(
            angular.element(document.getElementById(event_id)), 0, 3000);
        }, 1000, false);
      }
    }
  ]);
