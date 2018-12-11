import { combineReducers } from 'redux';
import { namespaced } from 'redux-subspace'

import usersReducer from './usersReducer';
import profileReducer from './profileReducer';

const defaultReducers = namespaced('user')(
  combineReducers({
    users: usersReducer
  })
);

const adminReducers = namespaced('admin')(
  combineReducers({
    users: usersReducer,
    profileView: profileReducer
  })
);

const appReducer = combineReducers({
  user: defaultReducers,
  admin: adminReducers
})

export default appReducer;
