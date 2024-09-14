import { FETCH_SELECTED_PROFILES_SUCCESS, FETCH_SELECTED_PROFILES_FAILURE } from "../ActionTypes";
import { fetchCollectionDetails } from "../../common/collection";
import { db } from "../../../firebaseDb";
import { collection, getDocs,where, query } from 'firebase/firestore';
import { envConfig } from "../../assets/helpers/envApi";


export const fetchSelectedProfileDetails = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(collection(db, envConfig.selectedProfiles));
      const selectedCandidatesProfile = querySnapshot.docs.map(doc => doc.data());

      // Dispatch the success action with the retrieved data
      dispatch(fetchSelectedProfileSuccess(selectedCandidatesProfile));
    } catch (error) {
      // If an error occurs during the asynchronous operation, log the error
      console.error('Error fetching Selected Profiles data:', error);

      // Dispatch the failure action with the error
      dispatch(fetchSelectedProfileFailure(error));
    }
  };
};
export const fetchSelectedProfileSuccess = (data) => ({
  type: FETCH_SELECTED_PROFILES_SUCCESS,
  payload: data,
});

export const fetchSelectedProfileFailure = (error) => ({
  type: FETCH_SELECTED_PROFILES_FAILURE,
  payload: error, 
});
