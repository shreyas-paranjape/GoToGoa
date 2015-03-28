
 angular.module('hotel', ['ui.router'])
    config(function($stateProvider,$urlRouterProvider){
        
    $urlRouterProvider.otherwise("/empty")
    $stateProvider
        .state('f1',{
        url: "/f1",
        templateUrl: "module/hotel/view/f1.html"
    })
   
        .state('empty',{
        url: "/empty",
        templateUrl: "module/hotel/view/empty.html"
    })
        controller: 'trycontrol'
//        .state('search',{
//        url: "/search",
//        templateUrl: "search.html"
//    })
     
    })
    
    
    


