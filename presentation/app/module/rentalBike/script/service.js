angular.module('rentalBike')
    .factory('rentalsRepository', ['$log', 'Restangular',
    function ($log, Restangular) {
            var activityRepository = {};
            var activities = [
                {
                    name: "",
                    description: "",
                    price: ""

                },
                {},
                {}

            ];
            //var activityRes = Restangular.all('activity');

            activityRepository.get = function () {
                //if (activities.length == 0) {
                //activityRes.getList().then(function(activityList) {
                //angular.forEach(activityList, function(value, key) {
                //activities.push(value);
                //});
                //});
                //}
                return activities;
            };
            activityRepository.add = function (activity) {
                //console.log("activity : " + activity);
                //var res = activityRes.post(activity).then(function(res) {
                // console.log("res : " + res);
                //if (res.success) {
                //  activities.push(activity);
                //}
                //});
            };
            activityRepository.edit = function (activity) {
                $log.log('entity to edit' + activity);
            };

            activityRepository.delete = function (activity) {
                $log.log('entity to delete' + activity);
            };

            return activityRepository;
    }
  ]);
