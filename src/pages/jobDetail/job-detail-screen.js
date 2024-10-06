import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import JobDetailStyles from './job-detail-styles';
import CustomImage from '../../atoms/image/imageComponent';
import CategorySVG, {AppliedSVg} from '../../assets/svgImage/jobDetail';
import {JobDetailsLockSvg} from '../../assets/svgImage/jobDetail';
import MapView, {Marker, Circle} from 'react-native-maps';
import {
  PostedBy,
  Where,
  JobDescription,
  Budget,
  JobCategory,
  Like,
  Share,
  Detail,
  RedHeartIcon,
} from '../../assets/svgImage/jobDetail';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import ClockSVG from '../../assets/svgImage/jobDetail/clock';
import CalenderSVG from '../../assets/svgImage/jobDetail/calender';
import TimeLeftSVG from '../../assets/svgImage/jobDetail/timeleft';
import {useNavigation} from '@react-navigation/native';
import ReportSVG from '../../assets/svgImage/jobDetail/report';
import Carousel from 'react-native-snap-carousel';
import Tooltip from 'react-native-walkthrough-tooltip';
import {JobDetailsUnLockSvg} from '../../assets/svgImage/jobDetail';
import Modal from 'react-native-modal';
import ExpiredSVG from '../../assets/svgImage/jobDetail/expired';
import HeaderComponent from '../../atoms/header/headerComponent';
import SVGComponent from '../../assets/svgIcons/mapsvg';
import FastImage from 'react-native-fast-image';
import VerificationInProgressModal from '../../organisms/verificationprogressmodal/verificationmodal';

