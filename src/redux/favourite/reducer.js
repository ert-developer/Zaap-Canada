// reducers/favouriteReducer.js
import {ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE} from '../ActionTypes';

const initialState = {
  favouriteItems: [],
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITE: {
      const isExists = state.favouriteItems.find(eachItem => eachItem.id === action.payload.id);
      if (isExists === undefined) {
        return {
          favouriteItems: [...state.favouriteItems, {...action.payload, isFav: true}],
        };
      }
      return state;
    }

    case REMOVE_FROM_FAVOURITE: {
      const id = action.payload.id;
      const updatedFavourites = state.favouriteItems.filter(item => item.id !== id);
      return {favouriteItems: updatedFavourites};
    }

    default:
      return state;
  }
};

export default favouriteReducer;
