import { FETCH_COMPLETED_JOBS_SUCCESS } from "../ActionTypes";
import { fetchCollectionDetails } from "../../common/collection";
import { envConfig } from "../../assets/helpers/envApi";

export const fetchCompletedJobs = () => {
  return async (dispatch) => {
    try {
      const completedJobs = await fetchCollectionDetails(envConfig.completedJobs);
      dispatch(fetchCompletedJobSuccess(completedJobs));
      // console.log("completedJobscompletedJobs",completedJobs)
    } catch (error) {
      console.error('Error fetching Completed Jobs data:', error);
    }
  };
};

export const fetchCompletedJobSuccess = (data) => ({
  type: FETCH_COMPLETED_JOBS_SUCCESS,
  payload: data,
});
