import { STORE_CHECKPROFILE_JOB_DETAILS } from "../ActionTypes";
const initialState = {
  jobDetails: null,
};

const checkprofilejobReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CHECKPROFILE_JOB_DETAILS:
      return {
        ...state,
        jobDetails: action.payload,
      };
    default:
      return state;
  }
};

export default checkprofilejobReducer;
