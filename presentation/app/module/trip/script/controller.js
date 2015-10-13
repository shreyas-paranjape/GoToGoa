angular.module('trip')
  .controller('TripListController', ['$scope', '$filter', '$stateParams', '$timeout',
    function($scope, $filter, $stateParams, $timeout) {
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

      $scope.gotoEvent = function(event_id) {
        var tabId = Math.floor(event_id / 10);
        $scope.tabs[tabId].active = true;
        $timeout(function() {
          $document.scrollToElement(
            angular.element(document.getElementById(event_id)), 0, 3000);
        }, 1000, false);
      }


  /*    $scope.events = [{
        id: '1',
        title: 'Trek',
        descr: 'Starts early morning at 6 am',
        rating: '3.5',
        location: 'Chorla Ghat',
        url: '../../../images/trek.jpg',
        //                    price: accounting.formatMoney(500, "₹"),
        x: '15.4000',
        y: '74.0200'
      }, {
        id: '2',
        title: 'Miramar Beach',
        descr: 'beach beach beach beach',
        rating: '4',
        location: 'Panjim',
        url: '../../../images/beach.jpg',
        //                    price: accounting.formatMoney(800, "₹"),
        x: '15.482490',
        y: '73.807244'
      }];

      $scope.category = [

      ];

      $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?v=3.20&client=1091949904876-gsunk50dr8urlurrbgctb323e2q5163i.apps.googleusercontent.com";
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