const JobDetail = ({
  images,
  category,
  title,
  description,
  price,
  postedBy,
  location,
  backNavigation,
  addToFavourite,
  isAddToFav,
  isAlreadyFavourite,
  removeFav,
  onApply,
  isapplied,
  refresh,
  starttime,
  startdate,
  timeAgo,
  subCategory,
  isVerified,
  IdentityVerificationScreenNavigation,
  lat,
  lng,
  isExpired,
  isSelected,
  loading,
  jobID,
  areaDesc,
  addressDesc,
  address,
  userName,
  shareJobDetails,
  showPopup,
  onClosePopup,
  postedCustomer,
  userId,
  verificationModal,
  setVerificationModal,
  IsPaid,
  handleDeleteJob,
  navigateToPostJobScreen,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const circleCenter = {latitude: lat, longitude: lng};
  const radius = 3000; // 3 kilometers in meters

  // can be used for profile image with a name

  // let result
  // if (userName) {
  //   const names = userName.split(' ');
  //   if (names.length === 1) {
  //     // Only first name provided
  //     result = names[0].charAt(0);
  //   } else if (names.length >= 2) {
  //     // Both first and last names provided
  //     result = `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
  //   }
  // } else {
  //   result = 'No name provided';
  // }
  const postedCustomerUrl = postedCustomer[0]?.imageUrl
    ? postedCustomer[0].imageUrl
    : 'https://lh3.googleusercontent.com/a-/AOh14GjkcNgdIcCDlLTtU7zYP0OCKHr9welDwEDj9zC9=s96-c';
  const postedCustomerName = postedCustomer[0]?.displayName ? postedCustomer[0]?.displayName : userName;
  const city = postedCustomer[0]?.city;
  const province = postedCustomer[0]?.provinces;
  // console.log("latt",lat,'long',lng)

  const onPressViewProfile = () => {
    navigation.navigate('viewProfile', {postedBy});
  };

  const styles = JobDetailStyles();

  const onPressCancelExpiredPopup = () => {
    navigation.goBack();
  };
  let lengthOfCategory = 0;
  if (category && subCategory) {
    lengthOfCategory = category.length + subCategory[0].length;
  }
  const threshold = 20;

  const onCloseVerificationModal = () => {
    setVerificationModal(false);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddImage, setShowAddImage] = useState(false);
  const [addImage, setAddImage] = useState(null);
  const carouselRef = useRef(null);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current && images.length > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        carouselRef.current.snapToNext();
      }
    }, 3000); // 3 seconds for each scroll

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [images]);

  const onPressShowAddImage = addImage => {
    setAddImage(addImage);
    setShowAddImage(true);
  };

  return (
    <>
      <Modal isVisible={showPopup} style={styles.modalContainer} onBackdropPress={onClosePopup} onBackButtonPress={onClosePopup}>
        <View style={styles.modalContent}>
          <FastImage
            style={{width: 100, height: 100}}
            source={require('../../assets/Success.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.popupHeadingCon}>
            <CustomText text={'You have successfully applied.'} style={styles.popupHeadText} />
            <CustomText text={'Check the status of your application in My Jobs'} style={{textAlign: 'center'}} />
          </View>
        </View>
      </Modal>
      <VerificationInProgressModal visible={verificationModal} onClose={() => onCloseVerificationModal()} />
      <HeaderComponent text={'Job Posts'} />
      <SafeAreaView style={{backgroundColor: '#ffffff', ...styles.containerWithShadow, flex: 1}}>
        <Modal isVisible={isExpired}>
          {/* {isExpired ? ( */}
          <View style={styles.expiryContainer}>
            <View style={styles.expiryContent}>
              <ExpiredSVG />
              <CustomText text="The job has been Expired" style={styles.expiredText} />
              <TouchableOpacity style={styles.expiredCancelBtn} onPress={onPressCancelExpiredPopup}>
                <CustomText text={'CANCEL'} style={styles.cancelText} />
              </TouchableOpacity>
            </View>
          </View>
          {/* ) : null} */}
        </Modal>

        <Modal
          isVisible={showAddImage}
          onBackdropPress={() => setShowAddImage(false)}
          onBackButtonPress={() => setShowAddImage(false)}>
          <View style={styles.addImageContainer}>
            <FlatList
              horizontal
              pagingEnabled
              data={images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <FastImage
                  style={{width: screenWidth - 45, height: '100%'}}
                  source={{uri: item}}
                  resizeMode="contain"
                />
              )}
            />
          </View>
        </Modal>

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
          <View>
            <View style={{marginTop: heightToDp(0.5), padding: heightToDp(1)}}>
              {images && images.length > 0 ? (
                <Carousel
                ref={carouselRef}
                  data={images}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => onPressShowAddImage(item)}>
                      <Image
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          width: '90%',
                          height: 200,
                          borderRadius: 10,
                          marginBottom: 10,
                          marginTop: 10,
                        }}
                        source={{uri: item}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  )}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth - 10} // Adjust the itemWidth based on your padding
                />
              ) : (
                <Detail style={{backgroundColor: 'red'}} />
              )}
            </View>
          </View>
          <View>
            <View>
              <View style={styles.containerpadding}>
                <View>
                  <CustomText text={title} style={styles.jobTitle} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  {lengthOfCategory > threshold ? (
                    <View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CategorySVG />
                        <CustomText text={category} style={{marginLeft: 4, fontWeight: '400', fontSize: 10}} />
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CustomText
                          text={subCategory}
                          style={{marginLeft: widthToDp(6), fontWeight: '400', fontSize: 10}}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CategorySVG />
                      <CustomText text={category} style={{marginLeft: 4, fontWeight: '400', fontSize: 10}} />
                      <CustomText text={'-'} />
                      <CustomText text={subCategory} style={{marginLeft: 5, fontWeight: '400', fontSize: 10}} />
                    </View>
                  )}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TimeLeftSVG />
                    <CustomText text={'Posted on'} style={{marginLeft: 4, fontWeight: '400', fontSize: 10}} />
                    <CustomText text={timeAgo} style={{marginLeft: 4, fontWeight: '400', fontSize: 10}} />
                  </View>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpadding}>
                <View style={styles.dynamicDescription}>
                  <View style={styles.conatiner}>
                    <JobDescription />
                    <CustomText text={'Work Description'} style={styles.textSTyle} />
                  </View>
                  <View style={styles.desc}>
                    <CustomText text={description} style={styles.dynamicTextStyle} />
                  </View>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpadding}>
                <View>
                  <View style={styles.conatiner}>
                    <Budget />
                    <CustomText text={'Budget'} style={styles.textSTyle} />
                  </View>
                  <View style={styles.desc}>
                    <CustomText text={`$ ${price}`} style={styles.dynamicTextStyle} />
                  </View>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpadding}>
                <View>
                  <View style={[styles.conatiner, {marginTop: heightToDp(1)}]}>
                    <Where />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '90%',
                        justifyContent: 'space-between',
                      }}>
                      <CustomText text={'Address'} style={styles.textSTyle} />
                      {/* <JobDetailsLockSvg /> */}
                      {isSelected[0] ? (
                        <Image source={require('../../assets/unlocked.png')} style={styles.unlocked} />
                      ) : (
                        <Tooltip
                          isVisible={tooltipVisible}
                          content={
                            <View>
                              <Text>{'Unlock Complete Address'}</Text>
                              <Text>{'After Booking Confirmatio'}</Text>
                            </View>
                          }
                          onClose={() => setTooltipVisible(false)}>
                          <TouchableOpacity onPress={() => setTooltipVisible(true)}>
                            <JobDetailsLockSvg />
                          </TouchableOpacity>
                        </Tooltip>
                      )}
                    </View>
                  </View>
                  <View style={styles.desc}>
                    {loading ? (
                      <ActivityIndicator color={'black'} size="large" />
                    ) : isSelected[0] ? (
                      <CustomText text={address} style={[styles.dynamicTextStyle, styles.location]} />
                    ) : (
                      <View>
                        {/* <CustomText text={'*'.repeat(location.length)} /> */}
                        {/* <CustomText text={'*'.repeat(location)} /> */}

                        <CustomText
                          // text={'Address visible only after getting selected for a job.'}
                          text={`${areaDesc}, ${location.split(',')[0]}`}
                          style={styles.locationAndAreaTextStyles}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.shadowLine} />
                <View style={styles.containerpadding}>
                  <View style={[styles.conatiner, {marginTop: heightToDp(1)}]}>
                    <CalenderSVG />
                    <CustomText text={'Date'} style={styles.textSTyle} />
                  </View>
                  <View style={styles.desc}>
                    <CustomText text={startdate} style={[styles.dynamicTextStyle, styles.location]} />
                  </View>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpadding}>
                <View>
                  <View style={[styles.conatiner, {marginTop: heightToDp(1)}]}>
                    <ClockSVG />
                    <CustomText text={'Time'} style={styles.textSTyle} />
                  </View>
                  <View style={styles.desc}>
                    <CustomText text={starttime} style={[styles.dynamicTextStyle, styles.location]} />
                  </View>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpadding}>
                <View style={{marginTop: heightToDp(1), flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 40,
                    }}
                    source={{uri: postedCustomerUrl}}
                    resizeMode="cover"
                  /> */}
                  {!postedCustomer[0]?.imageUrl ? (
                    <CustomImage
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                      }}
                      resizeMode="cover"
                      source={require('../../assets/default-profile.png')}
                    />
                  ) : (
                    <CustomImage
                      source={{uri: postedCustomer[0]?.imageUrl}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                      }}
                      resizeMode="cover"
                    />
                  )}

                  <View style={{marginLeft: widthToDp(5), flexDirection: 'column'}}>
                    <CustomText text={'Posted by'} style={{color: 'black', fontSize: 12}} />
                    <CustomText text={postedCustomerName} style={{fontWeight: 'bold', color: 'black', fontSize: 17}} />
                  </View>
                  <TouchableOpacity
                    style={{marginLeft: 'auto'}}
                    // onPress={() => navigation.navigate('ViewProfile')}
                    onPress={() => onPressViewProfile()}>
                    <CustomText
                      text={'View Profile'}
                      style={{color: '#5A2DAF', marginTop: 15, fontSize: 12, marginRight: 2}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpaddingforlogo}>
                <View
                  style={{
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                  }}>
                  {!isAlreadyFavourite && (
                    <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} onPress={addToFavourite}>
                      <Like />
                      <CustomText text={'Favourite'} style={{marginLeft: 7, color: 'black'}} />
                    </TouchableOpacity>
                  )}
                  {isAlreadyFavourite && (
                    <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} onPress={removeFav}>
                      <RedHeartIcon />
                      <CustomText text={'Favourite'} style={{marginLeft: 8, color: 'black'}} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{flexDirection: 'row', marginTop: 10}}
                    onPress={() =>
                      navigation.navigate('Report', {
                        jobID: jobID,
                        postedBy: postedBy,
                        jobTitle: title,
                        jobDescription: description,
                        category: category,
                        subCategory: subCategory[0],
                      })
                    }
                    disabled={userId === postedBy}>
                    <ReportSVG />
                    <CustomText text={'Report'} style={{marginLeft: 8, color: 'black'}} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} onPress={shareJobDetails}>
                    <Share />
                    <CustomText text={'Share'} style={{marginLeft: 8, color: 'black'}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shadowLine} />
              <View style={styles.containerpadding}>
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <SVGComponent />
                  <CustomText text={'Map'} style={styles.textSTyle} />
                </View>
              </View>

              {/* <View
                style={{padding: 24, flexDirection: 'row', justifyContent: 'space-between', marginTop: heightToDp(2)}}>
                {!isAlreadyFavourite && (
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={addToFavourite}>
                    <Like />
                    <CustomText text={'Favourite'} style={{marginLeft: 7}} />
                  </TouchableOpacity>
                )}
                {isAlreadyFavourite && (
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={removeFav}>
                    <RedHeartIcon />
                    <CustomText text={'Favourite'} style={{marginLeft: 8}} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('Report')}>
                  <ReportSVG />
                  <CustomText text={'Report'} style={{marginLeft: 8}} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                  <Share />
                  <CustomText text={'Share'} style={{marginLeft: 8}} />
                </TouchableOpacity>
              </View> */}

              <View style={{marginBottom: heightToDp(1)}}>
                <MapView
                  region={region}
                  showsUserLocation
                  showsMyLocationButton
                  onRegionChangeComplete={setRegion}
                  style={{width: '100%', height: 250}}>
                  <Circle
                    center={circleCenter}
                    radius={radius}
                    // strokeWidth={0}
                    strokeColor="rgba(255,0,0,0.5)"
                    fillColor="rgba(255,0,0,0.2)"
                  />
                </MapView>
              </View>
            </View>
          </View>
        </ScrollView>
        {isExpired ? null : userId === postedBy ? (
          IsPaid === true ? null : (
            <View style={styles.deleteEditBtnContainer}>
              <CustomButton
                title="DELETE"
                style={styles.backBtnStyles}
                textStyle={{fontSize: heightToDp(2.5)}}
                onPress={() => handleDeleteJob(jobID)}
              />
              <CustomButton
                title="EDIT"
                style={styles.editBtn}
                textStyle={{fontSize: heightToDp(2.5)}}
                onPress={() => navigateToPostJobScreen(jobID)}
              />
            </View>
          )
        ) : (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              gap: 4,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: heightToDp(0.4),
            }}>
            <CustomButton
              title={refresh ? <ActivityIndicator size={20} color={'white'} /> : isapplied ? 'APPLIED' : 'APPLY'}
              style={styles.applyBtnStyles}
              textStyle={{fontSize: heightToDp(2.5)}}
              onPress={isVerified === 'verified' ? (isapplied ? null : onApply) : onApply}
              disabled={isapplied || refresh}
            />
            <CustomButton
              title="CANCEL"
              style={styles.backBtnStyles}
              textStyle={{fontSize: heightToDp(2.5)}}
              onPress={backNavigation}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default JobDetail;
