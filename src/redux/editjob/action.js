import {SET_EDIT_JOB_STATUS} from '../ActionTypes';

export const setEditJobStatus = status => ({
  type: SET_EDIT_JOB_STATUS,
  payload: status,
});
