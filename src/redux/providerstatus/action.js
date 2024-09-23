// actions.js

import {UPDATE_PROVIDER_STATUS, FETCH_SERVICEPROVIDER_DETAILS} from '../ActionTypes';
import {collection, getDocs, query, where} from 'firebase/firestore'; // Import where from firebase/firestore
import {db} from '../../../firebaseDb';
import {envConfig} from '../../assets/helpers/envApi';

export const fetchServiceProviderDetails = userid => {
  return async dispatch => {
    try {
      const q = query(
        collection(db, envConfig.Provider),
        where('provider_id', '==', userid), // Add a where clause to filter by provider_id
      );
      const querySnapshot = await getDocs(q);
      const serviceProviderDetails = querySnapshot.docs.map(doc => doc.data());
      // console.log("serviceProviderD=============================================etails",serviceProviderDetails)
      dispatch(serviceproviderdetissuccess(serviceProviderDetails));
    } catch (error) {
      console.error('Error fetching service provider details:', error);
    }
  };
};

export const updateProviderStatus = (status, bio) => ({
  type: UPDATE_PROVIDER_STATUS,
  payload: status,
  data: bio,
});

export const serviceproviderdetissuccess = details => ({
  type: FETCH_SERVICEPROVIDER_DETAILS,
  payload: details,
});
