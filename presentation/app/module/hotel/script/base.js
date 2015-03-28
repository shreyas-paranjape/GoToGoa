angular.module('hotel', [
    'ui.router',
  ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('hotel', {
                url: '/hotel',
                templateUrl: 'module/hotel/view/home.html',
                ncyBreadcrumb: {
                    label: 'Hotel'
                },
                abstract: true
            })
            .state('hotel.search', {
                url: '',
                templateUrl: 'module/hotel/view/search.html',
                ncyBreadcrumb: {
                    label: 'Hotel-Search'
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