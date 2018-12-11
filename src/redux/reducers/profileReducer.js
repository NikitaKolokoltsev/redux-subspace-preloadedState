let defaultState = {
  view: 'flat',
  detalizationLevel: 'short'
};

export default function profileReducer(state, action) {
  state = {
    ...defaultState,
    ...state
  }

  switch (action.type) {
    case 'SET_DETALIZATION_LEVEL': {
      return {
        ...state,
        detalizationLevel: action.payload.detalizationLevel
      }
    }

    case 'SET_PROFILE_VIEW': {
      return {
        ...state,
        view: action.payload.view
      }
    }

    default: {
      return state;
    }
  }
}
