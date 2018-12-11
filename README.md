# redux-subspace-preloadedState

Example project with the `redux-subspace` package demonstrating some problems with the prefilled state in the `redux` store while using the `namespaced()` functionality.

Run the project:
```
node run
```

### Explanation
It is an example of the application with 2 roles of users: admin role and the default one - usual 'user' role.
Both admins and users can view others users' profiles.
The difference between admins and users is that admin can change the view of the profiles list, while usual users can only view the list in one way.
So, with that being said, I decided to create two reducers. The `usersReducer`, will hold the logic just for representing list of the users' profiles.
And the `profileReducer` that will hold the logic for the way in which users can see the profiles list.
After that I decided to make 2 namespaced reducers:
```
# reducer for default users
const defaultReducers = namespaced('user')(
  combineReducers({
    users: usersReducer
  })
);

# reducer for admin users extended with the profileView reducer
const adminReducers = namespaced('admin')(
  combineReducers({
    users: usersReducer,
    profileView: profileReducer
  })
);
```

And then combined them to the one common reducer for the app:
```
const appReducer = combineReducers({
  user: defaultReducers,
  admin: adminReducers
})
```

So, right now, after deafult store creating, according to the default values defined in the reducers, I get the following store structure:
```
import { createStore } from 'redux';

const store = createStore(appReducer);

=> {
     user: {
       users: {
         users: []
       }
     },
     admin: {
       users: {
         users: []
       },
       profileView: {
         view: 'flat',
         detalizationLevel: 'short'
       }
     }
   }
```

**BUT:**
If I try to create a store with prefilledState, then some of the default values are missing:
```
import { createStore } from 'redux';

const prefilledState = {
  admin: {
    profileView: {
      view: 'linear'
    }
  }
}

const store = createStore(appReducer, prefilledState);

store.getState();
=> {
     user: {
       users: {
         users: []
       }
     },
     admin: {
       profileView: {
         view: 'linear'
       }
     }
   }
```
As you can see the `admin.profileView.detalizationLevel, admin.users` fields is missing.
And usage of the prefilled state is quite common when performing server side rendering with React.
You fetch the data from API, fill the store with this data and render your application the HTML which will represent your data and will be sent as a response to the client.
And while this bug is present you need to manually send all default values to the store alongside of the actual fetched data.
So it will be just the duplication of the default values for the store which are already defined in the reducer.
