import {POST_JOBS_REQUEST, POST_JOBS_SUCCESS, POST_JOBS_FAILURE} from '../ActionTypes';

const initialState = {
  isPostingJobs: false,
  jobs: [],
  error: null,
};

const myJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_JOBS_REQUEST:

      return {...state, isPostingJobs: true};
    case POST_JOBS_SUCCESS:

      return {
        isPostingJobs: false,
        jobs: action.payload,
        error: null,

      };
    case POST_JOBS_FAILURE:
      return {
        isPostingJobs: false,
        jobs: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default myJobsReducer;
