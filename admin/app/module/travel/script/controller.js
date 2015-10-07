angular.module('travel')
    .controller('TravelListController', [
    '$scope', '$log', '$state', '$stateParams', 'travelRepository', 'travelGridColumnDef',
    function ($scope, $log, $state, $stateParams, travelRepository, travelGridColumnDef) {
            $scope.gridOpts = {
                columnDefs: travelGridColumnDef,
                data: travelRepository.get()
            }
            $scope.edit = function (row) {
                $state.go('travel.edit', {
                    "data": row
                });
            }
            $scope.delete = function (row) {
                travelRepository.delete(row);
            }
    }
  ])
    .controller('TravelAddController', [
    '$scope', '$log', '$state', '$stateParams', 'travelRepository', 'travelSchema', 'travelForm',
    function ($scope, $log, $state, $stateParams, travelRepository, travelSchema, travelForm) {
            $scope.schema = travelSchema;
            $scope.form = travelForm;
            $log.log($stateParams.data);
            $scope.entity = {};
            $scope.save = function () {
                travelRepository.add($scope.entity);
                $state.go('travel.list');
            };
    }
  ]).controller('TravelEditController', [
    '$scope', '$log', '$state', '$stateParams', 'travelRepository', 'travelSchema', 'travelForm',
    function ($scope, $log, $state, $stateParams, travelRepository, travelSchema, travelForm) {
            $scope.schema = travelSchema;
            $scope.form = travelForm;
            $scope.entity = $stateParams.data;
            $scope.save = function () {
                travelRepository.edit($scope.entity);
                $state.go('travel.list');
            };
    }
  ]);
