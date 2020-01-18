upsert("Every1Mobile_Activity__c", "Activity_ID__c", fields(
  field("Activity_ID__c", (state) => {
    var user = state.data.payload.user_id;
    var time = state.data.unix_timestamp;
    var uid = user + time;
    return uid;
  }),
  field("RecordTypeID", "0120N0000001XCdQAM"),
  relationship("Contact__c", "Every1Mobile_ID__c", dataValue("payload.user_id")),
  field("Campaign_ID__c", dataValue("payload.campaign_id")),
  field("Campaign_Name__c", dataValue("payload.campaign_name")),
  field("Content__c", dataValue("payload.text")),
  field("Type__c", dataValue("type")),
  field("DateTime__c", (state) => {
    return new Date(state.data.unix_timestamp * 1000);
  })
));
