// Import your ActionTypes as needed
import {CURRENT_LOCATION, LATLANG, PERMISSION} from '../ActionTypes';

// Define your initial state
const initialState = {
  currentLocation: null,
  permissionRes: null,
  latlang: {},
};

// Define your reducer function
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    // Handle other action types if needed

    case PERMISSION:
      return {
        ...state,
        permissionRes: action.payload,
      };

    case LATLANG:
      console.log('latlang-reducer', action.payload);
      return {
        ...state,
        latlang: action.payload,
      };

    default:
      return state;
  }
};

export default locationReducer;
