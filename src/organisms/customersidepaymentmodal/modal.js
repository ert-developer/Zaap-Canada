import Modal from 'react-native-modal';
import {View, StyleSheet, Image, Text, Alert, TextInput, TouchableOpacity, Linking} from 'react-native';
import {useState, useEffect} from 'react';
import CustomText from '../../atoms/text/textComponent';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {
  Call,
  IIcon,
  Lines,
  MessageIcon,
  ProfileVerified,
  ReviewIcon,
  ReviewSuccess,
  TickMark,
  ReviewInProgress,
  WorkCompleteInProgress,
  WorkInProgressStart,
  WorkInProgressCompleted,
  WorkcompletedSvg,
  WorkCompleteStarted,
} from '../../assets/svgIcons/providerPaymentSvg';
import {WorkCompleted} from '../../assets/svgIcons/providerPaymentSvg';
import CustomButton from '../../atoms/button/buttonComponent';
import ServiceCompletedNodal from '../backdroppressmodal/Service-completed-Modal';
import ServiceCanceldModal from '../backdroppressmodal/service-cancelled-modal';
import CustomTextInput from '../../atoms/textInput/textInputComponent';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {deleteDocument, postCollectionDetails} from '../../common/collection';
import {fetchCompletedJobs} from '../../redux/completedjobs/action';
import CustomModal from '../../molecules/custommodal';
import {useNavigation} from '@react-navigation/native'; // Add this import
import {ActivityIndicator} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Profileimageeee} from '../../assets/svgImage/bottomDrawer';
import {YouAreHiringSvg, DottedLines, InProgressSvg, ServiceFeedback} from '../../assets/svgImage/bottomDrawer';
import {BookingConfirm, InProgresBannersSvg} from '../../assets/svgImage/bottomDrawer';
import {FeedbackBannerSvg} from '../../assets/svgImage/bottomDrawer';
import {AirbnbRating} from 'react-native-ratings';
import WorkDoneModal from '../customermodals/workdonemodal';
import Service_CancelPopupAfter_otp from '../customermodals/servicecancelmodal';
import usePayment from '../../custom-hooks/payment/usePayment';
import {Color} from '../../assets/static/globalStyles';
import CustomerServiceCompletedModal from '../backdroppressmodal/customer-service-complete-modal';
import {db} from '../../../firebaseDb';
import {getJobDetails} from '../../common/collection';
import {set} from 'date-fns';
import FastImage from 'react-native-fast-image';
import {mailSenter} from '../../common/mailSender';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  FieldValue,
  Transaction,
} from 'firebase/firestore';
import {ca} from 'date-fns/locale';
import {TransparentLoader} from '../loader/loader';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import {envConfig} from '../../assets/helpers/envApi';

