import { Observable } from 'rx';
import { normalize, Schema, arrayOf } from 'normalizr';

import types from './types';
import { fetchHikesCompleted } from './actions';
import { handleError } from '../../../../redux/actions';

import { getCurrentHike } from './utils';

const hike = new Schema('hike', { idAttribute: 'dashedName' });

export default ({ services }) => () => next => {
  return function fetchHikesSaga(action) {
    if (action.type === types.fetchHikes) {
      return next(action);
    }

    const dashedName = action.payload;
    return services.readService$('hikes')
      .map(hikes => {
        hikes = normalize({ hikes }, arrayOf(hike));
        const currentHike = getCurrentHike(hikes, dashedName);
        return fetchHikesCompleted(hikes, currentHike);
      })
      .catch(error => {
        return Observable.just({
          type: handleError,
          error
        });
      });
  };
};
