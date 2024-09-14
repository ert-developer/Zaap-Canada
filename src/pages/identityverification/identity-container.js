import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import HeaderComponent from '../../atoms/header/headerComponent';
import LoadingIndicator from '../../atoms/loadingIndicator/LoadingIndicator';
import IdentityVerificationScreen from './identity-screen';
const IdentityVerificationContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const OpenServiceProvideForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('verification');
      setIsLoading(false);
    }, 1000);
  };
  return (
    <React.Fragment>
      <HeaderComponent text={'Identity Verification'} />
      <IdentityVerificationScreen OpenServiceProvideForm={OpenServiceProvideForm} isLoading={isLoading} />
    </React.Fragment>
  );
};

export default IdentityVerificationContainer;
