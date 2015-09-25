angular.module('trip').directive('eventCard', function() {
  return {
    templateUrl: "module/trip/view/event.html",
    scope: {
      event: '='
    }
  };
});
