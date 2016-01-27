import { Cat } from 'thundercats';
import stamp from 'stampit';
import { Disposable, Observable } from 'rx';

import { post$, postJSON$ } from '../utils/ajax-stream.js';
import { AppActions, AppStore } from './flux';
import HikesActions from './routes/Hikes/flux';
import JobActions from './routes/Jobs/flux';

const ajaxStamp = stamp({
  methods: {
    postJSON$,
    post$
  }
});

export default Cat().init(({ instance: cat, args: [services] }) => {

  cat.register(HikesActions.compose(serviceStamp, ajaxStamp), null, services);
  cat.register(AppActions.compose(serviceStamp), null, services);
  cat.register(
    JobActions.compose(serviceStamp, ajaxStamp),
    null,
    cat,
    services
  );
  cat.register(AppStore, null, cat);
});
