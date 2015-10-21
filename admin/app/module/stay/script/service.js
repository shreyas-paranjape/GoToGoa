angular.module('stay')
  .factory('stayRepository', ['$log', 'Restangular',
    function($log, Restangular) {
      var stayRepository = {};
      var stays = [];
      var stayRes = Restangular.all('stay');

      stayRepository.get = function() {
        if (stays.length == 0) {
          stayRes.getList().then(function(stayList) {
            angular.forEach(stayList, function(value, key) {
              stays.push(value);
            });
          });
        }
        return stays;
      };
      stayRepository.add = function(stay) {
        console.log("stay : " + stay);
        var res = stayRes.post(stay).then(function(res) {
          console.log("res : " + res);
          if (res.success) {
            stays.push(stay);
          }
        });
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
