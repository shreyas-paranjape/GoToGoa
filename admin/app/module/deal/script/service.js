angular.module('deal')
  .factory('dealRepository', ['$log',
    function($log) {
      var dealRepository = {};
      var deals = [{
        "name": "Deal 1"
      }, {
        "name": "Deal 2"
      }];
      dealRepository.get = function() {
        return deals;
      };
      dealRepository.add = function(deal) {
        deals.push(deal);
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