const CustomerSidePaymentModel = () => {
  const {handleCheckout} = usePayment();

  const user = useSelector(state => state.Auth.user);
  const userID = user.userId;

  const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails);
  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails);

  const selectedJobDetails = useSelector(state => state.serviceproviderselectedjobDetails.selectedJobDetails);
  const [providerStatus, setProviderStatus] = useState([]);

  const [paymentLoader, setPaymentLoader] = useState(false);

  //////////////////////// asdf Customer OTP Cancel ////////////

  const profileUserID = profiledetail.userId;

  useEffect(() => {
    const fetchPostedCustomerDetails = async profileUserID => {
      try {
        const q = query(collection(db, envConfig.Provider), where('provider_id', '==', profileUserID));
        const querySnapshot = await getDocs(q);
        const response = querySnapshot.docs.map(doc => doc.data());
        setProviderStatus(response);
      } catch (error) {
        console.error('Error fetching service provider details:', error);
      }
    };
    fetchPostedCustomerDetails(profileUserID);
  }, []);
  const navigation = useNavigation();
  const [rating, setRating] = useState(0); // Initial rating
  const reviews = ['Disappointing', 'Bad', 'Good', 'Very Good', 'Excellent'];

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  const [roomDetails, setRoomDetails] = useState(null);

  const handleUpdateIsDisabledClick = async (userid1, userid2) => {
    const updatedIsDisabledValue = true;

    // Update isDisabled field for the current user and the other user
    await database()
      .ref(`/chatlist/${userid1}/${userid2}`)
      .update({isDisabled: updatedIsDisabledValue})
      .then(() => console.log('isDisabled updated for current user'));

    await database()
      .ref(`/chatlist/${userid2}/${userid1}`)
      .update({isDisabled: updatedIsDisabledValue})
      .then(() => console.log('isDisabled updated for other user'));
  };

  const getRoomDetails = (userId1, userId2) => {
    return database()
      .ref(`/chatlist/${userId1}/${userId2}`)
      .once('value')
      .then(snapshot => {
        const roomDetails = snapshot.val();
        setRoomDetails(roomDetails);
      });
  };

  const [chatIconOpacity, setChatIconOpacity] = useState(0.5);

  useEffect(() => {
    if (isServiceCompleted || isServiceCancelled || roomDetails === null || roomDetails === undefined) {
      setChatIconOpacity(0.5);
    } else {
      setChatIconOpacity(1);
    }
  }, [isServiceCompleted, isServiceCancelled, roomDetails]);

  const handleChatIconPress = async () => {
    await getRoomDetails(userID, profileUserID);
    if (isServiceCompleted || isServiceCancelled || roomDetails === null || roomDetails === undefined) {
      Alert.alert("Chat can't be initiated", 'Please complete the service to start the chat', [{text: 'OK'}]);
      return;
    } else {
      if (roomDetails.isDisabled) {
        await database().ref(`/${envConfig.chatlist}/${userID}/${profileUserID}`).update({isDisabled: false});
        await database().ref(`/${envConfig.chatlist}/${profileUserID}/${userID}`).update({isDisabled: false});
        roomDetails.isDisabled = false;
      }
      navigation.navigate('OneChat', {chatDetail: roomDetails});
    }
  };

  useEffect(() => {
    getRoomDetails(userID, profileUserID);
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const dispatch = useDispatch();

  const handleDeleteCollection = async () => {
    try {
      const commonRef = database().ref(`/${envConfig.common}`);

      await commonRef.remove();

      Alert.alert('Success', 'Successfully deleted /common collection');
    } catch (error) {
      console.error('Error deleting /common collection:', error.message);
      Alert.alert('Error', 'Failed to delete /common collection');
    }
  };

  const [isOtpValid, setOtpValid] = useState(false);
  const [otp, setOtp] = useState('****');
  const [otpLoading, setOtpLoading] = useState(true);

  useEffect(() => {
    database()
      .ref(`myjobs/${userID}_${jobDetails.jobId}/`)
      .once('value')
      .then(snapshot => {
        const otpDetails = snapshot.val();
        setOtpLoading(false);

        setOtp(otpDetails.otpData.otp.toString());
      });
  }, [otp, userID, jobDetails]);

  const [isReviewVisible, setReviewVisible] = useState(false);
  const [isServiceCompleted, setServiceCompleted] = useState(false);
  const [isServiceCancelled, setServiceCancelled] = useState(false);
  const onCloseModal = () => {
    setServiceCancelled(false);
  };
  const [onFeedbackText, setFeedbackText] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  const [loader, setLoader] = useState(false);

  const handleCompletedJobs = async () => {
    setLoader(true);

    const jobinfo = await getJobDetails(envConfig.Jobs, jobDetails.jobId);
    const completedJobs = {
      customerName: user.displayName,
      customerID: userID,
      jobTitle: jobDetails.jobTitle,
      jobDescription: jobDetails.jobDescription,
      salary: jobDetails.salary,
      timeAgo: Date.now(),
      jobId: jobDetails.jobId,
      candidateUserId: profiledetail.userId,
      imageUrl: jobDetails.imageUrls,
      // Feedback: onFeedbackText,
      invoiceId: jobinfo.invoiceId,
      bookingId: jobinfo.bookingId,
      address: jobDetails.address,
      area: jobDetails.area,
      category: jobDetails.category,
      locationDesc: jobDetails.locationDesc,
      isExpired: true,
    };
    let response = await postCollectionDetails(envConfig.completedJobs, completedJobs);
    setLoader(false);

    fetchCompletedJobs();
  };

  const handleFeedback = async () => {
    const feedBack = {
      customerName: user.displayName,
      candidateUserId: profiledetail.userId,
      feedback: onFeedbackText,
      feedBackDate: Date.now(),
      startRating: rating,
    };
    try {
      let response = await postCollectionDetails(envConfig.customer_Feedback, feedBack);
    } catch (error) {
      console.error('Error adding completed job data to Firestore:', error);
    }
  };

  const handleExpiredJobs = async () => {
    const expired_Jobs_dev = {
      customerName: user.displayName,
      userId: userID,
      jobTitle: jobDetails.jobTitle,
      jobDescription: jobDetails.jobDescription,
      salary: jobDetails.salary,
      timeAgo: Date.now(),
      jobId: jobDetails.jobId,
      candidateUserId: profiledetail.userId,
      imageUrl: jobDetails.imageUrls,
      // Feedback: onFeedbackText,

      address: jobDetails.address,
      area: jobDetails.area,
      category: jobDetails.category,
      locationDesc: jobDetails.locationDesc,
      isExpired: true,
    };
    try {
      let response = await postCollectionDetails(envConfig.expired_Jobs, expired_Jobs_dev);
    } catch (error) {
      console.error('Error adding completed job data to Firestore:', error);
    }
  };

  const [showWorkDonePopup, setWorkDonePopup] = useState(false);

  const onWorkdone = () => {
    WorkDone();

    setWorkDonePopup(false);
  };

  const handleReview = () => {
    setReviewVisible(true);
  };

  const onChangeText = event => {
    setFeedbackText(event);
  };

  //asdf
  async function deleteDocumentByJobId(collectionName, deleteJob) {
    try {
      const querySnapshot = await firestore().collection(collectionName).where('jobId', '==', deleteJob).get();

      // Check if there are any documents matching the query
      if (!querySnapshot.empty) {
        // Iterate over each document and delete it
        querySnapshot.forEach(async doc => {
          await firestore().collection(collectionName).doc(doc.id).delete();
          console.log(`Document with jobId ${deleteJob} deleted successfully`);
        });
      } else {
        console.log(`No document found with jobId ${deleteJob}`);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  const onDeleteJob = async deleteJob => {
    try {
      await firestore().collection(envConfig.Jobs).doc(deleteJob).delete();
      // await firestore().collection('SelectedJobs_dev').doc(deleteJob).delete();

      deleteDocumentByJobId(envConfig.SelectedJobs, deleteJob);
      // await firestore().collection('AppliedJobs_dev').doc(deleteJob).delete();
      deleteDocumentByJobId(envConfig.AppliedJobs, deleteJob);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const storePaymentDetails = async () => {
    const paymentDetails = {
      customerName: user.displayName || 'No Name',
      customerID: userID || 'No ID',
      jobID: jobDetails.jobId || 'No Job ID',
      jobTitle: jobDetails.jobTitle || 'No Job Title',
      jobDescription: jobDetails.jobDescription || 'No Job Description',
      salary: jobDetails.salary || 'No Salary',
      finishedTime: Date.now(),
      serviceProviderId: profiledetail.userId || 'No Provider ID',
      serviceProviderAccount: providerStatus[0].account_number || 'No Account Number',
      serviceProviderName: providerStatus[0].legal_name_on_id || 'No Name on ID',
      serviceProviderBank: providerStatus[0].bank_name || 'No Bank Name',
      serviceProviderTransit: providerStatus[0].bank_transit_number || 'No Transit no.',
      serviceProviderInstitution: providerStatus[0].institution_number || 'No Institution no.',
      serviceProviderEmail: providerStatus[0].email_id || 'No Email ID',
      tipAmount: tipAmount || 'no tip given',
      transactionStatus: 'Success',
      serviceProviderPhoneNumber: providerStatus[0].phone_number || 'No Phone Number',
    };
    try {
      let response = await postCollectionDetails(envConfig.Payments, paymentDetails);
    } catch (error) {
      console.error('Error adding payment details to Firestore:', error);
    }
  };

  const handleServiceCompleted = async () => {
    await storePaymentDetails();
    handleExpiredJobs();
    // handleFeedback();
    await handleCompletedJobs();
    await handleUpdateIsDisabledClick(user.userId, profiledetail.userId);
    onDeleteJob(jobDetails.jobId);
    setServiceCompleted(true);
    handleFeedback();

    const to = providerStatus[0].email_id;
    const to2 = user.email;
    const subject = 'Service Completed';
    const textMsg = 'Request for amount transfer to the service provider';
    const bodyText = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2>Service Completed</h2>
      <p>Service Completed by <strong>${providerStatus[0].legal_name_on_id}</strong> for <strong>${user.displayName}</strong> on Job: <strong>$${jobDetails.jobTitle}</strong> with an amount of <strong>$${jobDetails.salary}</strong>.</p>
      <p><strong>Job ID:</strong> ${jobDetails.jobId}</p>
      <p><strong>Job Description:</strong> ${jobDetails.jobDescription}</p>
    </div>
  `;

    mailSenter(to, subject, textMsg, bodyText);
    mailSenter(to2, subject, textMsg, bodyText);
    const data = {
      title: 'Service Completed',
      message: `Service Completed by ${providerStatus[0].legal_name_on_id} for ${user.displayName} on ${jobDetails.jobTitle} with an amount of $${jobDetails.salary}`,
      userId: profiledetail.userId,
      markasread: false,
      time: new Date(),
      screen: 'MyJobScreen',
    };
    await postCollectionDetails(envConfig.Notifications, data);
  };

  const handleCancelService = async () => {
    // handleDeleteCollection();
    // await handleUpdateIsDisabledClick(user.userId, profiledetail.userId);
    // send an email to the service provider
    // console.log('user', user);
    // console.log('profileetail', providerStatus[0]);
    // const to = `sankeertherra01@gmail.com, ${providerStatus[0].email_id}`;
    // const subject = 'Service Cancelled';
    // const textMsg = 'Request for amount refund to the customer';
    // const bodyText = `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id}   on ${jobDetails.jobTitle} with an amount of ${jobDetails.salary}`;
    // mailSenter(to, subject, textMsg, bodyText);

    setServiceCancelled(true);
    setOtpValid(false);

    // const data = {
    //   title: 'Service Cancelled',
    //   message: `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id} on ${jobDetails.jobTitle} with an amount of ${jobDetails.salary}`,
    //   userId: profiledetail.userId,
    //   markasread: false,
    //   time: new Date(),
    // };
    // await postCollectionDetails('Notifications_dev', data);

    // onPressCancelService();
  };

  useEffect(() => {
    const otpValidationStatusRef = database().ref(`${envConfig.myjobs}/${userID}_${jobDetails.jobId}`).child('otpData');

    const handleOtpValidationStatus = snapshot => {
      const validationStatus = snapshot.val();
      if (validationStatus && validationStatus.otpValidationStatus) {
        setOtpValid(true);
      } else {
        setOtpValid(false);
      }
    };

    otpValidationStatusRef.on('value', handleOtpValidationStatus);

    return () => {
      // Cleanup the listener when the component unmounts
      otpValidationStatusRef.off('value', handleOtpValidationStatus);
    };
  }, []);

  // ... (rest of the component)

  const WorkDone = async () => {
    const otpData = {
      isworkdone: true,
    };
    database().ref(`${envConfig.myjobs}/${userID}_${jobDetails.jobId}`).child('isworkdone').set(otpData);

    const selectedProfileRef = firestore().collection(envConfig.selectedProfiles);
    const snapshot = await selectedProfileRef.where('jobId', '==', jobDetails.jobId).get();

    if (snapshot.empty) {
      console.log(`No document with given ID found.`);
      return;
    }

    snapshot.forEach(async doc => {
      await doc.ref.delete();
      console.log(`Document with ID ${doc.id} deleted successfully.`);
    });
    // Store the OTP in a common location in the Firebase Realtime Database
  };

  const [isWorkDone, setIsWorkDone] = useState(null);

  useEffect(() => {
    const isWorkDoneRef = database().ref(`${envConfig.myjobs}/${userID}_${jobDetails.jobId}/isworkdone/isworkdone`);

    const handleSnapshot = snapshot => {
      const value = snapshot.val();
      setIsWorkDone(value);
    };

    isWorkDoneRef.on('value', handleSnapshot);

    return () => {
      isWorkDoneRef.off('value', handleSnapshot);
    };
  }, []);

  const [isWorkFinished, setIsWorkFinished] = useState(null);

  // useEffect(() => {
  //   const isWorkFinishedRef = database().ref('/common/isWorkFinished/isworkdone');

  //   const handleSnapshot = (snapshot) => {
  //     const value = snapshot.val();
  //     setIsWorkFinished(value);
  //     // Perform actions with the updated isWorkFinished value
  //   };

  //   isWorkFinishedRef.on('value', handleSnapshot);

  //   return () => {
  //     isWorkFinishedRef.off('value', handleSnapshot);
  //   };
  // }, []);

  const [showFeedback, setFeedback] = useState(false);

  const [cancelPopupAfterOtp, setCancelPopupAfterOtp] = useState(false);
  const onCancel_Afterotp = async () => {
    // const to = `sankeertherra01@gmail.com, ${providerStatus[0].email_id}`;
    // const subject = 'Service Cancelled';
    // const textMsg = 'The service has been cancelled by the customer';
    // const bodyText = 'The service has been cancelled by the customer';
    // mailSenter(to, subject, textMsg, bodyText);
    setCancelPopupAfterOtp(true);
    // const data = {
    //   title: 'Service Cancelled',
    //   message: `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id} on ${jobDetails.jobTitle} with an amount of ${jobDetails.salary}`,
    //   userId: profiledetail.userId,
    //   markasread: false,
    //   time: new Date(),
    // };
    // await postCollectionDetails('Notifications_dev', data);
    // const otpValidationStatusRef = database().ref(`myjobs/${userID}_${jobDetails.jobId}`).child('otpValidationStatus');
    // otpValidationStatusRef.remove();
    //Currently Commenting the below code as it will remove the otpData from the firebase need to check whether it is required or not
    // const otpDataRef = database().ref(`myjobs/${userID}_${jobDetails.jobId}`).child('otpData');
    // otpDataRef.remove();
  };
  const sendRemoveMail = async () => {
    const to = providerStatus[0].email_id;
    const subject = 'Job was removed by the customer';
    const textMsg = 'Hello./n We are sorry to inform you that the job was removed by the customer';
    const bodyText = 'Hello./n We are sorry to inform you that the job was removed by the customer';
    mailSenter(to, subject, textMsg, bodyText);

    const data = {
      title: 'Job Removed',
      message: `Job was removed by the customer`,
      userId: profiledetail.userId,
      markasread: false,
      time: new Date(),
      screen: 'MyJobScreen',
    };
    await postCollectionDetails(envConfig.Notifications, data);
  };
  const popUpClose = () => {
    setCancelPopupAfterOtp(false);
  };
  const onCancelAfterConfirm = async () => {
    await justremoveJob();
    setCancelPopupAfterOtp(false);
    sendRemoveMail();
  };

  const serviceCompleteClose = () => {
    setServiceCompleted(false);
    navigation.navigate('HomeScreen');
  };
  const [selectedText, setSelectedText] = useState(null);
  const [customText, setCustomText] = useState('');
  const [showAmount, setShowAmount] = useState(false);

  // Handle click event for percentage
  const handleTextClick = percentage => {
    // Toggle the selection: If the clicked percentage is already selected, clear it
    if (selectedText === percentage) {
      setSelectedText(null); // Deselect the option
      setShowAmount(false); // Hide the amount
    } else {
      setSelectedText(percentage); // Select the new option
      setShowAmount(true); // Show the amount
    }
  };

  const percentageOptions = [
    {percentage: 3, label: '3%'},
    {percentage: 5, label: '5%'},
    {percentage: 10, label: '10%'},
    {percentage: 'Others', label: 'Others'},
  ];

  let tipAmount;
  if (selectedText !== 'Others') {
    // Convert the percentage to the actual tip amount based on salary
    tipAmount = ((jobDetails.salary * selectedText) / 100).toFixed(2); // Convert to integer
  } else {
    // Parse and validate the custom text value as a number
    tipAmount = parseFloat(customText);
  }

  const cliclHandlePayment = async () => {
    try {
      // let response = await handleCheckout(parseInt(20 * 100));
      setPaymentLoader(true);

      // Log the calculated tipAmount to verify
      if (tipAmount == 0) {
        handleServiceCompleted();
        setServiceCompleted(true);
        setPaymentLoader(false);
        return;
      }
      let response = await handleCheckout(parseFloat(tipAmount));
      if (response && response['_documentPath']) {
        handleServiceCompleted();
        setServiceCompleted(true);
      }
      // if (response && response['_documentPath']) {
      //   setServiceCompleted(true);
      // } else {
      //   Alert.alert('Cancel', 'Canceled Payment.', [{text: 'OK'}]);
      // }
    } catch (error) {
      console.log('errror', error);
    }
    setPaymentLoader(false);
  };

  /////////////////This is Before Work Start Cancel Function for Customer//////////////////

  function calculateTimeDifferenceInHours(startdate, starttime) {
    // Log the input values

    // Get the current date and time
    const currentDate = new Date();

    // Handle "AnyTime" by defaulting to midnight
    let timeString = starttime === 'AnyTime' ? '00:00 AM' : starttime;

    // Replace any special characters like left-to-right marks and normalize whitespace
    timeString = timeString.replace(/[\u200E\u200F]/g, '').trim();

    // Ensure the time is in a proper 12-hour format with AM/PM
    const timeParts = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeParts) {
      console.error('Error: Unable to parse time string.');
      return NaN;
    }

    let hours = parseInt(timeParts[1], 10);
    const minutes = timeParts[2];
    const period = timeParts[3].toUpperCase();

    // Convert 12-hour time to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const validTimeString = `${hours}:${minutes}:00`;

    // Construct a valid Date string
    const startDateTimeString = `${startdate}T${validTimeString}`;

    const startDateTime = new Date(startDateTimeString);
    console.log(startDateTime, 'Parsed Start DateTime');

    if (isNaN(startDateTime.getTime())) {
      console.error('Error: Invalid Date constructed. Check startdate and starttime formats.');
      return NaN;
    }

    // Calculate the difference in milliseconds
    const differenceInMillis = startDateTime - currentDate;

    // Convert the difference to hours
    const differenceInHours = differenceInMillis / (1000 * 60 * 60);

    return Math.round(differenceInHours);
  }

  function calculateCancellationFee(serviceValue, hoursDifference) {
    let cancellationFeePercentage;

    if (hoursDifference >= 12 && hoursDifference < 24) {
      cancellationFeePercentage = 15;
    } else if (hoursDifference >= 6 && hoursDifference < 12) {
      cancellationFeePercentage = 20;
    } else if (hoursDifference >= 3 && hoursDifference < 6) {
      cancellationFeePercentage = 25;
    } else if (hoursDifference >= 1 && hoursDifference < 3) {
      cancellationFeePercentage = 30;
    } else if (hoursDifference < 1) {
      cancellationFeePercentage = 40;
    } else {
      // If the hours difference is 24 or more, assume no cancellation fee
      cancellationFeePercentage = 0;
    }

    // Calculate the cancellation fee based on the percentage
    const cancellationFee = (cancellationFeePercentage / 100) * serviceValue;

    return cancellationFee;
  }
  const justremoveJob = async () => {
    console.log('Job Deleted');
    try {
      await handleUpdateIsDisabledClick(user.userId, profiledetail.userId);
      await handleExpiredJobs();
      await onDeleteJob(jobDetails.jobId);
      //remove from selectedProfiles_dev
      const selectedProfileRef = firestore().collection(envConfig.selectedProfiles);
      const snapshot = await selectedProfileRef.where('jobId', '==', jobDetails.jobId).get();
      if (snapshot.empty) {
        console.log(`No document with given ID found.`);
        return;
      }
      snapshot.forEach(async doc => {
        await doc.ref.delete();
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error fetching job details from Firestore:', error);
    }
  };

  const onCustCancelltionCharge = async () => {
    try {
      await handleUpdateIsDisabledClick(user.userId, profiledetail.userId);
      const jobinfo = await getJobDetails(envConfig.Jobs, jobDetails.jobId);

      const differenceInHours = calculateTimeDifferenceInHours(jobinfo.data.startdate, jobinfo.data.starttime);
      const cancellationCharge = calculateCancellationFee(jobinfo.data.salary, differenceInHours);

      const cancelDetails = {
        customerName: user.displayName,
        customerID: userID,
        customerEmail: user.email,
        jobID: jobinfo.id,
        jobTitle: jobinfo.data.jobTitle,
        jobDescription: jobinfo.data.jobDescription,
        salary: jobinfo.data.salary,
        cancellationCharge: cancellationCharge,
        CancelledTime: Date.now(),
        originalTime: jobinfo.data.starttime,
        originalDate: jobinfo.data.startdate,
        differenceInHours: differenceInHours,
        serviceProviderName: providerStatus[0].legal_name_on_id,
        serviceProviderId: profiledetail.userId,
        totalAmount: jobinfo.data.salary - cancellationCharge,
      };

      let response = await postCollectionDetails('CancelJobs_dev', cancelDetails);

      await handleExpiredJobs();
      // await handleCompletedJobs();
      await onPressCancelServiceNoNotification();
      onDeleteJob(jobDetails.jobId);
      //remove from selectedProfiles_dev
      const selectedProfileRef = firestore().collection(envConfig.selectedProfiles);
      const snapshot = await selectedProfileRef.where('jobId', '==', jobDetails.jobId).get();
      if (snapshot.empty) {
        console.log(`No document with given ID found.`);
        return;
      }
      snapshot.forEach(async doc => {
        await doc.ref.delete();
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });

      const to = `${providerStatus[0].email_id}`;
      const subject = 'Service Cancelled By Customer';
      const textMsg = 'Request for amount refund to the customer';
      const bodyText = `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id}   on ${jobinfo.data.jobTitle} with an amount of $${jobinfo.data.salary} and you will be refunded with ${cancellationCharge}`;
      mailSenter(to, subject, textMsg, bodyText);
      const data = {
        title: 'Service Cancelled',
        message: `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id} on ${jobinfo.data.jobTitle} with an amount of $${jobinfo.data.salary}`,
        userId: profiledetail.userId,
        markasread: false,
        time: new Date(),
        screen: 'MyJobScreen',
      };
      await postCollectionDetails(envConfig.Notifications, data);
    } catch (error) {
      console.error('Error fetching job details from Firestore:', error);
    }
  };

  const onPressCancelServiceNoNotification = async () => {
    try {
      const docRef = doc(db, envConfig.Jobs, selectedJobDetails.jobId);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const cancelCandidateDetails = docData.cancelCandidateDetails || [];
      cancelCandidateDetails.push({
        serviceProviderName: providerStatus[0].legal_name_on_id,
        serviceProviderId: selectedJobDetails.serviceProviderId,
        customerId: selectedJobDetails.postedBy,
        jobID: selectedJobDetails.jobId,
        jobTitle: selectedJobDetails.jobTitle,
        jobSalary: selectedJobDetails.salary,
      });
      await updateDoc(docRef, {
        IsBookingCancel: true,
        IsBookingConfirmed: false,
        cancelCandidateDetails: cancelCandidateDetails,
      });
      database()
        .ref(`${envConfig.myjobs}/${selectedJobDetails.postedBy}_${selectedJobDetails.jobId}`)
        .child('otpData')
        .update({
          otpValidationStatus: false,
        });
      setOtpValid(false);
      const selectedProfileRef = firestore().collection(envConfig.selectedProfiles);
      const snapshot = await selectedProfileRef.where('jobId', '==', selectedJobDetails.jobId).get();
      if (snapshot.empty) {
        console.log(`No document with given ID found.`);
        return;
      }
      snapshot.forEach(async doc => {
        await doc.ref.delete();
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });
    } catch (error) {
      console.error('Error adding field to document:', error);
    }
  };
  const onPressCancelService = async () => {
    try {
      const docRef = doc(db, envConfig.Jobs, selectedJobDetails.jobId);

      // Get the current document data
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();

      // Initialize cancelCandidateDetails as an array if it doesn't exist
      const cancelCandidateDetails = docData.cancelCandidateDetails || [];

      // Push the new object into the array
      cancelCandidateDetails.push({
        serviceProviderName: providerStatus[0].legal_name_on_id,
        // serviceProviderId: selectedJobDetails.candidateUserId,
        serviceProviderId: selectedJobDetails.serviceProviderId,
        customerId: selectedJobDetails.postedBy,
        jobID: selectedJobDetails.jobId,
        jobTitle: selectedJobDetails.jobTitle,
        jobSalary: selectedJobDetails.salary,
      });

      // Remove object from jobApplications array where userId matches
      // const updatedJobApplications = docData.jobApplications.filter(
      //   application => application.userId !== selectedJobDetails.serviceProviderId,
      // );

      // Update the document with the modified cancelCandidateDetails array
      await updateDoc(docRef, {
        IsBookingCancel: true,
        IsBookingConfirmed: false,
        cancelCandidateDetails: cancelCandidateDetails,
        // jobApplications: updatedJobApplications,
        // selectedCandidateDetails: FieldValue.delete(),
      });
      // console.log(selectedJobDetails, 'ghjkbhnjmkhjikm');
      database()
        .ref(`${envConfig.myjobs}/${selectedJobDetails.postedBy}_${selectedJobDetails.jobId}`)
        .child('otpData')
        .update({
          otpValidationStatus: false, // Clear the existing validation status
        });
      setOtpValid(false);

      // delete the selected Profile of SP from firebase selectedProfiles_dev
      const selectedProfileRef = firestore().collection(envConfig.selectedProfiles);
      const snapshot = await selectedProfileRef.where('jobId', '==', selectedJobDetails.jobId).get();
      if (snapshot.empty) {
        console.log(`No document with given ID found.`);
        return;
      }
      snapshot.forEach(async doc => {
        await doc.ref.delete();
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });

      const to = `${providerStatus[0].email_id}`;
      const subject = 'Service Cancellation Notification';
      const textMsg = `The service scheduled on ${jobDetails.startdate}has been canceled by the customer.`;

      const bodyText = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2>Hi ${providerStatus[0].legal_name_on_id},</h2>
          <p>We hope you’re doing well.</p>
          <p>We regret to inform you that the customer has canceled the booking for the service scheduled on <strong>${jobDetails.startdate}</strong> before it began.</p>
          <h3>Booking Details:</h3>
          <ul style="padding-left: 20px;">
            <li><strong>Customer Name:</strong> ${user.displayName}</li>
            <li><strong>Service:</strong> ${jobDetails.jobTitle}</li>
            <li><strong>Scheduled Date:</strong> ${jobDetails.startdate}</li>
          </ul>
          <h3>What You Need to Do:</h3>
          <p>There’s no action required from your side regarding this cancellation. Please feel free to check out other jobs available on the platform that you can apply for.</p>
          <p>We understand that cancellations can be frustrating. However, please remember that this is a normal part of working in the on-demand marketplace. Each cancellation is an opportunity for you to be ready for the next job, and new opportunities will come your way.</p>
          <p>Keep up the great work and stay positive! If you have any questions or need further assistance, please reach out to our support team via email at <a href="mailto:help@zaapondemand.ca" style="color: #4CAF50;">help@zaapondemand.ca</a>.</p>
          <p>Thank you for your understanding and for being a valued part of the ZAAP community.</p>
          <p>Best regards,<br>Team ZAAP</p>
        </div>
      `;

      // Send the email
      mailSenter(to, subject, textMsg, bodyText);

      const data = {
        title: 'Service Cancelled',
        message: `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id} on ${jobDetails.jobTitle} with an amount of ${jobDetails.salary}`,
        userId: profiledetail.userId,
        markasread: false,
        time: new Date(),
        screen: 'MyJobScreen',
      };
      await postCollectionDetails(envConfig.Notifications, data);

      console.log('Field added successfully to document');
    } catch (error) {
      console.error('Error adding field to document:', error);
    }
  };

  if (profiledetail.name) {
    const names = profiledetail.name.split(' ');
    if (names.length === 1) {
      // Only first name provided
      result = names[0].charAt(0);
    } else if (names.length >= 2) {
      // Both first and last names provided
      result = `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
  } else {
    result = 'No name provided';
  }

  const phoneNumber = providerStatus[0] ? providerStatus[0].phone_number : ''; // Replace this with your actual phone number

  const handlePhoneIconPress = () => {
    // Use the `tel:` scheme to open the phone dialer with the specified number
    const dialerUrl = `tel:${phoneNumber}`;

    // Check if the Linking module is supported
    if (Linking.canOpenURL(dialerUrl)) {
      // Open the phone dialer
      Linking.openURL(dialerUrl);
    } else {
      // Handle the case where opening the dialer is not supported
      console.log('Phone dialer is not supported on this device');
    }
  };

  return (
    <View>
      <Modal isVisible={true} style={styles.modalContainer}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={{height: '100%', width: '100%'}}></Text>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 15}}>
            <View style={styles.profilePicContainer}>
              {/* <Profileimageeee /> */}
              {/* {providerStatus[0]?.imageURL ? (
                <View style={styles.imageContainer}>
                  <Image source={{uri: providerStatus[0]?.imageURL}} style={styles.image} />
                </View>
              ) : (
                <CustomText text={result} style={styles.namelogo} />
              )} */}
              {!providerStatus[0]?.personal_photo ? (
                <Image src={providerStatus[0]?.imageURL} style={styles.image} />
              ) : (
                <Image src={providerStatus[0]?.personal_photo[0]} style={styles.image} />
              )}
              <View>
                <CustomText text={providerStatus[0]?.legal_name_on_id} style={styles.heading} />
                <Text style={styles.subHeading}>Service Provider</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TouchableOpacity onPress={handlePhoneIconPress}>
                <Call />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChatIconPress}>
                <MessageIcon opacity={chatIconOpacity} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              <DottedLines />
              <View style={styles.bookingConfirmedSvgContainer}>
                {showFeedback ? (
                  <FeedbackBannerSvg />
                ) : isWorkDone ? (
                  <BookingConfirm />
                ) : isOtpValid ? (
                  <InProgresBannersSvg />
                ) : (
                  <BookingConfirm />
                )}
                <CustomText
                  text={
                    showFeedback
                      ? 'SERVICE FEEDBACK'
                      : isWorkDone
                      ? 'WORK COMPLETED'
                      : isOtpValid
                      ? 'IN-PROGRESS'
                      : 'BOOKING CONFIRMED'
                  }
                  style={styles.bookingCOnfirmedText}
                />
              </View>
            </View>
            <View style={{padding: heightToDp(2)}}>
              {showFeedback ? (
                <View>
                  <View>
                    <CustomText text={'Rate the Service Provider'} style={{color: '#545454', fontFamily: 'Roboto'}} />
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: heightToDp(1)}}>
                      <AirbnbRating
                        count={5}
                        reviews={reviews}
                        defaultRating={rating}
                        size={30}
                        onFinishRating={handleRatingChange}
                        starStyle={{marginHorizontal: 6}}
                        showRating={false}
                      />
                      <Text style={{marginLeft: 10}}>{reviews[Math.floor(rating) - 1]}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginVertical: heightToDp(3),
                      borderTopWidth: 1,
                      borderTopColor: Color.colorSilver,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.colorSilver,
                      marginBottom: heightToDp(2),
                      marginTop: heightToDp(2),
                      paddingBottom: heightToDp(4),
                      paddingTop: heightToDp(2),
                    }}>
                    <CustomText
                      text={'Testimonials'}
                      style={{color: '#545454', fontSize: heightToDp(2.1), marginBottom: heightToDp(1)}}
                    />

                    <View style={{width: '100%', height: 90, backgroundColor: 'white', borderRadius: heightToDp(1)}}>
                      <TextAreaInputComponent
                        style={{
                          flex: 1,
                          fontSize: 16,
                          borderWidth: 1,
                          borderColor: 'gray',
                          borderRadius: 5,
                          padding: 10, // Optional: adds padding to make it look cleaner
                          textAlignVertical: 'top',
                        }}
                        placeholder="Enter text here"
                        onChangeText={onChangeText}
                      />
                    </View>
                  </View>
                  <View>
                    <CustomText
                      text={'Tip (Optional)'}
                      style={{color: '#545454', fontFamily: 'Roboto', marginBottom: heightToDp(0.3)}}
                    />
                    <Text style={{color: '#545454', fontFamily: 'Roboto', fontSize: heightToDp(1.4)}}>
                      Make their day a little brighter with your generosity,
                    </Text>
                    <Text style={{color: '#545454', fontFamily: 'Roboto', fontSize: heightToDp(1.4)}}>
                      100% of what you leave goes directly to your provider
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: heightToDp(2),
                      }}>
                      {percentageOptions.map(({percentage, label}, index) => (
                        <TouchableOpacity key={index} onPress={() => handleTextClick(percentage)}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: selectedText === percentage ? 'green' : '#D9D9D9',
                              padding: heightToDp(1.5),
                              borderRadius: heightToDp(0.5),
                            }}>
                            <Text
                              style={{
                                color: selectedText === percentage ? 'green' : '#000000',
                                fontWeight: 'bold',
                                fontSize: heightToDp(2),
                              }}>
                              {showAmount && selectedText === percentage && percentage !== 'Others'
                                ? `$${(jobDetails.salary * percentage) / 100}`
                                : label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {selectedText === 'Others' && (
                      <View style={{alignItems: 'center', marginBottom: heightToDp(2)}}>
                        <TextInput
                          value={customText}
                          onChangeText={text => {
                            // Remove non-numeric characters
                            const numericText = text.replace(/[^0-9]/g, '');
                            setCustomText(numericText);
                          }}
                          placeholder="Enter custom text"
                          style={{
                            borderWidth: 1,
                            borderColor: '#D9D9D9',
                            padding: 10,
                            borderRadius: 10,
                            width: 150,
                            alignItems: 'center',
                          }}
                          keyboardType="numeric" // Optional: this will open numeric keypad
                        />
                      </View>
                    )}

                    <CustomButton
                      title={
                        paymentLoader ? (
                          <ActivityIndicator
                            size={30}
                            color={'white'}
                            style={{justifyContent: 'center', alignItems: 'center'}}
                          />
                        ) : (
                          'SUBMIT'
                        )
                      }
                      style={{padding: heightToDp(1.4), backgroundColor: '#464183', borderRadius: heightToDp(1)}}
                      onPress={() => {
                        if (selectedText) {
                          cliclHandlePayment();
                        } else {
                          handleServiceCompleted();
                        }
                      }}
                    />
                  </View>
                </View>
              ) : isOtpValid ? (
                <View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: heightToDp(3)}}>
                    <View style={styles.iconWithTick}>
                      <View style={styles.profileVerifyLineContainer}>
                        <ProfileVerified />
                      </View>
                      <CustomText text={'Verify'} style={styles.statusText} />
                      <TickMark style={styles.verifytick} />
                    </View>
                    <View style={styles.iconWithTick}>
                      <View style={styles.profileVerifyLineContainer}>
                        {isWorkDone ? <WorkCompleted /> : <WorkInProgressStart />}
                      </View>
                      <CustomText text={'WORK STARTED'} style={styles.statusText} />
                      <TickMark style={styles.verifytick} />
                    </View>
                    <View style={styles.iconWithTick}>
                      <View style={styles.profileVerifyLineContainer}>
                        {isWorkDone ? <WorkCompleteStarted /> : <WorkCompleteInProgress />}
                      </View>
                      <CustomText text={'COMPLETED'} style={styles.statusText} />
                      <TickMark style={{opacity: isWorkDone ? 1 : 0}} />
                    </View>
                    <View style={styles.iconWithTick}>
                      <View style={styles.profileVerifyLineContainer}>
                        <ReviewIcon />
                      </View>
                      <CustomText text={'REVIEW'} style={styles.statusText} />
                      <TickMark style={{opacity: 0}} />
                    </View>
                  </View>
                  {isWorkDone ? (
                    <CustomButton
                      title={'REVIEW'}
                      style={{padding: heightToDp(1.4), backgroundColor: '#464183', borderRadius: heightToDp(1)}}
                      onPress={() => setFeedback(true)}
                    />
                  ) : (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <CustomButton
                        title={'WORK DONE'}
                        style={styles.WorkDoneButton}
                        onPress={() => setWorkDonePopup(true)}
                      />
                      <CustomButton title={'CANCEL SERVICE'} style={styles.CancelButton} onPress={onCancel_Afterotp} />
                    </View>
                  )}
                </View>
              ) : (
                <View style={{margin: heightToDp(1)}}>
                  <CustomText
                    text={'Validation Code'}
                    style={{
                      textAlign: 'center',
                      marginBottom: heightToDp(2),
                      color: '#000000',
                      fontFamily: 'Roboto',
                      fontSize: heightToDp(2.3),
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderColor: '#D9D9D9',
                      paddingVertical: widthToDp(5),
                      // paddingTop: heightToDp(2),
                      // paddingBottom: heightToDp(2),
                      // paddingLeft: heightToDp(1),
                      // paddingRight: heightToDp(1),
                      borderRadius: 5,
                      // marginBottom: heightToDp(2),
                    }}>
                    {otp.split('').map((digit, index) => (
                      <View
                        key={index}
                        style={{backgroundColor: '#D9D9D9', marginHorizontal: 18, padding: 4, borderRadius: 5}}>
                        <Text style={{fontSize: 20, letterSpacing: 20, fontWeight: 'bold', color: 'black'}}>
                          {digit}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text
                    style={{textAlign: 'center', color: '#555555', fontFamily: 'Roboto', fontSize: heightToDp(1.7)}}>
                    Kindly pass this code to the Service Provider
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#555555',
                      fontFamily: 'Roboto',
                      marginBottom: heightToDp(8),
                      fontSize: heightToDp(1.7),
                    }}>
                    while starting the work for validation
                  </Text>
                  <CustomButton
                    title={'CANCEL SERVICE'}
                    style={styles.cancelserviceButton}
                    textStyle={{color: '#FFFFFF', fontSize: heightToDp(2.2), fontFamily: 'Roboto', fontWeight: 'bold'}}
                    onPress={handleCancelService}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <CustomerServiceCompletedModal
          isVisiblecompleted={isServiceCompleted}
          serviceCompleteClose={serviceCompleteClose}
        />
        <ServiceCanceldModal
          isVisible={isServiceCancelled}
          isClose={onCloseModal}
          onPressCancelService={onPressCancelService}
          onCustCancelltionCharge={onCustCancelltionCharge}
        />
        <WorkDoneModal
          showWorkDonePopup={showWorkDonePopup}
          onWorkdone={onWorkdone}
          setWorkDonePopup={setWorkDonePopup}
          selectedJobDetails={selectedJobDetails}
          providerStatus={providerStatus}
        />
        <Service_CancelPopupAfter_otp
          cancelPopupAfterOtp={cancelPopupAfterOtp}
          onCancelAfterConfirm={onCancelAfterConfirm}
          popUpClose={popUpClose}
          onPressCancelService={onPressCancelService}
        />
      </Modal>
      <TransparentLoader visible={otpLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewbutton: {
    backgroundColor: '#5A2DAF',
  },

  submitButton: {
    marginTop: heightToDp(1),
    backgroundColor: '#5A2DAF',
  },
  reviewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  show: {
    opacity: 0,
  },
  hide: {
    opacity: 1,
  },

  feedBackText: {
    marginTop: heightToDp(2),
    marginBottom: heightToDp(1),
    letterSpacing: 1,
  },
  feedbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  feedbackInputComplete: {
    width: heightToDp(20),
    height: heightToDp(10),
  },

  feedbackInput: {
    borderRadius: 8,
    backgroundColor: '#e9e9e9',
    width: heightToDp(30),
    height: heightToDp(15),
  },

  text: {
    fontSize: heightToDp(1.5),
  },

  statusText: {
    fontSize: 8,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '300',
    fontFamily: 'Helvetica',
    color: '#000',
    marginTop: 3,
    marginBottom: 3,
  },

  iconWithTick: {
    alignItems: 'center',
  },

  workStarted: {
    borderColor: '#5A2DAF',
    borderWidth: 4,
    borderRadius: 40,
  },

  buttonContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightToDp(4),
  },

  cancelThisService: {
    // ontSize: 4,
    fontSize: heightToDp(1.7),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#000',
    backgroundColor: '#FF0000',
    width: heightToDp(22),
    padding: heightToDp(1.5),
    borderRadius: heightToDp(1),

    color: '#fff',
    textAlign: 'center',
  },

  button: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    // borderRadius: 8,
    backgroundColor: '#008000',
    // width: heightToDp(16),
    padding: heightToDp(1.5),
    borderRadius: heightToDp(7),
    fontSize: 16,
    letterSpacing: 0.4,
    borderRadius: heightToDp(1),
    width: heightToDp(22),
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: heightToDp(3),
  },

  ServiceProgressText: {
    marginTop: heightToDp(4),
    ontSize: 10,
    letterSpacing: 7,
    textTransform: 'uppercase',
    fontWeight: '300',
    fontFamily: 'Helvetica',
    color: '#000',
    textAlign: 'center',
  },

  name: {
    fontSize: heightToDp(2),
    // textTransform: "capitalize",
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#000',
  },
  customerDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callAndMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },

  logoNAmeAndStartsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  customerShortName: {
    padding: 10,
    color: '#fff',
    fontSize: heightToDp(2.5),
    fontWeight: '700',
    fontFamily: 'Helvetica',
    letterSpacing: 0.8,
  },

  customerNameLogo: {
    backgroundColor: '#5a2daf',
    height: heightToDp(6),
    width: heightToDp(6),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  modalContainer: {
    justifyContent: 'flex-end',
    margin: 15,
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: heightToDp(3),

    // height: heightToDp(55),
    // padding: 15,
  },

  profilePicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  heading: {
    fontFamily: 'Roboto',
    color: '#000000',
    fontSize: heightToDp(2.1),
  },

  subHeading: {
    fontFamily: 'Roboto',
    color: '#000000',
    fontSize: heightToDp(1.5),
  },

  bookingConfirmedSvgContainer: {
    position: 'relative',
    marginVertical: heightToDp(1),
    marginTop: heightToDp(2),
  },
  bookingCOnfirmedText: {
    position: 'absolute',
    color: 'white',
    marginLeft: heightToDp(1),
    marginTop: heightToDp(0.3),
    fontSize: heightToDp(2.2),
  },
  cancelserviceButton: {
    backgroundColor: '#FF5757',
    padding: heightToDp(1),
    borderRadius: heightToDp(1.2),
  },

  WorkDoneButton: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    backgroundColor: '#00BF63',
    width: heightToDp(20),
    padding: heightToDp(1.5),
    fontSize: 16,
    letterSpacing: 0.4,
    borderRadius: heightToDp(1),
    marginRight: 2,
  },
  CancelButton: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    backgroundColor: '#FF5757',
    width: heightToDp(20),
    padding: heightToDp(1.5),
    fontSize: 16,
    letterSpacing: 0.4,
    borderRadius: heightToDp(1),
    marginLeft: 2,
  },
  image: {
    height: heightToDp(7),
    width: heightToDp(7),
    resizeMode: 'cover', // Or 'contain', 'stretch', etc.
    borderRadius: 50,
  },
});

export default CustomerSidePaymentModel;
