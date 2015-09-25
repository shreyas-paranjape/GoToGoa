angular.module('deals')
  .controller('DealListController', [
    '$scope', '$log', '$state', '$stateParams', 'dealRepository', 'gridColumnDef',
    function($scope, $log, $state, $stateParams, dealRepository, gridColumnDef) {
      $scope.gridOpts = {
        columnDefs: gridColumnDef,
        data: dealRepository.get()
      }
      $scope.edit = function(row){
        $state.go('deals.edit',{"data":row});
      }
      $scope.delete = function(row){
        dealRepository.delete(row);
      }
    }
  ])
  .controller('DealAddController', [
    '$scope', '$log', '$state', '$stateParams', 'dealRepository', 'dealSchema', 'dealForm',
    function($scope, $log, $state, $stateParams, dealRepository, dealSchema, dealForm) {
      $scope.schema = dealSchema;
      $scope.form = dealForm;
      $log.log($stateParams.data);
      $scope.entity = {};
      $scope.save = function() {
        dealRepository.add($scope.entity);
        $state.go('deals.list');
      };
    }
  ]).controller('DealEditController', [
    '$scope', '$log', '$state', '$stateParams', 'dealRepository', 'dealSchema', 'dealForm',
    function($scope, $log, $state, $stateParams, dealRepository, dealSchema, dealForm) {
      $scope.schema = dealSchema;
      $scope.form = dealForm;
      $scope.entity = $stateParams.data;
      $scope.save = function() {
        dealRepository.edit($scope.entity);
        $state.go('deals.list');
      };
    }
  ]);
