angular.module('stay')
    .controller('StayListController', [
    '$scope', '$log', '$state', '$stateParams', 'stayRepository', 'stayGridColumnDef',
    function ($scope, $log, $state, $stateParams, stayRepository, stayGridColumnDef) {
            $scope.gridOpts = {
                columnDefs: stayGridColumnDef,
                data: stayRepository.get()
            }
            $scope.edit = function (row) {
                $state.go('stay.edit', {
                    "data": row
                });
            }
            $scope.delete = function (row) {
                stayRepository.delete(row);
            }
    }
  ])
    .controller('StayAddController', [
    '$scope', '$log', '$state', '$stateParams', 'stayRepository', 'staySchema', 'stayForm',
    function ($scope, $log, $state, $stateParams, stayRepository, staySchema, stayForm) {
            $scope.schema = staySchema;
            $scope.form = stayForm;
            $log.log($stateParams.data);
            $scope.entity = {};
            $scope.save = function () {
                stayRepository.add($scope.entity);
                $state.go('stay.list');
            };
    }
  ]).controller('StayEditController', [
    '$scope', '$log', '$state', '$stateParams', 'stayRepository', 'staySchema', 'stayForm',
    function ($scope, $log, $state, $stateParams, stayRepository, staySchema, stayForm) {
            $scope.schema = staySchema;
            $scope.form = stayForm;
            $scope.entity = $stateParams.data;
            $scope.save = function () {
                stayRepository.edit($scope.entity);
                $state.go('stay.list');
            };
    }
  ]);
