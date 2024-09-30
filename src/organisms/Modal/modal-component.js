import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image, Alert, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../atoms/button/buttonComponent';
import SvgComponent from '../../assets/svgIcons/hennaSvg/svghenna';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import ZaapLogoSvgComponent from '../../assets/svgIcons/zaaplogosvg/zaaplogosvg';
import ArrowSvgComponent from '../../assets/svgIcons/arrrowiconsvg/arrowiconsvg';
import {useNavigation} from '@react-navigation/native';
import usePayment from '../../custom-hooks/payment/usePayment';
import {useSelector, useDispatch} from 'react-redux';
import CardJobs from '../../molecules/job-card/jobCard';
import {postCollectionDetails} from '../../common/collection';
import {fetchSelectedProfileDetails} from '../../redux/selectedprofiledetails/action';
// import { FeedbacjobkSVGComponent } from '../../assets/svgIcons/feebackpaymentmodal';
import {fetchAppliedJobsSuccess} from '../../redux/appliedjobs/action';
import {fetchSelectedJobs} from '../../redux/selectedjobs/action';
import MyjobsCardList from '../myjobscardlist/myjobscardList-component';
import {fetchCompletedJobs} from '../../redux/completedjobs/action';
import CustomModal from '../../molecules/custommodal';
import {useState} from 'react';
import BookingConfirmedModal from '../../molecules/modals/bookingconfirmedmodal';
import database from '@react-native-firebase/database';
import {generateRoomId} from '../../utils';
import {YouAreHiringSvg} from '../../assets/svgImage/bottomDrawer';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../../firebaseDb';
import {Code} from 'react-content-loader/native';
import {Color} from '../../assets/static/globalStyles';
import {getUserDetails} from '../../common/collection';
import {mailSenter} from '../../common/mailSender';
import {collection, query, where, getDocs} from 'firebase/firestore';
import handlePayment from '../../custom-hooks/payment/useRazorPayPayment';
import getPlatformFee from '../../common/platformFee';
import {envConfig} from '../../assets/helpers/envApi';

