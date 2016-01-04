angular.module('directives').directive("addbuttonsbutton", function(){
	return {
		restrict: "E",
		template: "<button type=\"button\" class=\"btn btn-default\"addbuttons><span class=\"glyphicon glyphicon-plus\"></span>Add More Rooms</button>"
	}
});

angular.module('directives').controller('ButtonController', ['$scope', '$attrs', '$state',
  function ($scope, $attrs, $state) {
        this.init = function (element) {};
        $scope.states = ['event', 'category'];
        $scope.currentState = $scope.states[0];
        $scope.change = function () {
            $state.go('app.activity.edit');
            /*if ($scope.currentState == $scope.states[1]) {
        $scope.currentState = $scope.states[0];
      } else {
        $scope.currentState = $scope.states[1];
      }*/
        }
  }
]);
angular.module('directives').directive("addbuttons", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			scope.count++;
			angular.element(document.getElementById('space-for-buttons'))
//                .append($compile('<div class="address"><div class="input-reg rb-item input-group"><span class="input-group-addon">Address </span><input type="text" class="form-control" placeholder="Insert text here"></div><div align="center"><iframe class="map-img" width="100%" height="100" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?hl=en&amp;ie=UTF8&amp;ll=37.0625,-95.677068&amp;spn=56.506174,79.013672&amp;t=m&amp;z=4&amp;output=embed"></iframe></div></div>')(scope));
                  .append($compile('<div class="row" style="padding-top:5px;"><div class="col-md-4"></div><div class="col-md-4 no-padding"><label>Adults:</label><div><div fs-counter value="1" data-min="0" data-max="10" data-step="1" data-addclass="col-xs-4" data-width="130px" data-editable></div></div></div><div class="col-md-4"><label>Child:</label><div ><div fs-counter value="1" data-min="0" data-max="10" data-step="1" data-addclass="col-xs-4" data-width="130px" data-editable></div></div></div></div>')(scope));
		});
	};
});

angular.module('directives').directive("alert", function(){
	return function(scope, element, attrs){
		element.bind("click", function(){
			console.log(attrs);
			alert("This is alert #"+attrs.alert);
		});
	};
});