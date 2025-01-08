each(dataPath("data[*]"),
      combine(
      upsert("Reporting__c","Unique_ID__c",fields(
      field("Unique_ID__c", dataValue("instanceID")),
      field("Province__c", function(state){
                         if (state.data.province !== (undefined || null)) {
                          return dataValue("province")(state).toString().replace(new RegExp("_","g")," ")
                              } else {
                              null
                                }
                              }),
      field("Story_Sparker__c", function(state){
                        if (state.data.lm === ("0030N00002wEFIkQAO"))
                        {return "0030N00002qNItEQAW"}
                        if (state.data.lm === ("0030N00002wELVBQA4"))
                        {return "0030N00002b1cpjQAA"}
                         if (state.data.lm !== ("lm_other")) {
                          return dataValue("lm")(state)
                              } else {
                             return "0030N00002HkYUwQAN"
                                }
                              }),
      field("RecordTypeID", "0120N0000001X2iQAE"),
      field("Other_Story_Sparker__c", dataValue("lm_other")),
      field("Date_of_visit__c", dataValue("date")),
      field("GPS_Location__c", dataValue("longitude")),
      field("GPS_Location__c", dataValue("lattitude")),
      field("Visit_Partner_Name_of_partner_org__c", dataValue("partner")),
      field("Time_In__c", function(state)
            { const timeArray = state.data.time_in.split(':');
            var hour = parseInt(timeArray[0]);
            if (hour < 21)
            {hour = hour + 2}
            else {
          hour = hour + 2 - 24;}
        const strHour = (hour < 10 ? '0' + hour : '' + hour);
        return [strHour, timeArray[1], timeArray[2]].join(':')
      }),
      field("Were_books_checked_out_returned_today__c", dataValue("books_lent")),
      field("No_adults_checked_out_books_today__c", dataValue("no_adults")),
      field("No_children_checked_out_books_today__c", dataValue("no_children")),
      field("Any_special_books_t__c", dataValue("requests_YN")),
      field("Special_book_requests__c", dataValue("special_request")),
      field("Activities_Completed__c", function(state) {
                              if (state.activities !== (undefined || null))
                              {  return Array.apply(
                                         null, dataValue("activities")(state)
                                        ).join(';').replace(/_/g," ")
                                    }}),
      field("Other_Activities_1__c", dataValue("other_activity")),
      field("Do_you_know_actual_approximate_number__c", dataValue("number_known")),
      field("Actual_no_of_participants__c", dataValue("actual")),
      field("Approximate_no_of_participants__c", dataValue("approximate")),
      field("Challenges_to_report__c", dataValue("select_challenges")),
      field("Any_challenges_experienced__c", dataValue("challenges")),
      field("Positive_highlights_to_share__c", dataValue("select_success")),
      field("Positive_highlights__c", dataValue("successes")),
      field("Time_Out__c", function(state)
            { const timeArray = state.data.time_out.split(':');
            var hour = parseInt(timeArray[0]);
            if (hour < 21)
            {hour = hour + 2}
            else {
          hour = hour + 2 - 24;}
        const strHour = (hour < 10 ? '0' + hour : '' + hour);
        return [strHour, timeArray[1], timeArray[2]].join(':')
      }),
      field("No_of_books_returned__c", dataValue("no_books_returned")),
      field("No_of_books_overdue__c", dataValue("no_books_outstanding"))
      )),
each(dataPath("checkout_repeat[*]"),
      // function(state) {var whoID = dataValue("who")},
      // merge(dataPath("checkout_repeat[*]"),fields(
      // field("whoID", dataValue("who"))),
      // fields(
      // field("parentId", dataValue("instanceID")),
      // dataPath("books_repeat[*]"),
      create("Book_Checkout__c",fields(
      relationship("SPM_Book__r","Unique_ID__c",dataValue("scan")),
      relationship("Reporting__r","Unique_ID__c",dataValue("parentId")),
      relationship("Book_Checked_Out_By__r","Library_Card__c",dataValue("whoID")),
      field("Checkout_Status__c", dataValue("book_status")))

))
));
