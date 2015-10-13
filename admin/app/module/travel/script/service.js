angular.module('travel')
  .factory('travelRepository', ['$log','Restangular',
    function($log,Restangular) {
      var travelRepository = {};
      var travels = [];


      Restangular.all('travel').getList().then(function(travelList){
        angular.forEach(travelList, function(value, key) {
          travels.push(value);
        });
      });
      travelRepository.get = function() {
        return travels;
      };
      travelRepository.add = function(travel) {
        travels.push(travel);
      };
      travelRepository.edit = function(travel) {
        $log.log('entity to edit' + travel);
      };
      travelRepository.delete = function(travel) {
        $log.log('entity to delete'+ travel);
      };
      return travelRepository;

    }
  ]);
