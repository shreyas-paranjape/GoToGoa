/*global angular:false */
angular.module('itenarary')
    .controller('ItenararyPlannerController', ['$scope', function ($scope) {
        'use strict';
    }])
    .controller('ItenararyDetailController', ['$scope', '$filter', '$stateParams',
    function ($scope) {
            'use strict';
            $scope.events = [
                {
                    "time": "10am",
                    "title": "Miramar",
                    "desr": "miramar ipsum Lorem ipsum",
                    "color": "red",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438753181/goaamigo/beach1.jpg",
                    "events": [
                        {
                            "title": "jet Ski",
                            "desr": "jet ski jet ski jet ski",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]
               },
                {
                    "time": "12am",
                    "title": "Colva",
                    "desr": "colva Lorem ipsum",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438753323/goaamigo/beach2.jpg",
                    "color": "yellow",
                    "events": [
                        {
                            "title": "Sailing",
                            "desr": "Sailing Sailing Sailing sailing",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]

               },
                {
                    "time": "12.30pm",
                    "title": "Baga",
                    "desr": "baga ipsum Lorem ipsum",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438754256/goaamigo/beach3.jpg",
                    "color": "green",
                    "events": [
                        {
                            "title": "Kayaking",
                            "desr": "Kayaking  Kayaking  Kayaking",
                        },
                        {
                            "title": "Scuba-Diving",
                            "desr": "Scuba-Diving Scuba-Diving Scuba-Diving",
                        }
                     ]
               },
                {
                    "time": "1.30 pm",
                    "title": "Agonda",
                    "desr": "agonda ipsum Lorem ipsum",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438754283/goaamigo/beach4.jpg",
                    "color": "blue",
                    "events": [
                        {
                            "title": "jet Ski",
                            "desr": "jet ski jet ski jet ski",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]
                },
                {
                    "time": "7 pm",
                    "title": "Terekhol",
                    "desr": "terekhol terekhol",
                    "url": "http://res.cloudinary.com/fomentotravel-com/image/upload/v1438771022/beach5_lifamv.jpg",
                    "color": "brown",
                    "events": [
                        {
                            "title": "sea surfing",
                            "desr": "sea surfing sea surfing sea surfing",
                        },
                        {
                            "title": "Parasailing",
                            "desr": "Parasailing Parasailing Parasailing",
                        }
                     ]
                }
        ];
            
    }]);