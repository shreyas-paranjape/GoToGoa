angular.module('deal')
  .factory('dealRepository', ['$log', 'Restangular',
    function($log, Restangular) {
      var dealRepository = {};
      var deals = [];
      var dealRes = Restangular.all('deal');

      dealRepository.get = function() {
        if (deals.length == 0) {
          dealRes.getList().then(function(dealList) {
            angular.forEach(dealList, function(value, key) {
              deals.push(value);
            });
          });
        }
        return deals;
      };
      dealRepository.add = function(deal) {
        console.log("deal : " + deal);
        var res = dealRes.post(deal).then(function(res) {
          console.log("res : " + res);
          if (res.success) {
            deals.push(deal);
          }
        });
      };
      dealRepository.edit = function(deal) {
        $log.log('entity to edit' + deal);
      };
      dealRepository.delete = function(deal) {
        $log.log('entity to delete' + deal);
      };
      return dealRepository;
    }
  ]);
