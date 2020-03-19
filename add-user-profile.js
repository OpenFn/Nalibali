upsert("Contact", "Every1Mobile_ID__c", fields(
    field("Every1Mobile_ID__c", dataValue("payload.profile.user_id")),
    field("RecordTypeID", "012b00000009bWTAAY"),
    field("Intake_Programme__c", "Funda Sonke"),
    field("Description", dataValue("payload.profile.bio")),
    field("MailingCity", dataValue("payload.profile.city")),
    field("MailingCountry", "South Africa"),
    field("Description", dataValue("payload.profile.bio")),
    field("Birthdate", (state) => {
      return new Date(state.data.payload.profile.dob * 1000); // check transformation ?
    }),
    field("Email", dataValue("payload.profile.email")),
    field("FirstName", dataValue("payload.profile.first_name")),
    field("LastName", (state) => {
      var name =  dataValue("payload.profile.last_name")(state);
      return (name===null || name===undefined || name==='' ? "Unknown" : name);
    }),
    field("Gender__c", (state) => {
      var gender = state.data.payload.profile.gender;
      if (gender === "f") {
        return "Female";
      } else if (gender === "m") {
        return "Male";
      } else {
        return null;
      }
    }),
    //field("Is_Nal_ibali_staff_member__c", dataValue("payload.profile.nalibali_employee")), //do not map, formula field
    field("Nal_ibali_Role__c", (state) => {
      var role = dataValue("payload.profile.nalibali_role")(state);
      var newRole = (role || role!==null ? role : "");
      var staff = dataValue("payload.profile.nalibali_employee")(state);
      return (staff==="yes" || staff===true ? "Staff" : newRole);
    }),
    field("Phone", dataValue("payload.profile.phone")),
    field("Province__c", dataValue("payload.profile.province")),
    field("Date_of_E1M_Signup__c", (state) => {
      const dateArray = state.data.payload.profile.ts.split(' ');
      return dateArray[0];
    })
  )),
  upsert("Every1Mobile_Activity__c", "Unique_ID__c", fields(
    field("Unique_ID__c", (state) => {
      var user = state.data.payload.profile.user_id;
      var time = state.data.unix_timestamp;
      var uid = user + time;
      return uid;
    }),
    relationship("Contact__r", "Every1Mobile_ID__c", dataValue("payload.profile.user_id")),
    field("DateTime__c", (state) => {
      return new Date(state.data.unix_timestamp * 1000);
    }),
    field("Type__c", dataValue("type"))
  ));
