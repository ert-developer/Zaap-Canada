import Modal from 'react-native-modal';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert, Linking} from 'react-native';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import CustomText from '../../atoms/text/textComponent';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Live} from '../../assets/svgImage/home';
import {
  Call,
  IIcon,
  Lines,
  MessageIcon,
  ProfileVerify,
  WorkInProgressStart,
  TickMark,
  WorkInProgressCompleted,
  WorkCompleteStarted,
  WorkCompleted,
  WorkInProgress,
  WorkCompleteInProgress,
  ProfileVerified,
} from '../../assets/svgIcons/providerPaymentSvg';
import CustomButton from '../../atoms/button/buttonComponent';
import ServiceCompletedNodal from '../backdroppressmodal/Service-completed-Modal';
import ServiceCanceldModal from '../backdroppressmodal/service-cancelled-modal';
import CommonOtpInput from '../../molecules/customotpinput/customotp';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {MapIconSvg} from '../../assets/svgIcons/providerPaymentSvg';
import {DottedLines} from '../../assets/svgImage/bottomDrawer';
import {BookingConfirm} from '../../assets/svgImage/bottomDrawer';
import {SmallDottedLines} from '../../assets/svgImage/bottomDrawer';
import {NewInfoIcon} from '../../assets/svgImage/bottomDrawer';
import {InProgresBannersSvg} from '../../assets/svgImage/bottomDrawer';
import Tooltip from 'react-native-walkthrough-tooltip';
import {FeedbackBannerSvg} from '../../assets/svgImage/bottomDrawer';
import {AirbnbRating} from 'react-native-ratings';
import {NewReviewSvg} from '../../assets/svgImage/bottomDrawer';
import {postCollectionDetails, getUserDetails, deleteDocument} from '../../common/collection';
import VerificationSuccessModal from '../../molecules/custommodal';
import {db} from '../../../firebaseDb';
import ServiceProviderCanceldModal from '../serviceprovidercancelmodal/service-provider-cancel-modal';
import WrongOtpMdal from '../../molecules/custommodal/wrong-otp-popup';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {Padding, Margin, FontFamily, FontSize, Color} from '../../assets/static/globalStyles';
import {mailSenter} from '../../common/mailSender';
import {doc, updateDoc, getDoc, FieldValue} from 'firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';

