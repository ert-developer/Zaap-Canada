import { FETCHSUBCATEGORYNAME } from "../ActionTypes";

const initialState = {
  SubCategoryName: null,
};

const getSubCategoryNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHSUBCATEGORYNAME:
      return {
        ...state,
        SubCategoryName: action.payload,
      };
    default:
      return state;
  }
};

export default getSubCategoryNameReducer;
