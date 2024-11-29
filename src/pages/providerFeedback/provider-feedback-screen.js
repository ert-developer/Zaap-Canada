import React from 'react';
import {SafeAreaView, View, FlatList, ScrollView, Image, Text, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import ModalComponent from '../../organisms/Modal/modal-component';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db, database} from '../../../firebaseDb';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import profileScreenStyle from './provider-feedback-styles';
import VerifiedSVGComponent from '../../assets/svgIcons/verifiedsvg/verified-svg';
import {MembershipSVGComponent} from '../../assets/svgIcons/membershipsvg/membershipsvg';
import ProfileLocationSVGComponent from '../../assets/svgIcons/profilelocationsymbol/profile-location-symbol';
import Icon from 'react-native-vector-icons/AntDesign';
import ArrowIcon from 'react-native-vector-icons/FontAwesome';
import {LanguagesSVG} from '../../assets/svgIcons/membershipsvg/membershipsvg';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {Rating} from 'react-native-ratings';
import CustomLoader from '../../molecules/customLoader/customLoader';
import ReadMoreText from '../../organisms/readmore/read-more';
import {fetchSelectedJobs} from '../../redux/selectedjobs/action';
import {fetchSelectedProfileDetails} from '../../redux/selectedprofiledetails/action';
import {postCollectionDetails, getUserDetails} from '../../common/collection';
import {generateRoomId} from '../../../src/utils/index';
import {Color} from '../../assets/static/globalStyles';
import {EmptyPortfolioSVG} from '../../assets/svgImage/portfolio/portfolio';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {envConfig} from '../../assets/helpers/envApi';
import {PUSH_NOTIFICATION_SERVER_URL} from '@env';

