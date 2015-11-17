var stay = [{
  "title": "Day1",
  "description": "A day in a particular trip",
  "stay_type": "123",
    "email": "avs@gmail.in",
    "mobile": "9234479238",
  "address": "hfgfg",
  "no_of_sections": 123,
  "no_of_rooms": 123,
  "check_in_time": "",
  "check_out_time": "",
  "min_stay_period": "7",
  "payment_method": [{
    "payment_method_id": 1234
  }],
  "stay_feature": [{
    "feature_id": 12314,
    "value": "7"
  }],
  "stay_room": [{
    "title": "Day1",
    "description": "A day in a particular trip",
    "stay_room_type": 123.45,
    "section_no": 123,
    "no_of_beds": 123,
    "occupancy": "hv",
    "extra_bed_cost": 123.23,
    "breakfast_charges": 123.12,
    "lunch_charges": 123.23,
    "dinner_charges": 123.12,
    "stay_room_feature": [{
      "feature_id": 12314,
      "value": "nn"
    }]
  }],
  "stay_party": [{
    "name": "sia",
    "email": "adsad@gmail.com",
    "phone": "934792343",
    "designation_id": "sbas",
    "stay_party_role_id": "232"
  }]
}];


exports.getAll = function() {
  return stay;
};
