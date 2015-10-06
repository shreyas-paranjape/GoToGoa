angular.module('deal')
  .controller('DealListController', [
    '$scope', '$log', '$state', '$stateParams', 'dealRepository', 'dealGridColumnDef',
    function($scope, $log, $state, $stateParams, dealRepository, dealGridColumnDef) {
      $scope.gridOpts = {
        columnDefs: dealGridColumnDef,
        data: dealRepository.get()
      }
      $scope.edit = function(row){
        $state.go('deal.edit',{"data":row});
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
      $scope.entity = {};
      $scope.save = function() {
        dealRepository.add($scope.entity);
        $state.go('deal.list');
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
        $state.go('deal.list');
      };
    }
  ]);
