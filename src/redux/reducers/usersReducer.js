let defaultState = {
  users: []
};

export default function usersReducer(state, action) {
  state = {
    ...defaultState,
    ...state
  }

  switch (action.type) {
    case 'SET_USERS': {
      return {
        ...state,
        users: action.payload.users
      }
    }

    default: {
      return state;
    }
  }
}
