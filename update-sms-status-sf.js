alterState(state => {
  console.log(state);
  return state;
})

update('SMS__c', {
  Id: state.references[0].Envelope.Body.notifications.Notification.sObject.Id,
  SMS_Status__c: state => {
    if (state.data.body.status == 'success') {
      return 'Sent'
    } else {
      return 'Unhandled Everlytic status.'
    }
  },
  // Everlytic_SMS_ID__c: state.data.body.data.id
});