const ProviderFeedbackScreen = ({
  firstLetter,
  feedbackData,
  goBack,
  isproviderverified,
  formattedDate,
  isverifiedbio,
  userWorkingWithYou,
  loading,
  providerStatus,
  starRatingCount,
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const styles = profileScreenStyle();

  const languages = providerStatus[0]?.languages_known || [];

  // Determine how to format the languages for display
  let firstLineLanguages = languages.join(', ');
  const location =
    providerStatus[0]?.city == undefined || providerStatus[0]?.state == undefined
      ? 'No Info provided'
      : `${providerStatus[0]?.city}, ${providerStatus[0]?.state}, IN`;
  const bio = providerStatus[0]?.bio;
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();

  const handleReviewOpen = () => {
    // setIsReviewOpen(!isReviewOpen);
    navigation.navigate('ServiceProviderReviews', {feedbackData, firstLetter});
  };
  //asdf Customer Hiring or re-hiring

  const [selectedjob, setSelectedJobs] = useState('');

  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails);
  // console.log('This is User Job Details : ', jobDetails);

  const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails);
  ///////////Navigate to Service Provider Portpofolio///////
  const handlePortfolioOpen = () => {
    navigation.navigate('ProfilePortfolio', {profileUserID: profiledetail?.userId});
  };
  const sendNotificationToServiceProvider = async () => {
    const appliedUser = await getUserDetails(envConfig.User, profiledetail.userId);
    const token = appliedUser.fcmToken;
    try {
      const response = await fetch(`${PUSH_NOTIFICATION_SERVER_URL}/sendNotification`, {
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
    } catch (error) {
      console.error('Error sending notification:', error);
    }
    const data = {
      title: 'Booking Confirmed',
      message: `You have been selected for the job ${jobDetails.jobTitle}`,
      userId: profiledetail.userId,
      markasread: false,
      time: Date.now(),
      screen: 'MyJobScreen',
    };
    await postCollectionDetails(envConfig.Notifications, data);
  };
  const iinchatScreenNavigation = async data => {
    // Generate a unique room ID
    // const roomId = generateRoomId();

    const snapshot = await database().ref(`/${envConfig.chatlist}/${data.userId}/${user.userId}`).once('value');
    const roomDetails = snapshot.val();
    const roomId = roomDetails?.roomId || generateRoomId();

    await database()
      .ref(`/${envConfig.chatlist}/${data.userId}/${user.userId}`)
      .update({...user, roomId, isDisabled: false})
      .then(() => console.log('Data updated for current user'));

    await database()
      .ref(`/${envConfig.chatlist}/${user.userId}/${data.userId}`)
      .update({...data, roomId, isDisabled: false})
      .then(() => console.log('Data updated for other user'));
  };

  const handleSelectedText = async () => {
    setLoader(true);
    // console.log('user.userIduser.userId', profiledetail.userId, jobDetails.jobId);
    const selectedJobsCollection = collection(db, envConfig.SelectedJobs);
    // console.log('try0');

    const q = query(
      selectedJobsCollection,
      where('candidateUserId', '==', profiledetail?.userId),
      where('jobId', '==', jobDetails?.jobId),
    );
    try {
      const querySnapshot = await getDocs(q);
      // Extract data from the query results
      const selectedJobs = [];
      querySnapshot.forEach(doc => {
        selectedJobs.push({id: doc.id, ...doc.data()});
      });
      setSelectedJobs(selectedJobs);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching selected jobs:', error);
    }
  };

  const getPaymentStatus = async () => {
    try {
      // Correctly reference the document
      const docRef = doc(db, envConfig.Jobs, jobDetails.jobId);

      const docSnap = await getDoc(docRef);

      const data = docSnap.data();
      setIsPaid(data.IsPaid);
    } catch (error) {
      console.error('Error fetching Payment Status data:', error);
      // Handle error if needed
    }
  };

  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    getPaymentStatus();
    handleSelectedText();
  }, [profiledetail?.userId, jobDetails?.jobId]);

  const serviceproviderData = {
    displayName: profiledetail.name,
    userId: profiledetail.userId,
    photoURL: profiledetail.profileImage,
    email: '',
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [userWorking, setUSerWorking] = useState(false);

  const onUserWorking = () => {
    Alert.alert('Service Provider is currently working in another job', 'Please try again later', [{text: 'OK'}]);
  };

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
      // it is not defined in this file SO need to confirm why it is added here
      sendNotificationToServiceProvider();
    } catch (error) {
      console.error('Error adding field to document:', error);
    }
  };

  const [hireLoader, setHireloader] = useState(false);
  const handleHiring = async () => {
    if (!isPaid) {
      setModalVisible(true);
    } else {
      setHireloader(true);
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
        let response = await postCollectionDetails(envConfig.selectedProfiles, selectedProfileDetails);
        // setModalVisible(true);
        iinchatScreenNavigation(serviceproviderData);
        setLoader(false);
        let res = await postCollectionDetails(envConfig.SelectedJobs, selectedJobs);
        dispatch(fetchSelectedJobs());
        dispatch(fetchSelectedProfileDetails());
        await addFieldToJobsDev();
        navigation.navigate('ProviderPaymentScreen');
      } catch (error) {
        console.log('errror', error);
      } finally {
        setHireloader(false);
      }
    }
  };

  const renderFeedbackItem = ({item, index}) => {
    const feedbackdate = item.feedBackDate;
    const formattedDate = moment(feedbackdate).format('DD/MM/YYYY');

    return (
      <View style={styles.feedBackConatiner}>
        <View style={styles.feedbackNameContainer}>
          <View style={styles.feedbackNameLogo}>
            <CustomText text={firstLetter[index]} style={styles.feedbackName} />
          </View>
          <CustomText text={item.customerName} style={styles.logoName} />
        </View>
        <View style={styles.dateAndSTarsContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Rating type="star" ratingCount={5} startingValue={item.startRating} imageSize={15} />
          </View>
          <CustomText text={formattedDate} />
        </View>
        <CustomText text={item.feedback} style={styles.feedBackDescription} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <Image
          source={require('../../assets/staticImages/profile-cover-photo-new.jpg')}
          style={styles.profileCoverPhoto}
        />

        {loader ? (
          <CustomLoader visible={loader} />
        ) : (
          <View
            style={{
              borderColor: Color.colorSilver,
              borderWidth: 1,
              margin: 10,
              borderRadius: 20,
              height: heightToDp(77),
            }}>
            <View style={styles.profileDetailsContainer}>
              {!providerStatus[0]?.personal_photo ? (
                <Image src={providerStatus[0]?.imageURL} style={styles.profilePhoto} />
              ) : (
                <Image src={providerStatus[0]?.personal_photo[0]} style={styles.profilePhoto} />
              )}
              <CustomText text={providerStatus[0]?.legal_name_on_id} style={styles.profileName} />
              <View style={styles.verificationAndReviews}>
                <View style={styles.locationIconStyle}>
                  <VerifiedSVGComponent />
                </View>
                <Text style={styles.verifiedTextStyle}>Verified | </Text>
                <Icon name="star" color="#fcba03" size={18} />
                <Text style={styles.reviewsTextStyle}>
                  {feedbackData.length > 0
                    ? `${(starRatingCount / feedbackData.length).toFixed(1)} (${feedbackData.length} Reviews)`
                    : `0.0 (0 Reviews)`}
                </Text>
              </View>
              <View style={styles.locationsStyle}>
                <View style={styles.locationIconStyle}>
                  <ProfileLocationSVGComponent />
                </View>
                <Text style={styles.locationTestStyle}>{location}</Text>
              </View>
              <View style={styles.memberShipContainer}>
                <View style={styles.locationIconStyle}>
                  <MembershipSVGComponent />
                </View>
                <Text style={styles.memberShipText}>Member Since: {formattedDate}</Text>
              </View>
              <View style={styles.memberShipContainer}>
                <View style={styles.locationIconStyle}>
                  <LanguagesSVG />
                </View>
                <Text style={styles.memberShipText}>Languages Known:</Text>
              </View>
              <Text style={{...styles.memberShipText, fontWeight: '400', paddingLeft: 30}}>{firstLineLanguages}</Text>

              {bio ? <ReadMoreText text={bio} style={styles.profileBio} /> : <CustomLoader visible={bio} />}
            </View>

            <View
              style={{
                borderColor: Color.colorSilver,
                borderRadius: 10,
                borderWidth: 1,
                marginHorizontal: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
              }}>
              <TouchableOpacity style={styles.reviewsHeadingContainer} onPress={() => handleReviewOpen()}>
                <CustomText text="Reviews" style={styles.reviewsHeadingTextStyle} />
                <ArrowIcon name="angle-double-down" size={20} color="black" style={styles.downArrowStyles} />
              </TouchableOpacity>
              {/* <Collapsible collapsed={isReviewOpen} style={styles.reviewsContainer}>
                <ScrollView>
                  {feedbackData.length > 0 ? (
                    <FlatList
                      data={feedbackData}
                      renderItem={renderFeedbackItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  ) : (
                    <Text> No Reviews Yet</Text>
                  )}
                </ScrollView>
              </Collapsible> */}
              <Modal isVisible={isReviewOpen} onBackdropPress={() => setIsReviewOpen(!isReviewOpen)}>
                <ScrollView contentContainerStyle={styles.modalcontainer}>
                  <View style={styles.modalContentContainer}>
                    {feedbackData.length > 0 ? (
                      <View>
                        <FlatList
                          data={feedbackData}
                          renderItem={renderFeedbackItem}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                    ) : (
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <EmptyPortfolioSVG style={styles.emptyProfilePortfolioSvg} />
                        <CustomText
                          text="No Reviews yet"
                          style={{color: Color.colorIndigo2, fontSize: widthToDp(5), fontWeight: 'bold'}}
                        />
                      </View>
                    )}
                  </View>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setIsReviewOpen(!isReviewOpen)}>
                    <Text style={{color: 'red', fontSize: 20}}> X </Text>
                  </TouchableOpacity>
                </ScrollView>
              </Modal>
            </View>

            <View
              style={{
                borderColor: Color.colorSilver,
                borderRadius: 10,
                borderWidth: 1,
                marginHorizontal: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
              }}>
              <TouchableOpacity style={styles.reviewsHeadingContainer} onPress={() => handlePortfolioOpen()}>
                <CustomText text="Portfolio" style={styles.portfolioHeadingTextStyle} />
                <ArrowIcon name="angle-double-down" size={20} color="black" style={styles.downArrowStyles} />
              </TouchableOpacity>
              {/* <Collapsible collapsed={isPortFolioOpen}>
              <Text style={{textAlign: 'center'}}>This is Open Portfolio Box</Text>
            </Collapsible> */}
            </View>
          </View>
        )}

        {/* userWorking={userWorking} */}
        <ModalComponent isVisible={isModalVisible} onClose={() => setModalVisible(false)} userWorking={userWorking} />
      </ScrollView>
      {/* <View style={{position: 'absolute', bottom: 2}}>
        <View style={styles.bottomButtonContainer}>
          <CustomButton
            title={loader ? <ActivityIndicat or color={'white'} /> : selectedjob[0] ? 'Check Status' : 'Hire'}
            style={styles.hireButton}
            onPress={loader ? null : selectedjob[0] ? () => navigation.navigate('ProviderPaymentScreen') : toggleModal}
          />
          <CustomButton title={'Back'} style={styles.backButton} onPress={goBack} />
        </View>
      </View> */}
      <View style={{position: 'absolute', bottom: 2, padding: 5}}>
        <View style={styles.bottomButtonContainer}>
          {loading ? (
            <View style={{width: 200}}>
              <ActivityIndicator color={'black'} size="large" />
            </View>
          ) : // ) : userWorkingWithYou === 'workingwithme' ? (
          //   <CustomButton
          //     title={selectedjob[0] ? 'HIRED' : 'HIRE'}
          //     style={[selectedjob[0] ? styles.hiredButton : styles.hireButton]}
          //     textStyle={styles.hireButtonText}
          //     onPress={selectedjob[0] ? null : toggleModal}
          //   />
          userWorkingWithYou === 'workinginanotherjob' ? (
            <CustomButton
              title={'HIRE'}
              style={styles.hireButton}
              textStyle={styles.hireButtonText}
              onPress={onUserWorking}
            />
          ) : (
            <CustomButton
              title={selectedjob[0] ? 'HIRED' : 'HIRE'}
              style={styles.hireButton}
              textStyle={styles.hireButtonText}
              onPress={handleHiring}
            />
          )}
          <CustomButton
            title={selectedjob[0] ? 'GO BACK' : 'CANCEL'}
            style={[selectedjob[0] ? styles.goBackButton : styles.backButton]}
            textStyle={styles.hireButtonText}
            onPress={goBack}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProviderFeedbackScreen;
