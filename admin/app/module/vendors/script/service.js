angular.module('vendors')
    .service('RowEditor', ['$rootScope', '$modal', function RowEditor($rootScope, $modal) {
        var service = {};
        service.editRow = editRow;

        function editRow(grid, row) {
            $modal.open({
                templateUrl: 'module/vendors/view/edit-modal.html',
                controller: ['$modalInstance', 'PersonSchema', 'grid', 'row', RowEditCtrl],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return grid;
                    },
                    row: function () {
                        return row;
                    }
                }
            });
        }

        return service;
}]);