// reducer.js
import { UPDATE_PROVIDER_STATUS,FETCH_SERVICEPROVIDER_DETAILS } from "../ActionTypes";
const initialState = {
  providerStatus: false,
  providerDetails: [],
  bio:""

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROVIDER_STATUS:
      return {
        ...state,
        providerStatus: action.payload,
        bio:action.data
      };

      case FETCH_SERVICEPROVIDER_DETAILS:
   return {
      ...state,
      providerDetails: action.payload,
   };

    default:
      return state;
  }
};

export default authReducer;