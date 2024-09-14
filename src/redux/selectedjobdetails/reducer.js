import { GET_SELECTED_JOB_DETAILS } from "../ActionTypes";

const initialState = {
   selectedJobDetails: null,
    // Other properties in your state
  };
  
  const selectedJObDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SELECTED_JOB_DETAILS:
        return {
          ...state,
          selectedJobDetails: action.payload,
        };
      // Other cases for different action types
  
      default:
        return state;
    }
  };
  
  export default selectedJObDetailsReducer;
  