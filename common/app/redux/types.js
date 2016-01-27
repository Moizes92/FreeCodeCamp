const types = [
  'updateTitle',
  'fetchUser',
  'makeToast',
  'setUser',
  'updatePoints',
  'handleError'
];

export default types
  // namespace actions types
  .map(type => `app.${type}`)
  // make into object with signature { type: type };
  .reduce((types, type) => ({ ...types, [type]: type }), {});
