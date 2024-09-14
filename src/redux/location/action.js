import {CURRENT_LOCATION, LATLANG, PERMISSION} from '../ActionTypes';

export const currentLocation = loc => ({
  type: CURRENT_LOCATION,
  payload: loc,
});

export const permission = res => ({
  type: PERMISSION,
  payload: res,
});

export const latLang = pos => ({
  type: LATLANG,
  payload: pos,
});
