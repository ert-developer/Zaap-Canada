import ProviderPaymentScreen from './provider-payment-screen';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import LoadingIndicator from '../../atoms/loadingIndicator/LoadingIndicator';

const ProviderPaymentContainer = () => {
  const navigation = useNavigation();
  // const selectedJobDetails = useSelector(state => state.serviceproviderselectedjobDetails.selectedJobDetails);
  // console.log('selectedJobDetails', selectedJobDetails);
  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails);
  // console.log('jobDetails', jobDetails);
  const backNavigation = () => {
    navigation.goBack();
  };

  return <ProviderPaymentScreen backNavigation={backNavigation} selectedJobDetails={jobDetails} />;
};

export default ProviderPaymentContainer;
