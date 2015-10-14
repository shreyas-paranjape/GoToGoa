angular.module('travel')
  .factory('travelRepository', ['$log', 'Restangular',
    function($log, Restangular) {
      var travelRepository = {};
      var travels = [];
      var travelRes = Restangular.all('travel');

      travelRepository.get = function() {
        if (travels.length == 0) {
          travelRes.getList().then(function(travelList) {
            angular.forEach(travelList, function(value, key) {
              travels.push(value);
            });
          });
        }
        return travels;
      };
      travelRepository.add = function(travel) {
        console.log("travel : " + travel);
        var res = travelRes.post(travel).then(function(res) {
          console.log("res : " + res);
          if (res.success) {
            travels.push(travel);
          }
        });
      };
      travelRepository.edit = function(travel) {
        $log.log('entity to edit' + travel);
      };
      travelRepository.delete = function(travel) {
        $log.log('entity to delete' + travel);
      };
      return travelRepository;

    }
  ]);
