import React from 'react';
import SpotLightScreen from './spotLight-screen';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';

const SpotLightContainer = ({route, navigation}) => {
  const user = useSelector(state => state.Auth.user);

  const incrementAdViews = async (adId, userId) => {
    try {
      const adRef = firestore().collection(envConfig.Jobs).doc(adId);
      const adDoc = await adRef.get();

      // Check if the user has not viewed the ad before
      if (!adDoc.data()?.viewedBy?.includes(userId)) {
        // Update the views count and add the user to the viewedBy array
        await adRef.update({
          // views: firestore.FieldValue.increment(1),
          viewedBy: firestore.FieldValue.arrayUnion(userId),
        });
        dispatch(fetchAllJobs());
      }
    } catch (error) {
      console.error('Error incrementing ad views:', error);
    }
  };

  const {spotLight} = route.params;
  const handleJobPress = job => {
    incrementAdViews(job.id, user.userId);

    navigation.navigate('JobDeatil', {
      imageSource: job.imageUrls[0],
      category: job.data.category,
      title: job.data.jobTitle,
      description: job.data.jobDescription,
      price: job.data.salary,
      location: job?.locationDesc?.description,
      postedBy: job.postedBy,
      id: job.id,
      jobAdType: job.jobAds.type,
      createdOn: job.createdOn,
      starttime: job.data.starttime,
      startdate: job.data.startdate,
      subCategory: job.data.subCategory,
      images: job.imageUrls,
      area: job.area,
      lat: job.location.lat,
      lng: job.location.lng,
      address: job.address,
      userName: job.userName,
      IsPaid: job.IsPaid ? job.IsPaid : false,
    });
  };
  return <SpotLightScreen spotLigt={spotLight} handleJobPress={handleJobPress} navigation={navigation} />;
};

export default SpotLightContainer;
