combine(function(state){
  if(dataValue("type")(state)=="activity"){
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
})
