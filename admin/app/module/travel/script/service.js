angular.module('travel')
    .factory('travelRepository', ['$log',
    function ($log) {
            var travelRepository = {};
            var travel_data = [{
                "name": "Deal1",
                "description": "yo yo yo"
                     }, {
                "name": "Deal2",
                "description": "yo yoy oy o"
                     }];

            travelRepository.get = function () {
                return travel_data;
            };
            travelRepository.add = function (travel) {
                travel_data.push(travel);
            };
            travelRepository.edit = function (travel) {
                $log.log('entity to edit' + travel);
            };
            travelRepository.delete = function (travel) {
                $log.log('entity to delete' + travel);
            };
            return travelRepository;
    }
  ]);
