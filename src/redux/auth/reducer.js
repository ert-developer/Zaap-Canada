import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../ActionTypes";

const initialState = {
  isLogIn: false,
  user: { 
},
  authError: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogIn: true,

        authError: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authError: action.payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        authError: null,
        isLogIn: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
        authError: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
