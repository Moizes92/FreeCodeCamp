import debug from 'debug';
import _ from 'lodash';

const log = debug('freecc:hikes:utils');
const getFirstHike = createSelector(
  hikes => hikes.result[0],
  hikes => hikes.entities,
  (firstHikeDashedName, entities) => entities[firstHikeDashedName]
);

// interface Hikes {
//   results: String[],
//   entities: {
//     hikeId: Challenge
//   }
// }
//
// findCurrentHike({
//   hikes: Hikes,
//   dashedName: String
// }) => Object|Challenge
export function findCurrentHike(hikes = {}, dashedName) {
  if (!dashedName) {
    return getFirstHike(hikes) || {};
  }

  const filterRegex = new RegExp(dashedName, 'i');

  return hikes
    .filter(({ dashedName }) => {
      return filterRegex.test(dashedName);
    })
    .reduce((throwAway, hike) => {
      return hike;
    }, {});
}

export function getCurrentHike(hikes = {}, dashedName) {
  return hikes.entities[dashedName];
}

export function findNextHike(hikes, dashedName) {
  if (!dashedName) {
    log('find next hike no id provided');
    return hikes.entites[0];
  }
  const currentIndex = _.findIndex(hikes, ({ id: _id }) => _id === id);
  return hikes[currentIndex + 1] || hikes[0];
}


export function getMouse(e, [dx, dy]) {
  let { pageX, pageY, touches, changedTouches } = e;

  // touches can be empty on touchend
  if (touches || changedTouches) {
    e.preventDefault();
    // these re-assigns the values of pageX, pageY from touches
    ({ pageX, pageY } = touches[0] || changedTouches[0]);
  }

  return [pageX - dx, pageY - dy];
}
