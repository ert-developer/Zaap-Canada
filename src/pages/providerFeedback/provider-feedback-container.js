import React from 'react';
import CustomText from '../../atoms/text/textComponent';
import ProviderFeedbackScreen from './provider-feedback-screen';
import {useNavigation} from '@react-navigation/native';
import {fetchCollectionDetails} from '../../common/collection';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {db} from '../../../firebaseDb';
import moment from 'moment';
import {getDocs, collection, where, query} from 'firebase/firestore';
import CustomLoader from '../../organisms/customLoader';
import LoadingIndicator from '../../atoms/loadingIndicator/LoadingIndicator';
import {envConfig} from '../../assets/helpers/envApi';

const ProviderFeedbackContainer = () => {
  const user = useSelector(state => state.Auth.user);
  const userId = user.userId;
  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails);
  const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails);
  const [providerStatus, setProviderStatus] = useState([]);
  const [loader, setLoader] = useState(true);

  // console.log('userI-----------d', profiledetail);
  let serviceProviderUserId = profiledetail.userId || userId;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const feedBacks = [
    {
      name: 'Brijesh Gupta',
      Date: '21/04/23',
      stars: '⭐⭐⭐⭐',
      Description:
        'Shrikant is a talented makeup artist who beautifully transformed my look for a special event. Four stars for his skill and professionalism!',
    },
    {
      name: 'Sarthak Saha',
      Date: '21/04/23',
      stars: '⭐⭐',
      Description:
        "My experience with this makeup artist was disappointing. The makeup didn't meet my expectations, and I was left feeling unsatisfied with the overall result.",
    },
    {
      name: 'Debajeet Majumdar',
      Date: '04/04/23',
      stars: '⭐⭐⭐',
      Description:
        "While Shrikant was professional, the makeup didn't quite match my expectations, and I felt there was room for improvement in terms of product selection and technique.",
    },
  ];
  const [feedbackData, setFeedbackData] = useState([]);

  const [starRatingCount, setTotalStarRating] = useState(0);
  useEffect(() => {
    const fetchCustomerFeedbackData = async () => {
      try {
        const q = query(collection(db, envConfig.customer_Feedback), where('candidateUserId', '==', serviceProviderUserId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log('feedbackdat------000000000000000000000000000a', data);
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

    fetchCustomerFeedbackData();
  }, []);

  const [verified, setVerified] = useState('');

  useEffect(() => {
    setLoader(true);
    const fetchProviderDetails = async () => {
      try {
        const q = query(collection(db, envConfig.Provider), where('provider_id', '==', serviceProviderUserId));
        const querySnapshot = await getDocs(q);
        const serviceProviderDetails = querySnapshot.docs.map(doc => doc.data());
        setVerified(serviceProviderDetails);
        setProviderStatus(serviceProviderDetails);
      } catch (error) {
        console.error('Error fetching service provider details:', error);
      }
    };
    fetchProviderDetails();
    setLoader(false);
  }, []);
  // console.log('verifiedverified-098796857', verified[0].createdOn);
  // console.log("feedbackData",verified[0].createdOn)

  const date = moment(verified[0]?.createdOn);
  const momentDate = moment.utc(date);
  const formattedDate = momentDate.format('DD MMM YYYY');
  // console.log("formattedDateformattedDate",formattedDate)

  const firstLetter = feedbackData.map(feedback => feedback.customerName.slice(0, 1));
  const isproviderverified = verified[0]?.isverified;
  const isverifiedbio = verified[0]?.bio;

  const [userWorkingWithYou, setUserWorkingWithYou] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUserWorking = async () => {
    const selectedProfilesCollection = collection(db, envConfig.selectedProfiles);

    // Initialize the query with the conditions
    let q = query(
      selectedProfilesCollection,
      // where('recruterId', '==', user.userId),
      where('recruterId', '==', userId),
      where('jobId', '==', jobDetails.jobId),
      // where('ServiceproviderId', '==', profiledetail.userId),
      where('ServiceproviderId', '==', serviceProviderUserId),
    );

    try {
      setLoading(true); // Set loading to true when starting the query

      const querySnapshot = await getDocs(q);
      const selecteProfiles = [];

      querySnapshot.forEach(doc => {
        selecteProfiles.push({id: doc.id, ...doc.data()});
      });
      if (selecteProfiles.length > 0) {
        // User is working with you
        setUserWorkingWithYou('workingwithme');
      } else {
        // Check the second condition
        // let q2 = query(selectedProfilesCollection, where('ServiceproviderId', '==', profiledetail.userId));
        let q2 = query(selectedProfilesCollection, where('ServiceproviderId', '==', serviceProviderUserId));
        const querySnapshot2 = await getDocs(q2);
        const selecteProfiles2 = [];

        querySnapshot2.forEach(doc => {
          selecteProfiles2.push({id: doc.id, ...doc.data()});
        });

        if (selecteProfiles2.length > 0) {
          // User is working with someone else
          setUserWorkingWithYou('workinginanotherjob');
        } else {
          // User is not working anywhere
          setUserWorkingWithYou('notworking');
        }
      }
    } catch (error) {
      console.error('Error fetching selected profiles:', error);
    } finally {
      setLoading(false); // Set loading to false after the query is completed or an error occurs
    }
  };

  useEffect(() => {
    checkUserWorking();
  }, []);

  return (
    <>
      {loader ? (
        <LoadingIndicator />
      ) : (
        <ProviderFeedbackScreen
          firstLetter={firstLetter}
          feedbackData={feedbackData}
          providerStatus={providerStatus}
          goBack={goBack}
          formattedDate={formattedDate}
          isproviderverified={isproviderverified}
          isverifiedbio={isverifiedbio}
          userWorkingWithYou={userWorkingWithYou}
          loading={loading}
          starRatingCount={starRatingCount}
        />
      )}
    </>
  );
};

export default ProviderFeedbackContainer;
