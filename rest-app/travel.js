var travel = [{
  "title": "dr31hHdce",
  "description": "Leonel Messi",
  "travel_type_id": "3",
  "travel_vehicle": [{
    "model_id": 2,
    "vehicle_class_id": ["29","67"],
    "no_of_seats": 3,
    "travel_vehicle_feature": [{
      "feature_id": "5",
      "value": "Barcelona"
    }]
  }],
  "stay_party": [{
    "name": "Argentina",
    "email": "xyz@gmail.com",
    "phone": "92014893845",
    "designation_id": 23,
    "stay_party_role_id": 7
  }]
}, {
  "title": "yuH3c9inZ",
  "description": "Cristiano Ronaldo",
  "travel_type_id": 2,
  "travel_vehicle": [{
    "model_id": 24,
    "vehicle_class_id": ["29","67"],
    "no_of_seats": 9,
    "travel_vehicle_feature": [{
      "feature_id": 15,
      "value": "Barcelona"
    }]
  }],
  "stay_party": [{
    "name": "Argentina",
    "email": "gusz@gmail.com",
    "phone": "9201489790",
    "designation_id": 13,
    "stay_party_role_id": 73
  }]
}, {
  "title": "q8hcNoeT3",
  "description": "Luis Suarez",
  "travel_type_id": 3,
  "travel_vehicle": [{
    "model_id": 44,
    "vehicle_class_id": ["29","67"],
    "no_of_seats": 19,
    "travel_vehicle_feature": [{
      "feature_id": 12,
      "value": "Barcelona"
    }]
  }],
  "stay_party": [{
    "name": "Argentina",
    "email": "assz@gmail.com",
    "phone": "9201484603",
    "designation_id": 17,
    "stay_party_role_id": 3
  }]
}];

exports.getAll = function() {
  return travel;
};
