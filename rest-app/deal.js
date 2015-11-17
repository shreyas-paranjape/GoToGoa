var deal = [{
  "title": "Deal1",
  "description": "A nice deal",
  "type": "ggj",
  "value": 10,
  "schedule": {
    "recurrence_frequency": "Monthly",
    "start_at": [{
      "time_division": "DAY",
      "value": ["2", "10", "20"]
    }]
  },
  "eligibility": [{
    "criteria_component_id": 5,
    "relationship": "AND",
    "comparator": "<=",
    "value": "customer"
  }],
  "event": [{
    "criteria_component_id": 2,
    "relationship": "OR",
    "comparator": ">",
    "value": "customer"
  }],
  "notification": [{
    "title": "Notification1",
    "description": "A nice notification",
    "schedule": {
      "recurrence_frequency": "DAILY",
      "start_at": [{
        "time_division": "HOUR",
        "value": ["9", "2", "7"]
      }]
    }
  }]
}];

exports.getAll = function() {
  return deal;
};
