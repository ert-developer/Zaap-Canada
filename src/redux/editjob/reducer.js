import {SET_EDIT_JOB_STATUS} from '../ActionTypes';

const initialState = {
  jobId: null,
  editJobStatus: false,
};

const editJobStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_JOB_STATUS:
      return {
        ...state,
        jobId: action.payload.jobId,
        editJobStatus: action.payload.editJobStatus,
      };
    default:
      return state;
  }
};

export default editJobStatusReducer;
