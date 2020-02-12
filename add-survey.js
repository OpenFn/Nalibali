upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
    field("Unique_ID__c", (state) => {
      var user = state.data.payload.survey.user_id;
      var time = state.data.unix_timestamp;
      var uid = user + time;
      return uid;
    }),
    field("RecordTypeID", "0120N0000001XCnQAM"),
    relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.survey.user_id")),
    field("Type__c", dataValue("type")),
    field("DateTime__c", (state) => {
      return new Date(state.data.unix_timestamp * 1000);
    }),
    field("Survey_ID__c", dataValue("payload.survey.id"))
  )),
  //for each question in survey, create 1 child Every1Mobile_Activity__c w/ self-lookup to parent above
  //path to question array: $.payload.survey.questions[*]
  each(
    dataPath("$.payload.survey.questions[*]"),
    upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
      field("Unique_ID__c", (state) => {
        var user = state.data.payload.survey.user_id; //this returns undefined... why? because of dataPath()?
        var time = state.data.unix_timestamp;
        var question = dataValue("id")(state);
        var uid = user + time + question;
        return uid;
      }),
      relationship("Contact__r", "Every1Mobile_ID__c", state.data.payload.survey.user_id),
      field("Survey_Question_Type__c", dataValue("type")),
      field("Survey_Questions_ID__c", dataValue("id")),
      field("Survey_Questions_Question__c", dataValue("question")),
      field("Survey_Answer_ID__c", dataValue("answer.id")),
      field("Survey_Questions_Answer__c", dataValue("answer.answer")),
      relationship("Every1Mobile_Activity__r", "Unique_ID__c", (state) => {
        var user = state.data.payload.survey.user_id;
        var time = state.data.unix_timestamp;
        var uid = user + time;
        return uid;
      })
    ))
  );
