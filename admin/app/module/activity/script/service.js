angular.module('activity')
  .factory('activityRepository', ['$log',
    function($log) {
      var activityRepository = {};
      var activities = [{
        "name": "Activity1"
      }, {
        "name": "Activity2"
      }];

      var currentEdit = {};

      activityRepository.get = function() {
        return activities;
      };

      activityRepository.add = function(activity) {
        activities.push(activity);
      };

      activityRepository.edit = function(activity) {
        $log.log('entity to edit' + activity);
      };

      activityRepository.delete = function(activity) {
        $log.log('entity to delete' + activity);
      };

      return activityRepository;
    }
  ]);
