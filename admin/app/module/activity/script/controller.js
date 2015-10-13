angular.module('activity')
.controller('ActivityListController',['$scope', '$log', '$state', '$stateParams', 'activityRepository', 'activityGridColumnDef',
function($scope, $log, $state, $stateParams, activityRepository, activityGridColumnDef){
  $scope.gridOpts= {
    columnDefs: activityGridColumnDef,
    data: activityRepository.get()
  }

  $scope.edit = function(row){
    $state.go('activity.edit', {"data": row})
  }

  $scope.delete = function(row){
    activityRepository.delete(row);
  }

  $scope.add = function(){
    $state.go('activity.add');
  }
}
])
.controller("ActivityAddController", [
  '$scope', '$log', '$state', '$stateParams', 'activityRepository', 'activitySchema', 'activityForm',
  function($scope, $log, $state, $stateParams, activityRepository, activitySchema, activityForm){
    $scope.schema = activitySchema;
    $scope.form = activityForm;
    $scope.entity = {};
    $scope.save = function() {
      activityRepository.add($scope.entity);
      $state.go('activity.list');
    };
  }
]).controller('ActivityEditController', [
  '$scope', '$log', '$state', '$stateParams', 'activityRepository', 'activitySchema', 'activityForm',
  function($scope, $log, $state, $stateParams, activityRepository, activitySchema, activityForm) {
    $scope.schema = activitySchema;
    $scope.form = activityForm;
    $scope.entity = $stateParams.data;
    $scope.save = function() {
      activityRepository.edit($scope.entity);
      $state.go('activity.list');
    };
  }
]);
