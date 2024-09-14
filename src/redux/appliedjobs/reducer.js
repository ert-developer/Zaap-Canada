import { FETCH_APPLIEDJOBS_SUCCESS, FETCH_APPLIEDJOBS_FAILURE } from "../ActionTypes";

const initialState = {
  appliedJobsDetails: [], // <-- Corrected the field name
  error: null,
};

// Reducer function
const appliedJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPLIEDJOBS_SUCCESS:
      return {
        ...state,
        appliedJobsDetails: action.payload, // <-- Corrected the field name
        error: null,
      };
    // case FETCH_APPLIEDJOBS_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    default:
      return state;
  }
};

export default appliedJobsReducer;
