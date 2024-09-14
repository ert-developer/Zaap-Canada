import {collection, getDocs} from 'firebase/firestore';
import {FETCH_SELECTED_JOBS_SUCCESS, FETCH_SELECTED_JOBS_FAILURE} from '../ActionTypes';
import {db} from '../../../firebaseDb';
import {envConfig} from '../../assets/helpers/envApi';

export const fetchSelectedJobs = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(collection(db, envConfig.SelectedJobs));
      const selectedJobsData = querySnapshot.docs.map(doc => doc.data());

      // Dispatch the data directly

      dispatch(fetchSelectedJobsSuccess(selectedJobsData));
    } catch (error) {
      console.error('Error fetching Selected Jobs data:', error);
      // Dispatch an error action if needed
      // dispatch(fetchSelectedJobsFailure(error));
    }
  };
};
export const fetchSelectedJobsSuccess = data => ({
  type: FETCH_SELECTED_JOBS_SUCCESS,
  payload: data,
});

// Uncomment the block below if you want to dispatch an error action
// export const fetchSelectedJobsFailure = error => ({
//   type: FETCH_SELECTED_JOBS_FAILURE,
//   payload: error,
// });
