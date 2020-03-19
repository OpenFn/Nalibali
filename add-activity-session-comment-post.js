combine(function(state) {
  //Logic when type = activity
  if (dataValue("type")(state) == "activity") {
    upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
      field("Unique_ID__c", (state) => {
        var user = state.data.payload.user_id;
        var time = state.data.unix_timestamp;
        var uid = user + time;
        return uid;
      }),
      field("RecordTypeID", "0120N0000001XCiQAM"),
      relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.user_id")),
      field("Type__c", dataValue("type")),
      field("Event_Type__c", dataValue("payload.event_type")),
      field("DateTime__c", (state) => {
        return new Date(state.data.unix_timestamp * 1000);
      }),
      field("Score__c", dataValue("payload.score")),
      field("Title__c", dataValue("payload.title"))
    ))(state)
  }
  //Logic when type = session
  else if (dataValue("type")(state) == "session") {
    upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
      field("Unique_ID__c", (state) => {
        var user = state.data.payload.user_id;
        var time = state.data.unix_timestamp;
        var uid = user + time;
        return uid;
      }),
      relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.user_id")),
      field("Type__c", "Login"),
      field("DateTime__c", (state) => {
        return new Date(state.data.unix_timestamp * 1000);
      })
    ))(state)
  }
  //Logic when type = comment
  else if (dataValue("type")(state) == "comment") {
    upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
      field("Unique_ID__c", (state) => {
        var user = state.data.payload.user_id;
        var time = state.data.unix_timestamp;
        var uid = user + time;
        return uid;
      }),
      relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.user_id")),
      field("Type__c", dataValue("type")),
      field("Content__c", dataValue("payload.comment")),
      field("DateTime__c", (state) => {
        return new Date(state.data.unix_timestamp * 1000);
      })
    ))(state)
  }
  //Logic when type = LearnCourseCompleted
  else if (dataValue("type")(state) == "LearnCourseCompleted") {
    upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
      field("Unique_ID__c", (state) => {
        var user = state.data.payload.user_id;
        var time = state.data.unix_timestamp;
        var uid = user + time;
        return uid;
      }),
      field("RecordTypeID", "0120N0000001XCxQAM"),
      relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.user_id")),
      field("Type__c", dataValue("type")),
      field("DateTime__c", (state) => {
        return new Date(state.data.unix_timestamp * 1000);
      }),
      field("Course_Link__c", dataValue("payload.course_link")),
      field("Course_Name__c", dataValue("payload.course_name"))
    ))(state)
  }
  //Logic when type = post
  else if (dataValue("type")(state) == "post") {
    upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
      field("Unique_ID__c", (state) => {
        var user = state.data.payload.user_id;
        var time = state.data.unix_timestamp;
        var uid = user + time;
        return uid;
      }),
      field("RecordTypeID", "0120N0000001XCdQAM"),
      relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.user_id")),
      field("Campaign_ID__c", dataValue("payload.campaign_id")),
      field("Campaign_Name__c", dataValue("payload.campaign_name")),
      field("Content__c", dataValue("payload.text")),
      field("Type__c", dataValue("type")),
      field("DateTime__c", (state) => {
        return new Date(state.data.unix_timestamp * 1000);
      })
    ))(state)
  }
})
