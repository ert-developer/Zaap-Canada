import { FETCH_SELECTED_JOBS_SUCCESS } from "../ActionTypes";

// Initial state
const initialState = {
  selectedJobs: [],
};

// Reducer function
const selectedJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELECTED_JOBS_SUCCESS:
      return {
        ...state,
        selectedJobs: action.payload,
      };
    default:
      return state;
  }
};

export default selectedJobsReducer;