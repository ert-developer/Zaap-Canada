import {PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE} from '../ActionTypes';

export const paymentRequest = () => ({
  type: PAYMENT_REQUEST,
});

export const paymentSuccess = payload => ({
  type: PAYMENT_SUCCESS,
  payload: payload,
});

export const paymentFailure = error => ({
  type: PAYMENT_FAILURE,
  payload: error,
});
