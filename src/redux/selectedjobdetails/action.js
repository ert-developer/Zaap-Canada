import {GET_SELECTED_JOB_DETAILS} from '../ActionTypes';
export const getSelectedProfilesJobDetails = jobDetails => {
  return {
    type: GET_SELECTED_JOB_DETAILS,
    payload: jobDetails,
  };
};
