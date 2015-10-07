<<<<<<< HEAD:admin/app/module/deals/script/service.js
angular.module('deals')
    .factory('dealRepository', ['$log',
    function ($log) {
            var dealRepository = {};
            var deals = [{
                "name": "Deal 1"
=======
angular.module('deal')
  .factory('dealRepository', ['$log',
    function($log) {
      var dealRepository = {};
      var deals = [{
        "name": "Deal 1"
>>>>>>> 1f6f7c58a49bff17bb6e16ad40be9f8a17253e7a:admin/app/module/deal/script/service.js
      }, {
                "name": "Deal 2"
      }];

            dealRepository.get = function () {
                return deals;
            };
            dealRepository.add = function (deal) {
                deals.push(deal);
            };
            dealRepository.edit = function (deal) {
                $log.log('entity to edit' + deal);
            };
            dealRepository.delete = function (deal) {
                $log.log('entity to delete' + deal);
            };
            return dealRepository;
    }
  ]);
