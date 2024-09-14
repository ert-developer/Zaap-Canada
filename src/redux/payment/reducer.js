import {PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE} from '../ActionTypes';

const initialState = {
  isPaymenting: false,
  paymentData: [],
  error: null,
};
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {...state, isPaymenting: true};
    case PAYMENT_SUCCESS:
      return {
        isPaymenting: false,
        paymentData: action.payload,
        error: null,
      };
    case PAYMENT_FAILURE:
      return {
        isPaymenting: false,
        paymentData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
