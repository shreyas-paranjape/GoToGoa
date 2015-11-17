var trips = [
    {
        id: 1,
        title: 'Trip 1',
        price: '20000',
        url: '/../../images/trip.jpg',
        active: true,
        descr: 'lorem lorem lorem',
        hotels: [{
                title: 'Hotel 1',
                descr: 'hello world !!!!',
                url: '../../../images/h1.jpg'
        }]
            //        days: [{
            //                id: 1,
            //                title: 'Day 4',
            //                active: true,
            //                events: [{
            //                        title: 'skydiving',
            //                        descr: 'sky sky sky',
            //                        start_time: '9.30 am',
            //                        end_time: '11.30 am'
            //                        },
            //                    {
            //                        title: 'skydiving2',
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
            //                        title: 'skydiving3',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'skydiving4',
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
            //                        title: 'skydiving5',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'skydiving6',
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
            //                        title: 'skydiving7',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'skydiving8',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    }]
                },
    {
        id: 2,
        title: 'Trip 2',
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
            //                        title: 'skydiving',
            //                        descr: 'sky sky sky',
            //                        start_time: '9.30 am',
            //                        end_time: '11.30 am',
            //                        },
            //                    {
            //                        title: 'skydiving2',
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
            //                        title: 'skydiving3',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'skydiving4',
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
            //                        title: 'skydiving5',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '6.30 pm',
            //                        end_time: '8.30 pm'
            //                                },
            //                    {
            //                        title: 'skydiving6',
            //                        descr: 'sky sky sky sky sky',
            //                        start_time: '7.30 pm',
            //                        end_time: '9 pm'
            //                            }]
            //                    }]
            }];

exports.getAll = function () {
    return trips;
};

exports.getById = function (id) {
    return trips[id];
};

exports.save = function (trip) {
    trips.push(trip);
};
