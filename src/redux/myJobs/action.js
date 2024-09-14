import {POST_JOBS_REQUEST, POST_JOBS_SUCCESS, POST_JOBS_FAILURE} from '../ActionTypes';
import {fetchCollectionDetails} from '../../common/collection';
import { envConfig } from '../../assets/helpers/envApi';

export const fetchMyJobs = () => {
  return async dispatch => {
    dispatch(postJobRequest());
    try {
      const jobCollection = await fetchCollectionDetails(envConfig.Jobs);
      dispatch(postJobSuccess(jobCollection));
    } catch (error) {
      logError(error);
      dispatch(postJobFailure(error));
    }
  };
};

export const postJobRequest = () => ({
  type: POST_JOBS_REQUEST,
});

export const postJobSuccess = payload => ({
  type: POST_JOBS_SUCCESS,
  payload: payload,
});

export const postJobFailure = error => ({
  type: POST_JOBS_FAILURE,
  payload: error,
});
