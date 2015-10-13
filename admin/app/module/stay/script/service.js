angular.module('stay')
  .factory('stayRepository', ['$log',
    function($log) {
      var stayRepository = {};
      var stays = [{
        "name": "Stay 1"
      }, {
        "name": "Stay 2"
      }];
      var currentEdit = {};

      stayRepository.get = function() {
        return stays;
      };
      stayRepository.add = function(stay) {
        stays.push(stay);
      };
      stayRepository.edit = function(stay) {
        $log.log('entity to edit' + stay);
      };
      stayRepository.delete = function(stay) {
        $log.log('entity to delete'+ stay);
      };
      return stayRepository;
    }
  ]);
