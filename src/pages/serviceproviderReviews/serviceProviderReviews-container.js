import React from 'react';
import ServiceProviderReviewsScreen from './serviceProviderReviews-screen';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ServiceProviderReviewsContainer = ({route}) => {
  const {feedbackData, firstLetter} = route.params;

  return <ServiceProviderReviewsScreen feedbackData={feedbackData} firstLetter={firstLetter} />;
};

export default ServiceProviderReviewsContainer;
