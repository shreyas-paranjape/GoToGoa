angular.module('hotel', [
    'ui.router',
  ])

.config(function ($stateProvider) {

    $stateProvider
        .state('hotel', {
            url: '/hotel',
            templateUrl: 'module/hotel/view/search.html',
            ncyBreadcrumb: {
                label: 'Hotel'
            }
        })
        .state('hotel.list', {
            url: '/hotel.list',
            templateUrl: 'module/hotel/view/list.html',
            ncyBreadcrumb: {
                label: 'Hotel-List'
            },
            params: {
                data: ['default', 'list', 'of', 'things']
            },
            controller: 'HotelsController'
        });
});