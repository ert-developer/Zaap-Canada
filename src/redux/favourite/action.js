import {ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE} from '../ActionTypes';
export const updateAddtoFavourite = items => ({
  type: ADD_TO_FAVOURITE,
  payload: items,
});

export const removeFavourite = items => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: items,
});
