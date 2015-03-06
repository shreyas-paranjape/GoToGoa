angular.module('rental', [
    'ui.router',
  ])

.config(function ($stateProvider) {

    $stateProvider
        .state('rental', {
            url: '/rental',
            templateUrl: 'module/rental/view/search.html'
        })
        .state('rental.list', {
            url: '/rental.list',
            templateUrl: 'module/rental/view/list.html',
            params: {
                data: ['A', 'Set', 'Of', 'Things']
            },
            controller: 'RentalController'
        });
})