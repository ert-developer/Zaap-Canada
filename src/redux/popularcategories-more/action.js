import { FETCHSUBCATEGORYNAME } from "../ActionTypes";

export const getSubCategoryName = (subCategoryName) => {
    return {
      type: FETCHSUBCATEGORYNAME,
      payload: subCategoryName,
    };
  };