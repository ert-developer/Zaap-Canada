const envType = 'prod'; // dev | uat | prod
let envConfig;
import {GOOGLE_API_KEY_DEV, GOOGLE_API_KEY_UAT, GOOGLE_API_KEY_PROD} from '@env';

switch (envType) {
  case 'dev':
    envConfig = {
      Categories: 'Categories_dev',
      Favorite: 'Favorite_dev',
      Jobs: 'Jobs_dev',
      User: 'User_dev',
      UsersPayment: 'UsersPayment_dev',
      WorkerInfo: 'WorkerInfo_dev',
      chats: 'chats_dev',
      Provider: 'Provider_dev',
      Provider_docs: 'Provider_docs_dev',
      AppliedJobs: 'AppliedJobs_dev',
      CancelJobs: 'CancelJobs_dev',
      Notifications: 'Notifications_dev',
      Payments: 'PaymentDetails_dev',
      Premium_ads: 'Premium_ads_dev',
      SelectedJobs: 'SelectedJobs_dev',
      completedJobs: 'completedJobs_dev',
      customer_Feedback: 'customer_Feedback_dev',
      expired_Jobs: 'expired_Jobs_dev',
      feedback: 'feedback_dev',
      job_reports: 'job_report_dev',
      portfolio: 'portfolio_dev',
      serviceProvider_Feedback: 'serviceProvider_Feedback_dev',
      updateBankDetails: 'updateBankDetails_dev',
      updateGovtIdDetails: 'updateGovtIdDetails_dev',
      selectedProfiles: 'selectedProfiles_dev',
      GOOGLE_API_KEY: GOOGLE_API_KEY_DEV,
      message: 'message_dev',
      chatlist: 'chatlist_dev',
      common: 'common_dev',
      myjobs: 'myjobs_dev',
    };
    break;
  case 'uat':
    envConfig = {
      Categories: 'Categories_dev',
      Favorite: 'Favorite_uat',
      Jobs: 'Jobs_uat',
      User: 'User_uat',
      UsersPayment: 'UsersPayment_uat',
      WorkerInfo: 'WorkerInfo_uat',
      chats: 'chats_uat',
      Provider: 'Provider_uat',
      Provider_docs: 'Provider_docs_uat',
      AppliedJobs: 'AppliedJobs_uat',
      CancelJobs: 'CancelJobs_uat',
      Notifications: 'Notifications_uat',
      Payments: 'PaymentDetails_uat',
      Premium_ads: 'Premium_ads_uat',
      SelectedJobs: 'SelectedJobs_uat',
      completedJobs: 'completedJobs_uat',
      customer_Feedback: 'customer_Feedback_uat',
      expired_Jobs: 'expired_Jobs_uat',
      feedback: 'feedback_uat',
      job_reports: 'job_reports_uat',
      portfolio: 'portfolio_uat',
      serviceProvider_Feedback: 'serviceProvider_Feedback_uat',
      updateBankDetails: 'updateBankDetails_uat',
      updateGovtIdDetails: 'updateGovtIdDetails_uat',
      selectedProfiles: 'selectedProfiles_uat',
      // base url will put here
      GOOGLE_API_KEY: GOOGLE_API_KEY_UAT,
      message: 'message_uat',
      chatlist: 'chatlist_uat',
      common: 'common_uat',
      myjobs: 'myjobs_uat',
    };
    break;
  case 'prod':
    envConfig = {
      Categories: 'Categories_dev',
      Favorite: 'Favorite',
      Jobs: 'Jobs',
      User: 'User',
      UsersPayment: 'UsersPayment',
      WorkerInfo: 'WorkerInfo',
      chats: 'chats',
      Provider: 'Provider',
      Provider_docs: 'Provider_docs',
      AppliedJobs: 'AppliedJobs',
      CancelJobs: 'CancelJobs',
      Notifications: 'Notifications',
      Payments: 'PaymentDetails',
      Premium_ads: 'Premium_ads',
      SelectedJobs: 'SelectedJobs',
      completedJobs: 'completedJobs',
      customer_Feedback: 'customer_Feedback',
      expired_Jobs: 'expired_Jobs',
      feedback: 'feedback',
      job_reports: 'job_reports',
      portfolio: 'portfolio',
      serviceProvider_Feedback: 'serviceProvider_Feedback',
      updateBankDetails: 'updateBankDetails',
      updateGovtIdDetails: 'updateGovtIdDetails',
      selectedProfiles: 'selectedProfiles',
      // base url will put here
      GOOGLE_API_KEY: GOOGLE_API_KEY_PROD,
      message: 'message',
      chatlist: 'chatlist',
      common: 'common',
      myjobs: 'myjobs',
    };
    break;
  default:
    throw new Error(`Unsupported environment type: ${envType}`);
}

export {envConfig};
