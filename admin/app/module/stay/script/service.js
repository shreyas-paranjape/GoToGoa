angular.module('stay')
    .factory('stayRepository', ['$log',
    function ($log) {
            var stayRepository = {};
            var stay_data = [{
                "name": "Deal1",
                "description": "yo yo yo"
                     }, {
                "name": "Deal2",
                "description": "yo yoy oy o"
                     }];

            stayRepository.get = function () {
                return stay_data;
            };
            stayRepository.add = function (stay) {
                stay_data.push(stay);
            };
            stayRepository.edit = function (stay) {
                $log.log('entity to edit' + stay);
            };
            stayRepository.delete = function (stay) {
                $log.log('entity to delete' + stay);
            };
            return stayRepository;
    }
  ]);
