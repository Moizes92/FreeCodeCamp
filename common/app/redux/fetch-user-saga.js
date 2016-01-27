import { Observable } from 'rx';
import { setUser, fetchUser } from '.types';

export default ({ services }) => ({ dispatch }) => next => {
  return function getUserSaga(action) {
    if (action.type !== fetchUser) {
      return next(action);
    }

    return services.readService$('user')
      .map(({
        username,
        picture,
        progressTimestamps = [],
        isFrontEndCert,
        isBackEndCert,
        isFullStackCert
      }) => {
        return {
          type: setUser,
          payload: {
            username,
            picture,
            points: progressTimestamps.length,
            isFrontEndCert,
            isBackEndCert,
            isFullStackCert,
            isSignedIn: true
          }
        };
      })
      .catch(err => Observable.just({ ...action, err }))
      .doOnNext(dispatch);
  };
};

