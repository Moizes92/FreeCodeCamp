const types = [
  'fetchHikes',
  'fetchHikesCompleted',

  'toggleQuestionView',
  'grabQuestion',
  'releaseQuestion',
  'moveQuestion',

  'answer',

  'startShake',
  'endShake',

  'primeNextQuestion',
  'goToNextQuestion',

  'hikeCompleted',
  'goToNextHike'
];

export default types
  .map(type => `videos.${type}`)
  .reduce((types, type) => ({ ...types, [type]: type }), {});
