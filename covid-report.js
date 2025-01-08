each(
dataPath("data[*]"),
upsert("Reporting__c", "Unique_ID__c", fields(
field("Unique_ID__c", dataValue("instanceID")),
field("Device_ID__c",dataValue("deviceid")),
field("Submission_Date__c",dataValue("today")),
field("Form_Start_Time__c",dataValue("start")),
field("Province__c", function(state){
       if (state.data.province !== (undefined || null)) {
      return dataValue("province")(state).toString().replace("_"," ")
      } else {
       null
        }
      }),
field("Project__c", function(state){
             if (state.data.project !== (undefined || null)) {
            return dataValue("project")(state).toString().replace("_"," ")
            } else {
             null
              }
            }),
// field("Story_Sparker__c",dataValue("name")),
field("Story_Sparker__c", function(state){
              if (state.data.name === ("0030N0000370rUfQAI")) {
              return "0030N00003Q5FGtQAN"}
              if (state.data.name === ("0030N00002UduHrQAJ")) {
              return "0030N000038A5nRQAS"}
              else {
              return dataValue("name")(state)}
              }),
field("Other_Story_Sparker__c",dataValue("name_other")),
field("Date_of_visit__c",dataValue("date")),
field("Time_In__c",dataValue("time_in")),
field("Time_Out__c",dataValue("time_out")),
field("Did_Nal_ibali_Activities_Today__c",dataValue("visited_school")),
field("Reason_for_not_conducting_activity__c",dataValue("no_visit_choice")),
field("Reason_for_not_visiting__c", function(state){
             if (state.data.reason_no_visit !== (undefined || null)) {
      return dataValue("reason_no_visit")(state).toString().replace("_"," ")
            } else {
             null
              }
            }),
field("Activities_Completed__c",function(state) {
                        if (state.data.activities !== (undefined || null))
                        {  return Array.apply(
                                   null, dataValue("activities")(state)
                                  ).join(';').replace(/_/g," ")
                              }}),
field("Other_Activities_1__c",dataValue("activities_other")),
field("Helpers__c",dataValue("helpers")),
field("Who_helped__c",dataValue("text")),
field("Shared_Content_With_How_Many__c",dataValue("how_many")),
field("Platform_Content_Shared_On__c", function(state){
             if (state.data.platform_content !== (undefined || null)) {
      return dataValue("platform_content")(state).toString().replace("_"," ")
            } else {
             null
              }
            }),
field("Learning_Activities_Conducted__c",dataValue("describe_learning")),
field("What_Content_Was_Shared__c", function(state){
             if (state.data.what_content !== (undefined || null)) {
      return dataValue("what_content")(state).toString().replace("_"," ")
            } else {
             null
              }
            }),
field("How_Much_Content__c",dataValue("how_much_content")),
field("Challenges_to_report__c",dataValue("select_challenges")),
field("Any_challenges_experienced__c",dataValue("challenges")),
field("Positive_highlights_to_share__c",dataValue("select_success")),
field("Positive_highlights__c",dataValue("successes")),
field("Form_Ended_Time__c",dataValue("end"))
))
);
