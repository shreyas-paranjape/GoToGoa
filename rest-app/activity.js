//var activity = [{
//  "title": "Day1",
//	"description": "A day in a particular activity",
//  "activity_type": 123,
//	"schedule": {
//    "recurrence_frequency": "Monthly",
//    "start_at": [{
//      "time_division": "DAY",
//      "value": ["2", "10", "20"]
//    }]
//  }
//},{
//  "title": "Day2",
//	"description": "A day in a particular activity",
//  "activity_type": 123,
//	"schedule": {
//    "recurrence_frequency": "Monthly",
//    "start_at": [{
//      "time_division": "DAY",
//      "value": ["2", "10", "20"]
//    }]
//  }
//}];
//
//exports.getAll = function() {
//  return activity;
//};
var activity = [
    {
        id: 1,
        title: 'Activity 1',
        price: '20000',
        url: '../../../images/trip.jpg',
        active: true,
        descr: 'lorem lorem lorem',
        hotels: [{
                title: 'Hotel 1',
                descr: 'hello world !!!!',
                url: '../../../images/h1.jpg'
        }]
            //        days: [{
            //                id: 1,
            //                title: 'Day 1',
            //                active: true,
            //                events: [{
            //                        title: 'Paragliding 1',
            //                        descr: 'sky sky sky',
            //                        start_time: '9.30 am',
            //                        end_time: '11.30 am'
            //                        },
            //                    {
            //                        title: 'Paraglidin 2',
            //                        descr: 'sky sky sky sky',
            //                        start_time: '12.30 pm',
            //                        end_time: '2 pm'
            //                            }]
            //                    },
            //            {
            //                id: 2,
            //                title: 'Day 2',
            //                active: false,
            //                events: [{
            //                        title: 'Paragliding 3',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'Paragliding 4',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    },
            //            {
            //                id: 3,
            //                title: 'Day 3',
            //                active: false,
            //                events: [{
            //                        title: 'Paragliding 5',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'Paragliding 6',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    },
            //            {
            //                id: 4,
            //                title: 'Day 4',
            //                active: false,
            //                events: [{
            //                        title: 'Paragliding 7',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'Paragliding 8',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    }]
                },
    {
        id: 2,
        title: 'Activty 2',
        price: '30000',
        url: '../../../images/trip2.jpg',
        active: false,
        descr: 'lorem lorem lorem',
        hotels: [{
                title: 'Hotel 2',
                descr: 'hello world !!!!',
                url: '../../../images/h2.jpg'
        }]
            //        days: [{
            //                id: 0,
            //                title: 'Day 1',
            //                active: false,
            //                events: [{
            //                        title: 'Paragliding 1',
            //                        descr: 'sky sky sky',
            //                        start_time: '9.30 am',
            //                        end_time: '11.30 am'
            //                        },
            //                    {
            //                        title: 'Paragliding 2',
            //                        descr: 'sky sky sky sky',
            //                        start_time: '12.30 pm',
            //                        end_time: '2 pm'
            //                            }]
            //                    },
            //            {
            //                id: 10,
            //                title: 'Day 2',
            //                active: false,
            //                events: [{
            //                        title: 'Paragliding 3',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'Paragliding 4',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    },
            //            {
            //                id: 20,
            //                title: 'Day 3',
            //                active: true,
            //                events: [{
            //                        title: 'Paragliding 5',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'Paragliding 6',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    }]
                }
            ];

exports.getAll = function () {
    return activity;
};

exports.getById = function (id) {
    return activity[id];
}

exports.save = function (act) {
    activity.push(act);
}
