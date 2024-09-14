import { FETCH_COMPLETED_JOBS_SUCCESS } from "../ActionTypes";
// Initial state
const initialState = {
  completedJobs: [],
};

// Reducer function
const completedJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPLETED_JOBS_SUCCESS:
      return {
        ...state,
        completedJobs: action.payload,
      };
    default:
      return state;
  }
};

export default completedJobsReducer;
