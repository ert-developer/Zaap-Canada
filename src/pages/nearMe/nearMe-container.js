import React, {useEffect} from 'react';
import NearMeScreen from './nearMe-screen';
import {useDispatch, useSelector} from 'react-redux';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {Alert} from 'react-native';

const NearMeContainer = () => {
  const latlang = useSelector(state => state?.location?.latlang);
  return <NearMeScreen latlang={latlang} />;
};

export default NearMeContainer;
