alterState(state => {
  var user = state.data.payload.quiz.user_id;
  var time = state.data.unix_timestamp;
  state.data._quizIdentifier = `${user}${time}`;
  return state;
});

upsert(
    'Every1Mobile_Activity__c',
    'Unique_ID__c',
    fields(
      field('Unique_ID__c', dataValue('_quizIdentifier')),
      field('RecordTypeID', '0120N0000001XCsQAM'),
      relationship(
        'Contact__r',
        'Every1Mobile_ID__c',
        dataValue('payload.quiz.user_id')
      ),
      field('Type__c', dataValue('type')),
      field('DateTime__c', state => {
        return new Date(state.data.unix_timestamp * 1000);
      }),
      field('Quiz_ID__c', dataValue('payload.quiz.id'))
    )
  ),
  //for each question in quiz, create 1 child Every1Mobile_Activity__c w/ self-lookup to parent above
  //path to question array: $.payload.quiz.questions[*]
  each(
    merge(
      dataPath('$.payload.quiz.questions[*]'),
      fields(
        field('userId', dataValue('payload.quiz.user_id')),
        field('quizId', dataValue('_quizIdentifier'))
      )
    ),
    upsert(
      'Every1Mobile_Activity__c',
      'Unique_ID__c',
      fields(
        field('Unique_ID__c', state => {
          var questionId = dataValue('id')(state) //adding questionId to each question Unique_ID__c
          return `${state.data.quizId}${state.data.id}${questionId}`;
        }),
        relationship('Contact__r', 'Every1Mobile_ID__c', dataValue('userId')),
        field('Survey_Question_Type__c', dataValue('type')),
        field('Survey_Questions_ID__c', dataValue('id')),
        field('Questions_Question__c', dataValue('question')),
        field('Questions_Answer_ID__c', dataValue('answer.id')),
        field('Questions_Answer__c', dataValue('answer.answer')),
        relationship(
          'Every1Mobile_Activity__r',
          'Unique_ID__c',
          dataValue('quizId')
        )
      )
    )
  );
