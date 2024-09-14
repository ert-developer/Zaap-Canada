import { FETCH_SELECTED_PROFILES_SUCCESS,FETCH_SELECTED_PROFILES_FAILURE} from "../ActionTypes";
const initialState = {
  candidateDetails: [],
  error: null,
};


const selectedProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELECTED_PROFILES_SUCCESS:
      return {
        ...state,
        candidateDetails: action.payload,
        error: null,
      };
    // case FETCH_SELECTED_PROFILES_FAILURE:
    //   return {
    //     ...state,
    //     candidateDetails: [],
    //     error: action.payload,
    //   };
    default:
      return state;
  }
};


export default selectedProfileReducer;
