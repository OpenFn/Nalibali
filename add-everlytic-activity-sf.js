query(`SELECT Id FROM Contact WHERE Everlytic_ID__c = '${state.data.__query_params.c_id}'`);

// alterState(state => {
//   console.log(state)
//   return state;
// })

bulk('Event', 'upsert', { extIdField: 'Everlytic_ID__c', failOnError: true }, state => {

  const time = new Date(parseInt(state.data.__query_params.timestamp)).toISOString();
  const bounced = (state.data.__query_params.event === 'bounce' ? true : false);
  const read = (state.data.__query_params.event === 'email_read' ? true : false);
  const delivered = (state.data.__query_params.event === 'delivered' ? true : false);
  const smsText = (state.data.__query_params.message ? state.data.__query_params.message : '' );
  const eventId = state.data.__query_params.c_id + "/e" + state.data.__query_params.timestamp;

  return [{
    Everlytic_ID__c: eventId,
    ActivityDateTime: time,
    WhoId: state.references[0].records[0].Id, // the sfID from the above query
    // Who: {
    //   Everlytic_ID__c: state.data.__query_params.c_id
    // },
    DurationInMinutes: 0,
    Subject: state.data.__query_params.event,
    Bounced__c: bounced,
    Read_Reciept__c: read,
    Delivered__c: delivered,
    SMS_Text__c: smsText,
  }];
});
