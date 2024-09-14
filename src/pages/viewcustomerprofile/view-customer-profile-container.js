import ViewCustomerProfileScreen from './view-customer-profile-screen';
import {getUserDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getDocs, collection, where, query} from 'firebase/firestore';
import {db} from '../../../firebaseDb';

const ViewCustomerProfileContainer = ({route}) => {
  const {postedBy} = route.params;
  const [userDetails, setUserDetails] = useState(false);
  const [customerPreJobsList, setCustomerPreJobsList] = useState([]);
  const [starRatingCount, setTotalStarRating] = useState(1);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loader,setLoader] = useState(true)

  const {jobs} = useSelector(state => state.home);

  ///////// get jobs details by posted by user//////////
  const getCustomerPreviousJobsDetails = () => {
    const customerJobs = jobs.filter(eachJob => eachJob.postedBy === postedBy);
    setCustomerPreJobsList(customerJobs);
  };

  //////////get user details for from user dev/////////////
  const fetchDataUserDetails = async () => {
    try {
      const userDetails = await getUserDetails(envConfig.User, postedBy);
      setUserDetails(userDetails);
      // Handle userDetails as needed
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle the error
    }
  };

  ////////////Getting Customer Feedback Data/////////////
  const fetchCustomerFeedbackData = async () => {
    try {
      const q = query(collection(db, envConfig.serviceProvider_Feedback), where('customerId', '==', postedBy));
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataUserDetails();
      getCustomerPreviousJobsDetails();
      await fetchCustomerFeedbackData();
      setLoader(false);
    };

    fetchData();
  }, []);

  return (
    <ViewCustomerProfileScreen
      userDetails={userDetails}
      customerPreJobsList={customerPreJobsList}
      starRatingCount={starRatingCount}
      feedbackData={feedbackData}
      loader = {loader}
    />
  );
};

export default ViewCustomerProfileContainer;