const ModalComponent = ({isVisible, onClose, userWorking}) => {
  const user = useSelector(state => state.Auth.user);
  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails);
  const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails);
  ///////////// 20 percentage of job salary /////////////
  // asdf Customer One time Pay and One Time OTP
  const amount = jobDetails.salary;

  const getPlatformFee = transactionAmount => {
    let fee = 0;

    if (transactionAmount <= 100) {
      fee = transactionAmount * 0.1;
      return Math.max(fee, 5); // Apply minimum fee of $5
    } else if (transactionAmount <= 499) {
      fee = transactionAmount * 0.09;
    } else if (transactionAmount <= 999) {
      fee = transactionAmount * 0.08;
    } else if (transactionAmount <= 4999) {
      fee = transactionAmount * 0.07;
    } else if (transactionAmount <= 9999) {
      fee = transactionAmount * 0.06;
    } else if (transactionAmount <= 19999) {
      fee = transactionAmount * 0.05;
    } else if (transactionAmount <= 49999) {
      fee = transactionAmount * 0.04;
    } else {
      fee = transactionAmount * 0.03;
      return Math.min(fee, 2000); // Apply maximum fee of $2000
    }

    return fee;
  };

  const platformFee = getPlatformFee(amount);

  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const sendNotificationToServiceProvider = async () => {
    const appliedUser = await getUserDetails(envConfig.User, profiledetail.userId);
    const token = appliedUser.fcmToken;
    try {
      const response = await fetch('https://push-notifications-server-lvzr.onrender.com/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          title: 'Booking Confirmed',
          message: `You have been selected for the job ${jobDetails.jobTitle}`,
        }),
      });

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
    const data = {
      title: 'Booking Confirmed',
      message: `You have been selected for the job ${jobDetails.jobTitle}`,
      userId: profiledetail.userId,
      markasread: false,
      time: new Date(),
      screen: 'MyJobScreen',
    };
    await postCollectionDetails(envConfig.Notifications, data);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const addFieldToJobsDev = async () => {
    try {
      const docRef = doc(db, envConfig.Jobs, jobDetails.jobId);

      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();

      // Update the document with the new field and value
      await updateDoc(docRef, {
        IsBookingConfirmed: true,
        IsBookingCancel: false,
        IsPaid: true,
        selectedCandidateDetails: {
          name: profiledetail.name,
          userId: profiledetail.userId,
          profileImage: profiledetail.profileImage,
          AppliedOn: profiledetail.AppliedOn,
          bio: '',
        },
      });
      sendNotificationToServiceProvider();
    } catch (error) {
      console.error('Error adding field to document:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate('ProviderPaymentScreen');
  };
  const {handleCheckout} = usePayment();
  const dispatch = useDispatch();

  const iinchatScreenNavigation = async data => {
    // Generate a unique room ID
    // const roomId = generateRoomId();

    const snapshot = await database().ref(`/${envConfig.chatlist}/${data.userId}/${user.userId}`).once('value');
    const roomDetails = snapshot.val();
    const roomId = roomDetails?.roomId || generateRoomId();

    await database()
      .ref(`/chatlist/${data.userId}/${user.userId}`)
      .update({...user, roomId, isDisabled: false})
      .then(() => console.log('Data updated for current user'));

    await database()
      .ref(`/chatlist/${user.userId}/${data.userId}`)
      .update({...data, roomId, isDisabled: false})
      .then(() => console.log('Data updated for other user'));
  };

  const serviceproviderData = {
    displayName: profiledetail.name,
    userId: profiledetail.userId,
    photoURL: profiledetail.profileImage,
    email: '',
  };

  const clickOnHandlePayment = async () => {
    setLoader(true);

    const selectedJobs = {
      jobTitle: jobDetails.jobTitle,
      jobDescription: jobDetails.jobDescription,
      salary: jobDetails.salary,
      timeAgo: Date.now(),
      candidateUserId: profiledetail.userId,
      jobId: jobDetails.jobId,
      customerId: user.userId,
      area: jobDetails.address,
      images: jobDetails.imageUrls[0],
      category: jobDetails.category,
      locationDesc: jobDetails.locationDesc,
    };

    const selectedProfileDetails = {
      jobtitle: jobDetails.jobTitle,
      candiateName: profiledetail.name,
      recruterId: user.userId,
      userBio: profiledetail.bio,
      ServiceproviderId: profiledetail.userId,
      jobId: jobDetails.jobId,
      title: jobDetails.jobTitle,
      category: jobDetails.category,
      subCategory: jobDetails.subCategory,
      price: jobDetails.salary,
      location: jobDetails.locationDesc.description,
      starttime: jobDetails.starttime,
      startdate: jobDetails.startdate,
      createdOn: jobDetails.createdOn,
      images: jobDetails.imageUrls[0],
      area: jobDetails.area,
      address: jobDetails.address,
      postedBy: jobDetails.postedBy,
      jobAdType: jobDetails.jobAds.type,
    };

    try {
      const paymentAmount = parseInt(amount + platformFee);
      const response = await handleCheckout(paymentAmount);

      if (response && response['_documentPath']) {
        await Promise.all([
          postCollectionDetails(envConfig.selectedProfiles, selectedProfileDetails),
          postCollectionDetails(envConfig.SelectedJobs, selectedJobs),
          addFieldToJobsDev(),
        ]);

        // OTP Generation only once
        const otpValue = Math.floor(1000 + Math.random() * 9000);
        const otpData = {
          otp: otpValue,
          otpValidationStatus: false,
        };
        await database().ref(`${envConfig.myjobs}/${user.userId}_${jobDetails.jobId}`).child('otpData').set(otpData);

        setModalVisible(true);
        iinchatScreenNavigation(serviceproviderData);
        dispatch(fetchSelectedJobs());
        dispatch(fetchSelectedProfileDetails());
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoader(false);
    }
  };

  const [providerStatus, setProviderStatus] = useState([]);

  useEffect(() => {
    const fetchPostedCustomerDetails = async id => {
      try {
        const q = query(collection(db, envConfig.Provider), where('provider_id', '==', id));
        const querySnapshot = await getDocs(q);
        const response = querySnapshot.docs.map(doc => doc.data());
        setProviderStatus(response);
      } catch (error) {
        console.error('Error fetching service provider details:', error);
      }
    };
    fetchPostedCustomerDetails(serviceproviderData.userId);
  });

  return (
    <View>
      <Modal isVisible={isVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.others}>
            <View style={{padding: heightToDp(1)}}>
              <MyjobsCardList
                JobsList={jobDetails}
                cardModal={true}
                istouchvisible={true}
                jobAdType={jobDetails.jobAds.type}
              />
            </View>
            <View style={styles.paymentDetailsContainer}>
              <View style={styles.stylesyourHiringContainer}>
                <YouAreHiringSvg />
                <CustomText text={'You are Hiring'} style={styles.youAreHiringText} />
              </View>
              <View style={styles.nameAndimageContainer}>
                <View style={styles.textContainer}>
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
                </View>
                <View style={styles.starsAndName}>
                  <CustomText text={providerStatus[0]?.legal_name_on_id} style={styles.name} />
                </View>
              </View>

              <View style={{padding: heightToDp(2), borderBottomColor: '#D9D9D9', borderBottomWidth: 1}}>
                <CustomText text={'Fare Breakdown'} style={styles.fareBreakdown} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: heightToDp(1),
                  }}>
                  <CustomText text={'Your Budget'} style={styles.yourBudgetHead} />
                  <CustomText text={`$${amount}`} style={styles.yourBudgetHead} />
                </View>
              </View>

              <View
                style={{
                  padding: heightToDp(2),
                  paddingHorizontal: heightToDp(2),
                  borderBottomColor: '#D9D9D9',
                  borderBottomWidth: 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <CustomText text={'Platform Fee'} style={styles.platFormFeeHead} />
                  <CustomText text={`+${platformFee}`} style={styles.platFormFeeHead} />
                </View>
              </View>
              <View style={{padding: heightToDp(2)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <CustomText text={'Total Pay'} style={styles.totalFeeHead} />
                  <CustomText text={`$${amount + platformFee}`} style={styles.totalFeeHead} />
                </View>
              </View>

              <View style={styles.payAndBackButtonContainer1}>
                <View style={styles.payAndBackButtonContainer}>
                  <CustomButton
                    title={loader ? <ActivityIndicator color={'white'} size={20} /> : 'Pay'}
                    style={styles.payButton}
                    textStyle={styles.payBtnText}
                    onPress={clickOnHandlePayment}
                  />
                  <CustomButton
                    title={'Cancel'}
                    textStyle={styles.payBtnText}
                    style={[styles.payButton, styles.back]}
                    onPress={onClose}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {isModalVisible && <BookingConfirmedModal toggleModal={toggleModal} />}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 9,
  },
  modalContent: {
    backgroundColor: 'white',
    height: heightToDp(72),
    padding: 15,
    borderRadius: heightToDp(2),

    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  heading: {
    fontFamily: 'Roboto',
    color: '#000000',
  },

  subHeading: {
    fontFamily: 'Roboto',
    color: '#000000',
  },
  profilePicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  paymentDetailsContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
  },
  yourBudgetHead: {fontSize: widthToDp(4), fontWeight: 'bold'},
  platFormFeeHead: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
  },
  totalFeeHead: {
    fontSize: heightToDp(2),
    fontWeight: 'bold',
    color: Color.colorBlack,
  },
  stylesyourHiringContainer: {
    position: 'relative',
    // paddingTop: heightToDp(3),
  },

  youAreHiringText: {
    position: 'absolute',
    color: 'white',
    // paddingTop: heightToDp(3),
    top: 1,
    left: 15,
    fontWeight: 'bold',
  },

  nameAndimageContainer: {
    // flexDirection: 'column',
    // alignItems: 'center',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingLeft: widthToDp(3),
    paddingVertical: widthToDp(4),
    // paddingTop: heightToDp(3),
    // paddingBottom: heightToDp(3),
    flexDirection: 'row',
    // justifyContent:"space-between",
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#5A2DAF',
    height: heightToDp(7),
    width: heightToDp(7),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  namelogo: {
    padding: 11,
    color: '#FFFFFF',
    fontSize: heightToDp(2.5),
    fontWeight: '700',
    fontFamily: 'Helvetica',
    letterSpacing: 0.8,
  },
  starsAndName: {
    marginLeft: heightToDp(2),
  },
  name: {
    fontSize: widthToDp(5),
    letterSpacing: 0.6,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: Color.colorBlack,
  },
  // payAndBackButtonContainer1: {
  //   borderTopWidth: 1,
  //   borderColor: '#B893FF',
  //   padding:heightToDp(5)
  // },
  payAndBackButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderTopWidth:1,
    // marginTop: 10,
    padding: heightToDp(1),
    // marginTop: heightToDp(4),
    // marginBottom: heightToDp(6),
  },
  payButton: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    borderRadius: 8,
    backgroundColor: '#00BF63',
    width: heightToDp(20),
    padding: heightToDp(1.5),
    borderRadius: heightToDp(7),
    fontSize: 16,
    letterSpacing: 0.4,
    borderRadius: heightToDp(1),
  },
  payBtnText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  back: {
    backgroundColor: '#FF5757',
  },
  others: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
  },
  fareBreakdown: {
    color: Color.colorBlack,
    fontWeight: 'bold',
    fontSize: widthToDp(4),
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    height: heightToDp(7),
    width: heightToDp(7),
    resizeMode: 'cover', // Or 'contain', 'stretch', etc.
    borderRadius: 50,
  },
});

export default ModalComponent;