const PreviousJobsPaymentModal = () => {
  const selectedJobDetails = useSelector(state => state.serviceproviderselectedjobDetails.selectedJobDetails);

  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const [roomDetails, setRoomDetails] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showWrongOtpModal, setShowWrongOtpModal] = useState(false);
  const [employerData, setEmployerData] = useState([]);
  const navigation = useNavigation();

  /////After work complete onBackdropPress it will go to home screen/////////
  // asdf Service Provider OTP cancel
  const serviceCompleteClose = () => {
    setIsWorkFinished(false);
    navigation.navigate('HomeScreen');
  };

  const closeInvalidOtpPopup = () => {
    setShowWrongOtpModal(false);
  };

  const getRoomDetails = async (userId1, userId2) => {
    try {
      const snapshot = await database().ref(`/${envConfig.chatlist}/${userId1}/${userId2}`).once('value');
      const roomDetails = snapshot.val();
      setRoomDetails(roomDetails);
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const fetchEmployerData = async () => {
    try {
      const q = query(collection(db, envConfig.User), where('userId', '==', selectedJobDetails?.customerId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());

      setEmployerData(data[0]);
    } catch (error) {
      console.error('Error fetching Customer Feedback data:', error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const openGoogleMaps = () => {
    const address = encodeURIComponent(jobDetails.address); // Encode the address for URL usage

    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;

    Linking.openURL(url)
      .then(result => {
        if (result) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error opening Google Maps', error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getRoomDetails(selectedJobDetails.candidateUserId, selectedJobDetails.customerId);
  }, [selectedJobDetails.customerId, selectedJobDetails.candidateUserId]);

  const user = useSelector(state => state.Auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    // console.log("----------------------------------------------------------")
    setModalVisible(!isModalVisible);
  };
  const [isWorkStartedButton, setWorkStartedButton] = useState(false);
  const [otpEntered, setOtpEntered] = useState('');
  const [isWorkStarted, setWorkStarted] = useState(false);

  const [isComplete, setComplete] = useState(false);
  // const [isFinish,setFinish]=useState(false)

  const [isOtpValid, setOtpValid] = useState();
  const handleOtpChange = code => {
    setOtpEntered(code);
    // Check if the OTP is entered, then enable work start
    setWorkStartedButton(code.length > 0);
  };

  const handleStartWork = () => {
    setWorkStarted(true);
  };

  const handleComplete = () => {
    setComplete(true);
  };

  // const handleFinish = ()=>{
  //   setFinish(true)
  // }

  const validateOtp = async () => {
    try {
      const snapshot = await database()
        .ref(`myjobs/${selectedJobDetails.customerId}_${selectedJobDetails.jobId}`)
        .child('otpData')
        .once('value');
      const otpData = snapshot.val();

      if (otpData) {
        const {otp} = otpData;
        if (otp) {
          const otpEnteredValue = otpEntered;

          if (otpEnteredValue == otp) {
            handleVerificationSuccessPopup();
            setModalVisible(true);
            // Alert.alert("otp is valid")
            database()
              .ref(`myjobs/${selectedJobDetails.customerId}_${selectedJobDetails.jobId}`)
              .child('otpData')
              .update({otpValidationStatus: true});
          } else {
            setShowWrongOtpModal(true);
            console.error('Invalid OTP');
            // Alert.alert('Invalid OTP', 'Invalid Otp');
          }
        } else {
          console.error('OTP is not available');
        }
      }
    } catch (error) {
      console.error('Error fetching OTP data:', error);
    }
  };
  useEffect(() => {
    const otpValidationStatusRef = database()
      .ref(`myjobs/${selectedJobDetails.customerId}_${selectedJobDetails.jobId}`)
      .child('otpData');

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
      otpValidationStatusRef.off('value', handleOtpValidationStatus);
    };
  }, []);

  const [isWorkDone, setIsWorkDone] = useState(null);

  useEffect(() => {
    const isWorkDoneRef = database().ref(
      `/${envConfig.myjobs}/${selectedJobDetails.customerId}_${selectedJobDetails.jobId}/isworkdone/isworkdone`,
    );

    const handleSnapshot = snapshot => {
      const value = snapshot.val();
      setIsWorkDone(value);
    };

    isWorkDoneRef.on('value', handleSnapshot);

    return () => {
      isWorkDoneRef.off('value', handleSnapshot);
    };
  }, []);

  // console.log("isWorkDonepreviousjobs",isWorkDone)

  const workFinished = () => {
    const otpData = {
      isworkdone: true,
    };

    // Store the OTP in a common location in the Firebase Realtime Database
    database()
      .ref(`myjobs/${selectedJobDetails.customerId}_${selectedJobDetails.jobId}`)
      .child('isWorkFinished')
      .set(otpData);
  };

  const [isWorkFinished, setIsWorkFinished] = useState(false);

  // useEffect(() => {
  //   const isWorkFinishedRef = database().ref('/common/isWorkFinished/isworkdone');

  //   const handleSnapshot = snapshot => {
  //     const value = snapshot.val();
  //     setIsWorkFinished(value);
  //     console.log('Updated isWorkFinished:', value);
  //     // Perform actions with the updated isWorkFinished value
  //   };

  //   isWorkFinishedRef.on('value', handleSnapshot);

  //   return () => {
  //     isWorkFinishedRef.off('value', handleSnapshot);
  //   };
  // }, []); // Empty dependency array means this effect runs once when the component mounts
  const [jobDetails, setJobDetails] = useState('');

  let phoneNumber;

  useEffect(() => {
    const getJobDetails = async () => {
      const docRef = doc(db, envConfig.Jobs, selectedJobDetails.jobId);

      // Get the current document data
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      setJobDetails(docData);
      phoneNumber = jobDetails.phone; // Replace this with your actual phone number
    };

    getJobDetails();
  }, []);

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

  const [chatIconOpacity, setChatIconOpacity] = useState(0.5);
  useEffect(() => {
    if (isJobCancelled || roomDetails == null || roomDetails == undefined) {
      setChatIconOpacity(0.5);
    } else {
      setChatIconOpacity(1);
    }
  }, [isJobCancelled, showFeedback, roomDetails]);

  const handleMessageIconPress = async () => {
    if (selectedJobDetails) {
      await getRoomDetails(selectedJobDetails.candidateUserId, selectedJobDetails.customerId);
    }
    if (isJobCancelled || roomDetails == null || roomDetails == undefined) {
      Alert.alert("Chat isn't enabled", 'Chat is Enabled only if a job is active\nThank You', [{text: 'OK'}]);
      return;
    } else {
      if (roomDetails.isDisabled) {
        await database()
          .ref(`/chatlist/${roomDetails.customerId}/${roomDetails.providerId}`)
          .update({isDisabled: false});
        await database()
          .ref(`/chatlist/${roomDetails.providerId}/${roomDetails.customerId}`)
          .update({isDisabled: false});
        roomDetails.isDisabled = false;
      }
      navigation.navigate('OneChat', {chatDetail: roomDetails});
    }
  };

  const [rating, setRating] = useState(0); // Initial rating
  const reviews = ['Disappointing', 'Bad', 'Good', 'Very Good', 'Excellent'];

  const handleRatingChange = newRating => {
    setRating(newRating);
  };
  const [showFeedback, setFeedback] = useState(false);
  const [VerificationPopUp, SetVerificationPopUp] = useState(false);
  const [cancelPopup, setCancelPopup] = useState(false);
  const [isJobCancelled, setIsJobCancelled] = useState(false);
  const handleVerificationSuccessPopup = () => {
    SetVerificationPopUp(true);
  };

  //////////This is Cancel on press Button/////////////
  const onPressCancelPopup = async () => {
    setCancelPopup(true);
  };

  ////////This is Cancel the cancel service popup////////
  const onPressGoBackCancelPopup = () => {
    setCancelPopup(false);
  };

  const onModalClose = () => {
    SetVerificationPopUp(false);
  };

  const handleFeedbackStars = async () => {
    const feedBack = {
      // customerName: user.displayName,
      customerId: selectedJobDetails.customerId,
      feedBackDate: Date.now(),
      startRating: rating,
    };
    try {
      let response = await postCollectionDetails(envConfig.serviceProvider_Feedback, feedBack);
      setIsWorkFinished(true);
      // console.log("Completed job added successfully with ID: ", response.id);
    } catch (error) {
      console.error('Error adding completed job data to Firestore:', error);
    }
  };

  /////////////////// This is Cancel Serive Function for Service Provider///////////////////
  const onPressCancelService = async () => {
    try {
      const docRef = doc(db, envConfig.Jobs, selectedJobDetails.jobId);

      // Get the current document data
      // Initialize cancelCandidateDetails as an array if it doesn't exist
      const cancelCandidateDetails = jobDetails.cancelCandidateDetails || [];

      // Push the new object into the array
      cancelCandidateDetails.push({
        serviceProviderName: providerStatus[0].legal_name_on_id,
        serviceProviderId: selectedJobDetails.candidateUserId,
        customerId: selectedJobDetails.customerId,
        jobID: selectedJobDetails.jobId,
        jobTitle: selectedJobDetails.jobTitle,
        jobSalary: selectedJobDetails.salary,
      });

      // Remove object from jobApplications array where userId matches
      // const updatedJobApplications = docData.jobApplications.filter(
      //   application => application.userId !== selectedJobDetails.candidateUserId,
      // );

      // Update the document with the modified cancelCandidateDetails array
      await updateDoc(docRef, {
        IsBookingCancel: true,
        IsBookingConfirmed: false,
        cancelCandidateDetails: cancelCandidateDetails,
        // jobApplications: updatedJobApplications,
        // selectedCandidateDetails: FieldValue.delete(),
      });

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

      const to = `${employerData?.email}`;
      const subject = 'Booking Cancellation Notification';
      const textMsg = `Hi ${employerData?.displayName},\n\nWe regret to inform you that, due to unforeseen circumstances, your chosen service provider has had to cancel the booking for ${jobDetails.data.jobTitle} scheduled for ${jobDetails.data.startdate}. We sincerely apologize for the inconvenience.\n\nThank you,\nTeam ZAAP`;

      const bodyText = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2>Booking Cancellation Notification</h2>
        <p>Hi <strong>${employerData?.displayName}</strong>,</p>
        
        <p>We hope you’re doing well.</p>
      
        <p>We regret to inform you that, due to unforeseen circumstances, your chosen service provider has had to cancel the booking for <strong>${jobDetails.data.jobTitle}</strong> scheduled for <strong>${jobDetails.data.startdate}</strong>. We understand that this change may be inconvenient, and we sincerely apologize for the disruption to your plans.</p>
      
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Service Provider:</strong> ${providerStatus[0].legal_name_on_id}</li>
          <li><strong>Service:</strong> ${jobDetails.data.jobTitle}</li>
          <li><strong>Scheduled Date:</strong> ${jobDetails.data.startdate}</li>
        </ul>
      
        <h3>Action Taken:</h3>
        <ul>
          <li>A formal warning has been issued to the service provider, emphasizing the importance of honoring bookings and maintaining reliability.</li>
          <li>The service provider's account has been temporarily suspended from our platform while we investigate further.</li>
        </ul>
      
        <h3>What You Can Do Next:</h3>
        <ol>
          <li>Navigate to the “My Jobs” section on your dashboard.</li>
          <li>Select the current job listed under “Live Ads.”</li>
          <li>Click on the dropdown menu and select “Applicants List.”</li>
          <li>Review the list of applicants and check their reviews, ratings, and portfolios.</li>
          <li>Select the service provider who best matches your requirements and preferences.</li>
        </ol>
      
        <p>If you need any assistance or have questions, reach out to our support team via email at <a href="mailto:help@zaapondemand.ca">help@zaapondemand.ca</a>.</p>
      
        <p>Thank you for your patience and understanding.</p>
      
        <p>Best regards,<br/>Team ZAAP</p>
      </div>
      `;

      mailSenter(to, subject, textMsg, bodyText);

      const to1 = `${providerStatus[0]?.email_id}`;
      const subject1 = 'Urgent: Consequences of Confirmed Booking Cancellation';
      const textMsg1 = `Hi ${providerStatus[0]?.legal_name_on_id},\n\nWe regret to inform you that your cancellation of a confirmed booking may result in consequences, including account suspension or termination. Please contact us for further assistance.\n\nThank you,\nTeam ZAAP`;

      const bodyText1 = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2>Urgent: Consequences of Confirmed Booking Cancellation</h2>
  <p>Hi <strong>${providerStatus[0]?.legal_name_on_id}</strong>,</p>

  <p>We hope this message finds you well.</p>

  <p>We are writing to address a recent issue regarding your <strong>cancellation of a confirmed booking</strong>. Such cancellations after confirmation are not acceptable under our platform’s policies and may result in serious consequences, including <strong>account suspension</strong> or <strong>termination</strong>. Honoring bookings is essential to maintaining trust and reliability on our platform.</p>

  <h3>Booking Details:</h3>
  <ul>
    <li><strong>Customer Name:</strong> ${employerData.displayName}</li>
    <li><strong>Service:</strong> ${jobDetails.data.jobTitle}</li>
    <li><strong>Scheduled Date:</strong> ${jobDetails.data.startdate}</li>
  </ul>

  <p>Cancellations of confirmed bookings disrupt the service experience for our customers and negatively impact the reliability of our platform. This behavior is taken very seriously.</p>

  <h3>Consequences:</h3>
  <ul>
    <li><strong>Immediate Action:</strong> This cancellation will be documented.</li>
    <li><strong>Account Termination:</strong> Repeated cancellations or failure to adhere to confirmed bookings could lead to permanent termination of your account on our platform.</li>
  </ul>

  <p>We urge you to adhere to confirmed bookings and avoid unnecessary cancellations. Maintaining a reliable and professional standard is crucial for the integrity of our platform and the satisfaction of our customers.</p>

  <p>If you have any questions or wish to discuss this matter further, please contact us directly at <a href="mailto:help@zaapondemand.ca">help@zaapondemand.ca</a>.</p>

  <p>Thank you for your prompt attention to this matter.</p>

  <p>Best regards,<br/>Team ZAAP</p>
</div>
`;

      mailSenter(to1, subject1, textMsg1, bodyText1);

      const data = {
        title: 'Service Provider Cancelled the Service',
        message: `Hello ${employerData?.displayName},\n\nWe regret to inform you that the service provider has cancelled the service. Please contact us for further assistance.\n\nThank you,\nTeam Zaap`,
        userId: selectedJobDetails.customerId,
        markasread: false,
        time: new Date(),
        screen: 'MyJobScreen',
      };
      await postCollectionDetails(envConfig.Notifications, data);

      setIsJobCancelled(true);

      console.log('Fields added successfully to document & SP deleted from selectedProfiles_dev');
    } catch (error) {
      console.error('Error adding field to document:', error);
    }
  };

  return (
    <View>
      <Modal isVisible={true} style={styles.modalContainer}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={{height: '100%', width: '100%'}}>
          {' '}
        </Text>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: heightToDp(2.5),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: heightToDp(1)}}>
              {employerData?.imageUrl ? (
                <Image source={{uri: employerData?.imageUrl}} style={styles.profilePhoto} />
              ) : (
                <Image source={require('../../assets/default-profile.png')} style={styles.profilePhoto} />
              )}
              <View>
                <CustomText
                  text={employerData?.displayName}
                  style={{fontFamily: 'Roboto', color: '#000000', fontSize: heightToDp(2.2)}}
                />
                <Text style={{fontFamily: 'Roboto', color: '#000000', fontSize: heightToDp(1.6)}}>Employer</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: heightToDp(3.5)}}>
              {/* <Call />
              <MessageIcon /> */}
              <TouchableOpacity onPress={handlePhoneIconPress}>
                <Call />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMessageIconPress}>
                <MessageIcon opacity={chatIconOpacity} />
              </TouchableOpacity>
              {isOtpValid ? null : (
                <Tooltip
                  isVisible={tooltipVisible}
                  content={
                    <View>
                      <TouchableOpacity onPress={openGoogleMaps}>
                        <View style={{borderBottomWidth: 1, borderBottomColor: '#BCBCBC'}}>
                          <CustomText text={'View Direction'} />
                        </View>
                        <View>
                          <Text>{`https://www.google.co........`}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                  onClose={() => setTooltipVisible(false)}>
                  <TouchableOpacity onPress={() => setTooltipVisible(true)}>
                    <MapIconSvg />
                  </TouchableOpacity>
                </Tooltip>
              )}
            </View>
          </View>
          <View>
            <DottedLines />
            <View style={styles.bookingConfirmed}>
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
                    ? 'WORK FEEDBACK'
                    : isWorkDone
                    ? 'WORK COMPLETED'
                    : isOtpValid
                    ? 'IN-PROGRESS'
                    : 'BOOKING CONFIRMED'
                }
                style={styles.bookingconfirmText}
              />
            </View>
          </View>

          {showFeedback ? (
            <View style={{padding: heightToDp(2)}}>
              <View style={{marginBottom: heightToDp(7)}}>
                <CustomText text={'Rate the Employer'} style={{fontFamily: 'Roboto', color: '#545454'}} />
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
              <CustomButton
                title={'SUBMIT'}
                style={{padding: heightToDp(1.4), backgroundColor: '#464183', borderRadius: heightToDp(1)}}
                onPress={handleFeedbackStars}
              />
            </View>
          ) : isOtpValid ? (
            <View style={{padding: heightToDp(1)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: heightToDp(4),
                  marginHorizontal: heightToDp(4),
                  gap: heightToDp(3),
                }}>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <ProfileVerified />
                    <CustomText text={'VERIFY'} style={styles.statusText} />
                    <TickMark />
                  </View>
                </View>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <WorkInProgressCompleted />
                    <CustomText text={'WORK STARTED'} style={styles.statusText} />
                    <TickMark />
                  </View>
                </View>
                <View>
                  <View style={{alignItems: 'center'}}>
                    {isWorkDone ? <WorkCompleted /> : <WorkCompleteInProgress />}

                    <CustomText text={'COMPLETED'} style={styles.statusText} />
                    <TickMark style={{opacity: isWorkDone ? 1 : 0}} />
                  </View>
                </View>
              </View>
              {isWorkDone ? (
                <CustomButton
                  title={'NEXT'}
                  style={{padding: heightToDp(1.4), backgroundColor: '#464183', borderRadius: heightToDp(1)}}
                  onPress={() => setFeedback(true)}
                />
              ) : (
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <NewInfoIcon />
                    <Text style={{fontFamily: 'Roboto', fontSize: heightToDp(1.7)}}>Kindly request the Customer </Text>
                  </View>
                  <Text style={{fontFamily: 'Roboto', fontSize: heightToDp(1.4)}}>
                    to Click “Work Done” upon completion{' '}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={{padding: heightToDp(2)}}>
              <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <ProfileVerified />
                    <CustomText text={'Verify'} style={styles.statusText} />
                    <TickMark />
                  </View>
                </View>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <WorkInProgressStart />
                    <CustomText text={'Work started'} style={styles.statusText} />
                    <TickMark />
                  </View>
                </View>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <WorkInProgress />
                    <CustomText text={'COMPLETED'} style={styles.statusText} />
                    <TickMark style={{opacity: 0}} />
                  </View>
                </View>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <NewReviewSvg />
                    <CustomText text={'Verify'} style={styles.statusText} />
                    <TickMark style={{opacity: 0}} />
                  </View>
                </View>
              </View>

              <View>
                <View style={{marginVertical: heightToDp(3)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: heightToDp(1),
                      gap: heightToDp(0.5),
                    }}>
                    <NewInfoIcon />

                    <Text style={{fontSize: heightToDp(1.5)}}>
                      Ask customer to provide Validation key to begin the work
                    </Text>
                  </View>

                  <View style={styles.centeredButtonContainer}>
                    <CommonOtpInput
                      handleChange={handleOtpChange}
                      numberOfInputs={4}
                      inputStyles={{
                        backgroundColor: '#BCBCBC',
                        width: 45,
                        height: 45,
                        fontSize: 16,
                        color: '#000',
                        textAlign: 'center',
                      }}
                      containerStyles={{flexDirection: 'row'}}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <CustomButton
                    title={'START WORK'}
                    style={styles.startWorkButton}
                    textStyle={styles.startWorkBtnText}
                    onPress={validateOtp}
                  />

                  <CustomButton
                    title={'Cancel Service'}
                    style={styles.cancelService}
                    textStyle={styles.cancelBtnText}
                    onPress={() => {
                      onPressCancelPopup();
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          {/* <View style={styles.customerDetailsContainer}>
            <View style={styles.logoNAmeAndStartsContainer}>
              <View style={styles.customerNameLogo}>
                <CustomText text={'SK'} style={styles.customerShortName} />
              </View>
              <View>
                <CustomText text={user.displayName} style={styles.name} />
                <CustomText text={'⭐⭐⭐'} />
              </View>
            </View>

            <View style={styles.callAndMessageContainer}>
            <TouchableOpacity onPress={handlePhoneIconPress}>
              <Call />

              </TouchableOpacity>
              <TouchableOpacity>
                <MessageIcon onPress={() => navigation.navigate('OneChat', {chatDetail: roomDetails})} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openGoogleMaps()}>
                <Live />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* <View>
            <Lines />

            <CustomText text={'SERVICE PROGRESS'} style={styles.ServiceProgressText} />

            <View style={styles.iconsContainer}>
              <View style={styles.iconWithTick}>
                {isOtpValid ? <ProfileVerified /> : <ProfileVerify />}
                <CustomText text={'Verify'} style={styles.statusText} />
                <TickMark style={isOtpValid ? styles.hide : styles.show} />
              </View>
              <View style={styles.iconWithTick}>
                {isWorkDone ? <WorkInProgressCompleted /> : isOtpValid ? <WorkInProgressStart /> : <WorkInProgress />}

                <CustomText text={'in Progress'} style={styles.statusText} />
                <TickMark style={isWorkDone ? styles.hide : styles.show} />
              </View>
              <View style={styles.iconWithTick}>
                {isWorkFinished ? <WorkCompleted /> : isWorkDone ? <WorkCompleteStarted /> : <WorkCompleteInProgress />}

                <CustomText text={'Completed'} style={styles.statusText} />
                <TickMark style={isWorkFinished ? styles.hide : styles.show} />
              </View>
            </View>

            {isOtpValid ? (
              isWorkDone ? null : (
                <TouchableOpacity onPress={handleComplete}>
                  <View style={styles.askTheCXTextContainer}>
                    <IIcon style={styles.Iicon} />
                    <CustomText text={'Ask the Customer to click on work done to finish'} style={styles.askCxText} />
                  </View>
                </TouchableOpacity>
              )
            ) : (
              <View>
                <View style={styles.centeredButtonContainer}>
                  <CommonOtpInput
                    handleChange={handleOtpChange}
                    numberOfInputs={4}
                    inputStyles={{
                      backgroundColor: '#DEE2E6',
                      borderRadius: 10,
                      margin: 5,
                      width: 50,
                      height: 50,
                      fontSize: 16,
                      color: '#000',
                      textAlign: 'center',
                    }}
                    containerStyles={{flexDirection: 'row'}}
                  />
                </View>

                {isWorkStartedButton && (
                  <View style={styles.buttonContainer}>
                    <CustomButton title={'START WORK'} style={styles.startWorkButton} onPress={validateOtp} />
                  </View>
                )}

                <View style={styles.informationContainer}>
                  <IIcon />
                  <CustomText
                    text={'Ask the customer to check for OTP in My Jobs > This Job  '}
                    style={styles.askTheCustomer}
                  />
                </View>
              </View>
            )}
          </View> */}

          {/* {isWorkDone ? (
            <View style={styles.finishButton}>
              <CustomButton title={'Finish'} style={styles.startWorkButton} onPress={workFinished} />
            </View>
          ) : null}  */}
        </View>

        <ServiceCompletedNodal isVisiblecompleted={isWorkFinished} serviceCompleteClose={serviceCompleteClose} />
        {VerificationPopUp && <VerificationSuccessModal toggleModal={onModalClose} />}
        {showWrongOtpModal && <WrongOtpMdal toggleModal={closeInvalidOtpPopup} />}
        {cancelPopup && (
          <ServiceProviderCanceldModal
            isVisible={cancelPopup}
            onPressGoBackCancelPopup={onPressGoBackCancelPopup}
            onPressCancelService={onPressCancelService}
            setCancelPopup={setCancelPopup}
          />
        )}
      </Modal>
    </View>
  );
};

export default PreviousJobsPaymentModal;

const styles = StyleSheet.create({
  show: {
    opacity: 0,
  },
  hide: {
    opacity: 1,
  },
  finishButton: {
    alignItems: 'center',
    marginTop: heightToDp(3),
  },
  Iicon: {
    marginTop: heightToDp(0.3),
  },
  askTheCXTextContainer: {
    marginTop: heightToDp(4),
    padding: 4,
    // alignItems:"center",
    flexDirection: 'row',
    // alignItems:"center"
  },
  askCxText: {
    textAlign: 'center',

    fontSize: heightToDp(1.5),
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#5a2daf',
  },

  workFinishedButton: {
    flexDirection: 'row',
    gap: 30,
  },

  centeredButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightToDp(1),
    // marginTop: heightToDp(1),
    borderColor: Color.colorSilver,
    borderWidth: 0.2,
    borderRadius: heightToDp(0.5),
  },

  tickMark: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    alignItems: 'center',
  },
  inputTextAndButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedBack: {},
  text: {
    fontSize: heightToDp(1),
  },

  statusText: {
    fontSize: 8,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '300',
    fontFamily: 'Helvetica',
    color: '#000',
    marginTop: 2,
    marginBottom: 2,
  },
  iconWithTick: {
    alignItems: 'center',
  },
  workStarted: {
    borderColor: '#5A2DAF',
    borderWidth: 4,
    borderRadius: 40,
  },
  informationContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightToDp(2),
  },
  askTheCustomer: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#5a2daf',
    textAlign: 'left',
    width: 275,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightToDp(2),
  },
  cancelThisService: {
    // ontSize: 4,
    fontSize: heightToDp(1.5),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#000',
  },
  startWorkButton: {
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
  },
  cancelService: {
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
  },
  startWorkBtnText: {
    textTransform: 'uppercase',
    fontSize: widthToDp(3.5),
  },
  cancelBtnText: {
    textTransform: 'uppercase',
    fontSize: widthToDp(3.5),
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
    // margin: heightToDp(2),
  },
  modalContent: {
    backgroundColor: 'white',

    borderRadius: heightToDp(1),
  },
  bookingConfirmed: {
    position: 'relative',
    marginTop: heightToDp(2),
  },
  bookingconfirmText: {
    position: 'absolute',
    color: 'white',
    marginLeft: heightToDp(1),
    marginTop: heightToDp(0.6),
    fontSize: heightToDp(2.2),
  },
  profilePhoto: {
    borderRadius: 50,
    width: widthToDp(14),
    height: heightToDp(7),
    marginRight: heightToDp(1),
  },
});
