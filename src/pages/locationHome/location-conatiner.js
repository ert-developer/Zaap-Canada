import React, {useState} from 'react';
import NearMe from './location-screen';
import LocationScreen from './location-screen';

const LocationConatiner = ({navigation}) => {
  const backNavigation = () => {
    navigation.goBack();
  };
  return <LocationScreen backNavigation={backNavigation} navigation={navigation} />;
};

export default LocationConatiner;
