import React, {useState} from 'react';
import JobDetail from './job-detail-screen';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavourite, updateAddtoFavourite} from '../../redux/favourite/action';
import {fetchCollectionDetails, postCollectionDetails} from '../../common/collection';
import {fetchAppliedJobs} from '../../redux/appliedjobs/action';
import {updateDoc, arrayUnion, doc} from 'firebase/firestore';
import {getUserDetails} from '../../common/collection';
import {collection, getDocs, query, where, deleteDoc} from 'firebase/firestore';
import {useEffect} from 'react';
import {db} from '../../../firebaseDb';
import moment from 'moment';
import RNShare from 'react-native-share';
import {Alert} from 'react-native';
import {set} from 'date-fns';
import {envConfig} from '../../assets/helpers/envApi';
import {setEditJobStatus} from '../../redux/editjob/action';

const JobDetailContainer = ({route, navigation}) => {
  const {
    images,
    category,
    title,
    description,
    price,
    postedBy,
    jobAdType,
    location,
    id,
    createdOn,
    starttime,
    startdate,
    subCategory,
    isExpired,
    area,
    address,
    userName,
    // selectedCandidateDetails,
    IsPaid,
  } = route.params;

  const [areaDesc, setAreaDesc] = useState();
  const [addressDesc, setAddressDesc] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  function getAddressLocationDescription(lat, lng) {
    const apiKey = `${envConfig.GOOGLE_API_KEY}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          return data.results[0].formatted_address;
        } else {
          return 'No description available';
        }
      })
      .catch(error => {
        console.error('Error fetching location description:', error);
        return 'Error fetching location description';
      });
  }

  function getLocationDescription(lat, lng) {
    const apiKey = 'bc853e5860c0419295a1bc5cef6a8528';
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.results[0].address_line1;
      })
      .catch(error => {
        console.error('Error fetching location description:', error);
        return 'Error fetching location description';
      });
  }

  // Area, and address are objects containing lat and lng properties
  const areaDescriptionPromise = getLocationDescription(area.lat, area.lng);
  const addressDescriptionPromise = getAddressLocationDescription(address.lat, address.lng);

  Promise.all([areaDescriptionPromise, addressDescriptionPromise])
    .then(descriptions => {
      const [areaDesc, addressDesc] = descriptions;
      // Now you have descriptions for location, area, and address
      setAreaDesc(areaDesc);
      setAddressDesc(addressDesc);
      setLoading(false);
      // Use these descriptions as needed
    })
    .catch(error => {
      console.error('Error fetching descriptions:', error);
    });

  const timeAgo = moment(createdOn).fromNow();
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;

  const user = useSelector(state => state.Auth.user);
  const uid = user?.userId;
  const items = route.params;
  // console.log('useruseruseruseruser', user.imageURL);
  const [isAddToFav, setAddToFav] = useState('');
  const favouriteItems = useSelector(state => state.favourite.favouriteItems);
  const currentJob = favouriteItems.find(job => job.id === id);
  const isAlreadyFavourite = currentJob ? currentJob.isFav : false;
  const [appliedjobs, setappliedjobs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [postedCustomer, setPostedUser] = useState([]);
  const dispatch = useDispatch();
  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails); // Job Details
  const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails); //service provider profile details

  useEffect(() => {
    const fetchPostedCustomerDetails = async postedBy => {
      try {
        const q = query(collection(db, envConfig.User), where('userId', '==', postedBy));
        const querySnapshot = await getDocs(q);
        const postedCustomerDetails = querySnapshot.docs.map(doc => doc.data());
        setPostedUser(postedCustomerDetails);
      } catch (error) {
        console.error('Error fetching service provider details:', error);
      }
    };

    fetchPostedCustomerDetails(postedBy);
  }, []);

  const backNavigation = () => {
    navigation.goBack();
  };

  const IdentityVerificationScreenNavigation = () => {
    navigation.navigate('IdentityVerificationScreen');
  };

  const addToFavourite = () => {
    dispatch(updateAddtoFavourite(items));
    setAddToFav(items.id);
  };

  const removeFav = () => {
    dispatch(removeFavourite(items));
    setAddToFav(items.id);
  };

  const shareJobDetails = async () => {
    const shareOptions = {
      title: 'Check out this job',
      message: `Job Title: ${title}\nPrice: ${price}\nDate: ${startdate} \nI've found this Job on ZAAP - Hire or Work Locally.\nDownload the app to apply for this job.\n\n playstorelink: https://play.google.com/store/apps \n appstorelink: https://apps.apple.com/`,
      social: RNShare.Social.WHATSAPP,
    };
    try {
      await RNShare.open(shareOptions);
    } catch (error) {
      console.log('Error sharing job details:', error);
    }
  };
  const handleButtonClick = async () => {
    const appliedJobsCollection = collection(db, envConfig.AppliedJobs);

    // General query without conditions
    const q = query(appliedJobsCollection, where('userId', '==', user.userId), where('items.id', '==', items.id));

    try {
      const querySnapshot = await getDocs(q);

      // Extract data from the query results
      const appliedJobs = [];
      querySnapshot.forEach(doc => {
        appliedJobs.push({id: doc.id, ...doc.data()});
      });
      setappliedjobs(appliedJobs);
      // console.log("appliedJobsssssss", appliedJobs);
      // setRefresh(false)

      // Do something with the data, e.g., update state, display it, etc.
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      console.log('try4');
    }
  };

  useEffect(() => {
    handleButtonClick();
  }, [route]);

  // console.log("appliedjobs",appliedjobs)

  const getfcmtoken = async () => {
    try {
      const userId = postedBy;
      const userposted = await getUserDetails(envConfig.User, userId);
      return userposted.fcmToken;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  const isapplied = appliedjobs.length > 0;
  const sendnotification = async () => {
    try {
      const token = await getfcmtoken();
      const response = fetch('https://canada-push-notifications-server.onrender.com/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          title: 'New Job Application',
          message: `${user.displayName} has applied for your job ${title}`,
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
    const data = {
      title: 'New Job Application',
      message: `${user.displayName} has applied for your job ${title}`,
      userId: postedBy,
      markasread: false,
      time: new Date(),
      screen: 'MyJobScreen',
    };
    await postCollectionDetails(envConfig.Notifications, data);
  };

  const handleSubmitApplyJob = async curruserDetails => {
    setRefresh(true);
    try {
      const JobApplication = {
        displayName: curruserDetails[0].legal_name_on_id,
        userId: user.userId,
        userBio: curruserDetails[0].bio,
        AppliedOn: Date.now(),
        imageUrl: curruserDetails[0]?.personal_photo
          ? curruserDetails[0]?.personal_photo[0]
          : curruserDetails[0]?.imageURL,
      };

      const appliedJobData = {
        userId: user.userId,
        items: items,
      };

      if (items.id) {
        const querySnapshot = await getDocs(
          query(
            collection(db, envConfig.AppliedJobs),
            where('items.id', '==', items.id),
            where('userId', '==', user.userId),
          ),
        );

        if (!querySnapshot.empty) {
          console.log('User has already applied to this job.');
          setRefresh(false);
          return;
        } else {
          let response = await postCollectionDetails(envConfig.AppliedJobs, appliedJobData);

          await updateDoc(doc(db, envConfig.Jobs, items.id), {
            jobApplications: arrayUnion(JobApplication),
          });

          sendnotification();
          handleButtonClick();

          dispatch(fetchAppliedJobs());
          setShowPopup(true);
          setRefresh(false);
        }
      } else {
        console.error('Error: items.id is undefined or null');
      }
    } catch (error) {
      console.error('Error adding job data to Firestore:', error);
    }
  };

  const onApply = async () => {
    if (isApplying) {
      return;
    }
    setIsApplying(true);
    const providerDevData = await fetchCollectionDetails(envConfig.Provider);
    const curruserDetails = providerDevData.filter(item => item.provider_id === uid);
    if (curruserDetails != []) {
      const isVerified = curruserDetails[0]?.isverified;
      if (isVerified === 'in progress') {
        setVerificationModal(true);
        setIsApplying(false);
      } else if (isVerified === 'verified') {
        await handleSubmitApplyJob(curruserDetails);
        setIsApplying(false);
      } else {
        navigation.navigate('IdentityVerificationScreen');
        setIsApplying(false);
      }
    } else {
      navigation.navigate('IdentityVerificationScreen');
      setIsApplying(false);
    }
  };

  const [isSelected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIsSelected = async () => {
    setLoading(true);
    const selectedJobsCollection = collection(db, envConfig.SelectedJobs);

    const q = query(selectedJobsCollection, where('candidateUserId', '==', user.userId), where('jobId', '==', id));

    try {
      const querySnapshot = await getDocs(q);

      // Extract data from the query results
      const selectedJobs = [];
      querySnapshot.forEach(doc => {
        selectedJobs.push({id: doc.id, ...doc.data()});
      });
      setLoading(false);
      setSelected(selectedJobs);
    } catch (error) {
      console.error('Error fetching selected jobs:', error);
    }
  };

  useEffect(() => {
    handleIsSelected();
  }, [user.userId, id]);

  const onClosePopup = () => {
    setShowPopup(false);
  };

  ////////////////////////////Delete Job Functions////////////////////////
  const handleDeleteJob = async id => {
    Alert.alert(
      'Delete Job',
      'Are you sure you want to delete this job?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              // Perform the delete operation
              await deleteDoc(doc(db, envConfig.Jobs, id));
              // Optionally, you can show a success message or refresh the list of jobs
              Alert.alert('Success', 'Job has been deleted successfully.');
              navigation.navigate('HomeScreen');
            } catch (error) {
              // Handle any errors that occur during the delete operation
              console.error('Error deleting job:', error);
              Alert.alert('Error', 'Failed to delete the job. Please try again.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  //----------------> Navigate to post Job screen <---------------
  const navigateToPostJobScreen = jobId => {
    dispatch(setEditJobStatus({jobId: jobId, editJobStatus: true}));
    navigation.navigate('PostJobScreen');
  };

  return (
    <JobDetail
      jobID={id}
      images={images}
      category={category}
      title={title}
      description={description}
      price={price}
      postedBy={postedBy}
      location={location}
      backNavigation={backNavigation}
      addToFavourite={addToFavourite}
      isAlreadyFavourite={isAlreadyFavourite}
      removeFav={removeFav}
      onApply={onApply}
      isapplied={isapplied}
      refresh={refresh}
      starttime={starttime}
      startdate={startdate}
      timeAgo={timeAgo}
      subCategory={subCategory}
      isVerified={isVerified}
      IdentityVerificationScreenNavigation={IdentityVerificationScreenNavigation}
      lat={area.lat}
      lng={area.lng}
      isExpired={isExpired}
      isSelected={isSelected}
      loading={loading}
      jobAdType={jobAdType}
      areaDesc={areaDesc}
      addressDesc={addressDesc}
      address={address}
      userName={userName}
      shareJobDetails={shareJobDetails}
      showPopup={showPopup}
      onClosePopup={onClosePopup}
      postedCustomer={postedCustomer}
      userId={user.userId}
      verificationModal={verificationModal}
      setVerificationModal={setVerificationModal}
      IsPaid={IsPaid}
      handleDeleteJob={handleDeleteJob}
      navigateToPostJobScreen={navigateToPostJobScreen}
    />
  );
};

export default JobDetailContainer;
