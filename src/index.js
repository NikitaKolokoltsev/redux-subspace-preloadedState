import store, { createStoreWithData } from './redux/store';
import { subspace } from 'redux-subspace';

function script() {
  let appStore = store;

  const adminStore = subspace(state => state.admin, 'admin')(appStore);

  console.log('Admin Store:');
  console.log(JSON.stringify(adminStore.getState(), null, 2));

  const appPrefilledStore = createStoreWithData({ admin: { profileView: { view: 'linear' } } });
  const adminPrefilledStore = subspace(state => state.admin, 'admin')(appPrefilledStore);

  console.log('\n----------------------\n');
  console.log('Admin Prefilled Store:');
  console.log(JSON.stringify(adminPrefilledStore.getState(), null, 2));
}

module.exports = script;