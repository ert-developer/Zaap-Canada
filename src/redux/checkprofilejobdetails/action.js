import { STORE_CHECKPROFILE_JOB_DETAILS } from "../ActionTypes";

export const storeProfileJobDetails = (jobDetails) => {
    return {
      type: STORE_CHECKPROFILE_JOB_DETAILS,
      payload: jobDetails,
    };
  };