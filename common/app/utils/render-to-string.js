import { Observable, Scheduler } from 'rx';
import ReactDOM from 'react-dom/server';
import debug from 'debug';

import ProfessorContext from './Professor-Context';

const log = debug('freecc:professor');

export function fetch({ fetchContexts = [] }) {
  if (fetchContexts.length === 0) {
    log('empty fetch context found');
    return Observable.just(fetchContexts);
  }
  return Observable.from(fetchContexts, null, null, Scheduler.default)
    .doOnNext(({ name }) => log(`calling ${name} action creator`))
    .map(({ action, actionArgs }) => action.apply(null, actionArgs))
    .doOnNext(fetch$ => {
      if (!Observable.isObservable(fetch$)) {
        throw new Error('action creator did not return an observable');
      }
    })
    .mergeAll();
}


export function renderToString(Component) {
  const fetchContext = [];
  const professor = {};
  let ContextedComponent;
  try {
    ContextedComponent = ProfessorContext.wrap(Component, professor);
    log('initiating fetcher registration');
    ReactDOM.renderToStaticMarkup(ContextedComponent);
    log('fetcher registration completed');
  } catch (e) {
    return Observable.throw(e);
  }
  return fetch(professor)
    .last()
    .delay(0)
    .map(() => {
      const markup = ReactDOM.render(ContextedComponent);
      return {
        markup,
        fetchContext
      };
    });
}
