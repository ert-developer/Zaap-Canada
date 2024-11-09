// PostAuthStack.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomDrawer from '../drawer-navigation/drawer-navigation';
import BottomTabStack from '../bottom-navigation/bottom-navigation-stack';
import JobDetailContainer from '../../../pages/jobDetail/job-detail-container';
import JobsListContainer from '../../../pages/jobsList/jobs-list-container';
import CategoriesListContainer from '../../../pages/categoriesList/categories-list-container';
import ProfileContainer from '../../../pages/profile/profile-container';
import CustomLoader from '../../../organisms/customLoader';
import LogOut from '../../../pages/log-out/logout-screen';
import LoginContainer from '../../../pages/login/login-container';
import DevelopmentScreen from '../../../atoms/developmentScreen/dev-screen';
import ProviderProfileContainer from '../../../pages/providerProfile/provider-profile-container';
import MyJobServiceContainer from '../../../pages/myJob/serviceProvider/myJob-container';
import SpotLightContainer from '../../../pages/spotLight/spotLight-container';
import ContactUs from '../../../pages/contactUs/contactUs-screen';
import ProviderFeedbackContainer from '../../../pages/providerFeedback/provider-feedback-container';
import ProviderPaymentContainer from '../../../pages/providerpayment/provider-payment-container';
import PreviousJobsPaymentContainer from '../../../pages/previousjobspayment/previousjobs-payment-container';
const Stack = createStackNavigator();
import SearchJobsContainer from '../../../pages/searchJobs/searchJobs-container';
import MoreJobscontainer from '../../../pages/popularMore/moreJobs-container';
import FavouritConatiner from '../../../pages/favourite/favourite-container';
import NearMeConatiner from '../../../pages/locationHome/location-conatiner';
import LocationConatiner from '../../../pages/locationHome/location-conatiner';
import IdentityVerificationContainer from '../../../pages/identityverification/identity-container';
import ChatListContainer from '../../../pages/chats/addedUsers/chat-list-container';
import ChatContainer from '../../../pages/chats/message/message-container';
import ChatListContainerList from '../../../pages/chats/allUsers/chat-all-container';
import ReportContainer from '../../../pages/report/report-container';
import SubCategoryContainer from '../../../pages/subcategory/subcategory-container';
import ContactUsQuestionsScreen from '../../../pages/contactUs/contact-us-questions-screen';
import ServiceProviderProfileContainer from '../../../pages/serviceproviderprofile/service-provider-profile-container';
import PremiumAdsContainer from '../../../pages/premiumads/premium-ads-container';
import PremiumAdsCartContainer from '../../../pages/premiumadscart/premium-ads-cart-container';
import PortfolioContainer from '../../../pages/portfolio/portfolio-container';
import AddPortfolioContainer from '../../../pages/addportfolio/add-portfolio-container';
import InvoiceContainer from '../../../pages/invoices/invoice-container';
import InvoiceDetailScreen from '../../../pages/invoices/invoice-detail-screen'; // Import the InvoiceDetailScreen
import UpdateBankDetailsContainer from '../../../pages/updatebankdetails/update-bank-details-container';
import UpdateGovtIdDetailsContainer from '../../../pages/updategovtiddetails/update-govt-id-details-container';
import ServiceProviderPortfolioContainer from '../../../pages/profileportfolio/service-provider-portfolio-container';
import ViewCustomerProfileContainer from '../../../pages/viewcustomerprofile/view-customer-profile-container';
import ServiceProviderPublicProfileContainer from '../../../pages/serviceproviderpublicprofile/service-provider-public-profile-container';
import NearMeJobsContainer from '../../../pages/nearMeJobsCards/near-me-jobs-card-container';
import MyEarningsContainer from '../../../pages/myEarnings/my-earnings-container';
import MyEarningScreen from '../../../pages/myEarnings/my-earnings-screen';
import MyearningsDetails from '../../../pages/myEarnings/my-earnings-details.js';
import FeedbackContainer from '../../../pages/feedback/feedback-container';
import NotificationContainer from '../../../pages/notification/notification-container';
import ServiceProviderReviewsContainer from '../../../pages/serviceproviderReviews/serviceProviderReviews-container.js';
import PortfolioDetailsScreen from '../../../molecules/portfoliolinkmodal/PortfolioDetailsScreen';

const PostAuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomDrawer"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProviderFeedbackScreen" component={ProviderFeedbackContainer} />
      <Stack.Screen name="FavouriteScreen" component={FavouritConatiner} />
      <Stack.Screen name="IdentityVerificationScreen" component={IdentityVerificationContainer} />
      <Stack.Screen name="ProviderPaymentScreen" component={ProviderPaymentContainer} />
      <Stack.Screen name="PreviousJobsPaymentScreen" component={PreviousJobsPaymentContainer} />
      <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
      <Stack.Screen name="CategoryList" component={CategoriesListContainer} />
      <Stack.Screen name="JobsList" component={JobsListContainer} />
      <Stack.Screen name="JobDeatil" component={JobDetailContainer} />
      <Stack.Screen name="CustomLoader" component={CustomLoader} />
      <Stack.Screen name="verification" component={ProviderProfileContainer} />
      <Stack.Screen name="logout" component={LogOut} />
      <Stack.Screen name="login" component={LoginContainer} />
      <Stack.Screen name="develop" component={DevelopmentScreen} />
      <Stack.Screen name="myjobservice" component={MyJobServiceContainer} />
      <Stack.Screen name="ProfileScreen" component={ProfileContainer} />
      <Stack.Screen name="SpotLight" component={SpotLightContainer} />
      <Stack.Screen name="contactus" component={ContactUs} />
      <Stack.Screen name="popular" component={MoreJobscontainer} />
      <Stack.Screen name="search" component={SearchJobsContainer} />
      <Stack.Screen name="nearMe" component={LocationConatiner} />
      <Stack.Screen name="maps" component={NearMeConatiner} />
      <Stack.Screen name="SubCategoryScreen" component={SubCategoryContainer} />
      <Stack.Screen name="Report" component={ReportContainer} />
      <Stack.Screen name="contactUsQuestions" component={ContactUsQuestionsScreen} />
      <Stack.Screen name="OneChat" component={ChatContainer} />
      <Stack.Screen name="ServiceProviderProfile" component={ServiceProviderProfileContainer} />
      <Stack.Screen name="PremiumAds" component={PremiumAdsContainer} />
      <Stack.Screen name="PremiumAdsCart" component={PremiumAdsCartContainer} />
      <Stack.Screen name="Portfolio" component={PortfolioContainer} />
      <Stack.Screen name="AddPortfolio" component={AddPortfolioContainer} />
      <Stack.Screen name="Invoices" component={InvoiceContainer} />
      <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
      <Stack.Screen name="UpdateBankDetails" component={UpdateBankDetailsContainer} />
      <Stack.Screen name="UpdateGovtDetails" component={UpdateGovtIdDetailsContainer} />
      <Stack.Screen name="ProfilePortfolio" component={ServiceProviderPortfolioContainer} />
      <Stack.Screen name="viewProfile" component={ViewCustomerProfileContainer} />
      <Stack.Screen name="ServiceProviderPublicProfile" component={ServiceProviderPublicProfileContainer} />
      <Stack.Screen name="nearmejobs" component={NearMeJobsContainer} />
      <Stack.Screen name="myEarnings" component={MyEarningsContainer} />
      <Stack.Screen name="myEarningsScreen" component={MyEarningScreen} />
      <Stack.Screen name="myEarningsDetails" component={MyearningsDetails} />
      <Stack.Screen name="feedback" component={FeedbackContainer} />
      <Stack.Screen name="Notification" component={NotificationContainer} />
      <Stack.Screen name="ServiceProviderReviews" component={ServiceProviderReviewsContainer} />
      <Stack.Screen name="PortfolioDetails" component={PortfolioDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PostAuthStack;

export const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
    </Stack.Navigator>
  );
};

export const ProfileScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileContainer} />
    </Stack.Navigator>
  );
};

export const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chat" component={ChatListContainer} />
      <Stack.Screen name="ListAll" component={ChatListContainerList} />
    </Stack.Navigator>
  );
};
