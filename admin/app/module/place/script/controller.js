angular.module('place')
    .controller('PlacesController', ['$scope', '$stateParams', '$modal',
      function ($scope, $stateParams, $modal) {
            'use strict';
            $scope.store = $stateParams.data;

            function RowEditCtrl($modalInstance, grid, row) {
                var vm = this;

                vm.schema = {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            title: 'Name'
                        },
                        company: {
                            type: 'string',
                            title: 'Company'
                        },
                        phone: {
                            type: 'string',
                            title: 'Phone'
                        },
                        'address.city': {
                            type: 'string',
                            title: 'City'
                        }
                    }
                };
                vm.entity = angular.copy(row.entity);
                vm.form = [
            'name',
            'company',
            'phone',
                    {
                        'key': 'address.city',
                        'title': 'City'
            },
          ];

                vm.save = save;

                function save() {
                    // Copy row values over
                    row.entity = angular.extend(row.entity, vm.entity);
                    $modalInstance.close(row.entity);
                }
            };


            $scope.editRow = function (grid, row) {
                $modal.open({
                    templateUrl: 'module/place/view/edit-modal.html',
                    controller: ['$modalInstance', 'grid', 'row', RowEditCtrl],
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
            };



            $scope.gridOpts = {
                columnDefs: [
                    {
                        field: 'id',
                        name: '',
                        cellTemplate: 'module/place/view/edit-button.html',
                        width: 40
                },
                    {
                        name: 'name'
                    },
                    {
                        name: 'company'
                    },
                    {
                        name: 'phone'
                    },
                    {
                        name: 'City',
                        field: 'address.city'
                    }
              ],
                data: [
                    {
                        "name": "Cox",
                        "phone": "Carney",
                        "company": "Enormo",
                        "address": {
                            "city": "xyz"
                        }
                  }


                ]
            };

    }]);
