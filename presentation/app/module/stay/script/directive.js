//angular.module('trip').directive('eventCard', function() {
//  return {
//    templateUrl: "module/trip/view/event.html",
//    scope: {
//      event: '='
//    }
//  };
//});

angular.module('trip').directive('myDomDirective', function () {
    return {
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.html('yo');

            });
            //            element.bind('mouseenter', function () {
            //                element.css('background-color', 'yellow');
            //            });
            //            element.bind('mouseleave', function () {
            //                element.css('background-color', 'white');
            //            });
        }
    };
});
