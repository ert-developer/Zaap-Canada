import { collection, getDocs } from 'firebase/firestore';
import { fetchCollectionDetails } from '../../common/collection';
import { FETCH_APPLIEDJOBS_FAILURE, FETCH_APPLIEDJOBS_SUCCESS } from '../ActionTypes';
import { db } from '../../../firebaseDb';
import { envConfig } from '../../assets/helpers/envApi';
export const fetchAppliedJobs = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(collection(db, envConfig.AppliedJobs));
      const appliedJobData = querySnapshot.docs.map(doc => doc.data());
      
      // Instead of using fetchCollectionDetails, directly dispatch the data
      dispatch(fetchAppliedJobsSuccess(appliedJobData));
    } catch (error) {
      console.error('Error fetching Applied Jobs data:', error);
      // dispatch(fetchAppliedJobsFailure(error));
    }
  };
};

export const fetchAppliedJobsSuccess = data => ({
  type: FETCH_APPLIEDJOBS_SUCCESS,
  payload: data,
});

// export const fetchAppliedJobsFailure = error => ({
//   type: FETCH_APPLIEDJOBS_FAILURE,
//   payload: error,
// });
