import {useState, useEffect} from 'react';
import ServiceProviderPublicProfileScreen from './service-provider-public-profile-screen';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {getDocs, collection, where, query} from 'firebase/firestore';
import {db} from '../../../firebaseDb';
import moment from 'moment';
import { envConfig } from '../../assets/helpers/envApi';

const ServiceProviderPublicProfileContainer = () => {
  const navigation = useNavigation();

  const user = useSelector(state => state.Auth.user);
  const providerStatus = useSelector(state => state.providerverification.providerDetails);

  const [feedbackData, setFeedbackData] = useState([]);
  const [starRatingCount, setTotalStarRating] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const languages = providerStatus[0];
  const location =
    providerStatus[0]?.city == undefined || providerStatus[0]?.state == undefined
      ? 'No Info provided'
      : `${providerStatus[0]?.city}, ${providerStatus[0]?.state}, IN`;
  const knowLanguages = languages?.languages_known;

  const date = moment(providerStatus[0]?.createdOn);
  const momentDate = moment.utc(date);
  const formattedDate = momentDate.format('DD MMM YYYY');

  /////////Open the Reviews///////

  ///////////Navigate to Service Provider Portpofolio///////
  const handlePortfolioOpen = () => {
    navigation.navigate('ProfilePortfolio', {profileUserID: user?.userId});
  };

  ////////////Getting Customer Feedback Data/////////////
  const fetchCustomerFeedbackData = async () => {
    try {
      const q = query(collection(db, envConfig.customer_Feedback), where('candidateUserId', '==', user?.userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      let totalStarRating = 0;
      // let feedbackCount = 0;

      // Iterate through each feedback entry
      data.forEach(feedback => {
        totalStarRating += feedback.startRating; // Add the startRating to total
        // feedbackCount++; // Increment the feedback count
      });
      setTotalStarRating(totalStarRating);
      setFeedbackData(data);
    } catch (error) {
      console.error('Error fetching Customer Feedback data:', error);
      // Handle error if needed
    }
  };

  const firstLetter = feedbackData.map(feedback => feedback.customerName.slice(0, 1));

  useEffect(() => {
    fetchCustomerFeedbackData();
  }, []);

  return (
    <ServiceProviderPublicProfileScreen
      profileDetails={providerStatus[0]}
      location={location}
      feedbackData={feedbackData}
      starRatingCount={starRatingCount}
      firstLetter={firstLetter}
      formattedDate={formattedDate}
      // languages={['Telugu', 'Hindi']}
      languages={[knowLanguages]}
      setIsReviewOpen={setIsReviewOpen}
      handlePortfolioOpen={handlePortfolioOpen}
    />
  );
};

export default ServiceProviderPublicProfileContainer;
