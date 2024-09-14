import {STORE_APPLICANTSPROFILE_DETAILS} from '../ActionTypes';

//
// Initial state
const initialState = {
  profileDetails: null, // You can set an initial value, depending on your requirements
};

// Reducer function
const applicantProfileDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_APPLICANTSPROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload,
      };
    default:
      return state;
  }
};

export default applicantProfileDetailsReducer;
