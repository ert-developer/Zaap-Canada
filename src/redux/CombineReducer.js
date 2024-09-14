import {combineReducers} from 'redux';
import homeReducer from '../redux/home/reducer';
import AuthReducer from '../redux/auth/reducer';
import myJobsReducer from '../redux/myJobs/reducer';
import paymentReducer from '../redux/payment/reducer';
import ThemeReducer from '../redux/dark-light-theme/reducer';
import authReducer from './providerstatus/reducer';
import FavoutiteReducer from './favourite/reducer';
import appliedJobsReducer from './appliedjobs/reducer';
import checkprofilejobReducer from './checkprofilejobdetails/reducer';
import applicantProfileDetailsReducer from './applicantprofiledetails/reducer';
import selectedProfileReducer from './selectedprofiledetails/reducer';
import selectedJobsReducer from './selectedjobs/reducer';
import completedJobsReducer from './completedjobs/reducer';
import locationReducer from './location/reducer';
import getSubCategoryNameReducer from './popularcategories-more/reducer';
import selectedJObDetailsReducer from './selectedjobdetails/reducer';
import editJobStatusReducer from './editjob/reducer';
import unreadMessagesReducer from './unreadmessages/reducer';

const rootReducer = combineReducers({
  selectedProfiles: selectedProfileReducer,
  applicantProfileDetails: applicantProfileDetailsReducer,
  checkProfileJob: checkprofilejobReducer,
  providerverification: authReducer,
  favourite: FavoutiteReducer,
  home: homeReducer,
  theme: ThemeReducer,
  Auth: AuthReducer,
  myJobs: myJobsReducer, // Need to use this reducer (my Jobs + Post Job)
  payment: paymentReducer,
  appliedjobs: appliedJobsReducer,
  selectedJobs: selectedJobsReducer,
  completedJobs: completedJobsReducer,
  subCategory: getSubCategoryNameReducer,
  serviceproviderselectedjobDetails: selectedJObDetailsReducer,

  location: locationReducer,
  editJobStatusReducer: editJobStatusReducer,
  unreadMessages: unreadMessagesReducer,
});

export default rootReducer;
