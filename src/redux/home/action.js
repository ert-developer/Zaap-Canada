import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  TOGGLE_CATEGORY,
  FETCH_SPOTLIGHT_REQUEST,
  FETCH_SPOTLIGHT_SUCCESS,
  FETCH_SPOTLIGHT_FAILURE,
} from '../ActionTypes';
import {fetchCollectionDetails, fetchJobsAd} from '../../common/collection';
import {logError} from '../../utils/logger/logger';
import {envConfig} from '../../assets/helpers/envApi';

export const toggleCategory = category => ({
  type: TOGGLE_CATEGORY,
  payload: category,
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = categoryData => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categoryData,
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => {
  return async dispatch => {
    dispatch(fetchCategoriesRequest());
    try {
      const categories = await fetchCollectionDetails(envConfig.Categories);
      dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
      logError(error);
      dispatch(fetchCategoriesFailure(error));
    }
  };
};
export const fetchJobsRequest = () => ({
  type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = jobData => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobData,
});

export const fetchJobsFailure = error => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

// export const fetchAllJobs = (page, pageSize) => {
//   return async (dispatch, getState) => {
//     dispatch(fetchJobsRequest());
//     try {
//       // Fetch jobs for the specified page and size
//       const jobData = await fetchCollectionDetails(envConfig.Jobs, page, pageSize);

//       // Combine existing jobs with the newly fetched jobs
//       const currentJobs = getState().home.jobs;
//       const updatedJobs = [...currentJobs, ...jobData];

//       // Dispatch the success action with the updated jobs and current page
//       dispatch(fetchAllJobsSuccess(updatedJobs, page));
//     } catch (error) {
//       console.error(error);
//       dispatch(fetchJobsFailure(error));
//     }
//   };
// };

export const fetchAllJobs = () => {
  return async dispatch => {
    dispatch(fetchJobsRequest());
    try {
      const jobData = await fetchCollectionDetails(envConfig.Jobs);
      dispatch(fetchJobsSuccess(jobData));
    } catch (error) {
      console.error(error);
      dispatch(fetchJobsFailure(error));
    }
  };
};

export const fetchAllJobsSuccess = (jobData, page) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: {jobs: jobData, currentPage: page},
});

export const fetchSpotlightRequest = () => ({
  type: FETCH_SPOTLIGHT_REQUEST,
});

export const fetchSpotlightSuccess = spotlightJobs => ({
  type: FETCH_SPOTLIGHT_SUCCESS,
  payload: spotlightJobs,
});

export const fetchSpotlightFailure = error => ({
  type: FETCH_SPOTLIGHT_FAILURE,
  payload: error,
});

export const fetchSpotlightJobs = () => {
  return async dispatch => {
    dispatch(fetchSpotlightRequest());
    try {
      const querySnapshot = await fetchCollectionDetails(envConfig.jobs).where('jobAds.type', '==', 'SPOTLIGHT').get();

      const spotlightJobs = [];
      querySnapshot.forEach(documentSnapshot => {
        spotlightJobs.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      dispatch(fetchSpotlightSuccess(spotlightJobs));
    } catch (error) {
      console.error(error);
      dispatch(fetchSpotlightFailure(error));
    }
  };
};
