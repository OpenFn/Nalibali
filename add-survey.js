upsert("Every1Mobile_Activity__c", "Activity_ID__c", fields(
  field("Activity_ID__c", (state) => {
    var user = state.data.payload.survey.user_id;
    var time = state.data.unix_timestamp;
    var uid = user + time;
    return uid;
  }),
  field("RecordTypeID", "0120N0000001XCnQAM"),
  relationship("Contact__c", "Every1Mobile_ID__c", dataValue("payload.survey.user_id")),
  field("Type__c", dataValue("type")),
  field("DateTime__c", (state) => {
    return new Date(state.data.unix_timestamp * 1000);
  }),
  //HOW TO MAP SURVEY QUESTIONS??
  field("Survey_ID__c", dataValue("payload.survey.id"))
));
