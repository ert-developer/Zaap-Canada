import {STORE_APPLICANTSPROFILE_DETAILS} from '../ActionTypes';

export const storeApplicantsProfileDetails = profileDetails => {
  return {
    type: STORE_APPLICANTSPROFILE_DETAILS,
    payload: profileDetails,
  };
};
