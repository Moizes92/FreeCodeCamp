//   () =>
//     (store: Store) =>
//     (next: (action: Action) => Object) =>
//     errSaga(action: Action) => Object|Void
export default () => ({ dispatch }) => next => {
  return function errorSaga(action) {
    if (!action.error) { return next(action); }

    const err = { ...action.error };
    err.message =
      `error in ${action.type} action: ${action.err.message}`;

    console.error(err);
    dispatch({
      type: 'makeToast',
      payload: {
        type: 'error',
        title: 'Oops, something went wrong',
        message: `Something went wrong, please try again later`
      }
    });
  };
};
