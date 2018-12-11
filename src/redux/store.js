import { createStore, compose } from 'redux';

import appReducer from './reducers';

const store = createStore(appReducer);

const createStoreWithData = (data) => createStore(appReducer, data);

export default store;
export { createStoreWithData };