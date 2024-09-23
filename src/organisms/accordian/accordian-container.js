import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList} from 'react-native';
import Collapsible from 'react-native-collapsible';
import SvgComponentClose from '../../assets/svgIcons/close/close-container';
import Opensvg from '../../assets/svgIcons/open/open-container';
import CustomText from '../../atoms/text/textComponent';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import AppliedDetails from '../appliedprofile/applied-container';
import {EyeIcon, WhiteCloseSVG, WhiteEyeIconSVG, WhiteOpenSVG} from '../../assets/svgIcons/eyeicon';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../assets/static/globalStyles';
import {useDispatch} from 'react-redux';
import {storeApplicantsProfileDetails} from '../../redux/applicantprofiledetails/action';

const AccordionItem = ({
  onGetJobDetails,
  checkStatusOnGetJobDetails,
  jobApplications,
  viewCount,
  IsBookingConfirmed,
  selectedCandidateDetails,
  IsBookingCancel,
  setIsBookingCancelText,
  isBookingCancelText,
  cancelCandidateDetails,
  providerStatus,
}) => {
  const jobApplicantsCount = jobApplications?.length || 0;
  const [collapsed, setCollapsed] = useState(true);
  const [activeBtn, setActiveBtn] = useState(
    useState({
      button1: false,
      button2: false,
      button3: false,
    }),
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const testingDetails = () => {
    dispatch(storeApplicantsProfileDetails(selectedCandidateDetails));
    onGetJobDetails();
  };

  const checkStatus = () => {
    navigation.navigate('ProviderPaymentScreen');
    dispatch(storeApplicantsProfileDetails(selectedCandidateDetails));
  };

  const renderItem = ({item}) => (
    <View>
      <AppliedDetails
        onGetJobDetails={onGetJobDetails}
        name={item.displayName}
        bio={item.userBio}
        AppliedOn={item.AppliedOn}
        userId={item.userId}
        profileImage={item.imageUrl}
        rating={item.rating}
        IsBookingConfirmed={IsBookingConfirmed}
        IsBookingCancel={IsBookingCancel}
        cancelCandidateDetails={cancelCandidateDetails}
        providerStatus={providerStatus}
      />
    </View>
  );

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleActive = buttonId => {
    setActiveBtn(() => ({
      button1: buttonId === 'button1',
      button2: buttonId === 'button2',
      button3: buttonId === 'button3',
    }));
  };

  const onPressOnViewProfile = () => {
    toggleActive('button1');
    testingDetails();
  };

  const onPressCheckStatus = () => {
    toggleActive('button2');
    checkStatus();
    checkStatusOnGetJobDetails();
  };

  const onPressIsBookingCancelViewProfileBtn = () => {
    toggleActive('button1');
    setIsBookingCancelText(!isBookingCancelText);
  };

  const onPressIsBookingCancelCheckStatusBtn = () => {
    toggleActive('button2');
    setIsBookingCancelText(!isBookingCancelText);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.openContainer,
          {
            backgroundColor:
              !IsBookingConfirmed && IsBookingCancel && collapsed === true
                ? '#7A7D7C'
                : IsBookingConfirmed && collapsed === true
                ? Color.colorGreen
                : null,
            // IsBookingConfirmed && collapsed === true
            //   ? Color.colorGreen
            //   : IsBookingCancel && collapsed === true
            //   ? '#7A7D7C'
            //   : null,
          },
          // {backgroundColor: IsBookingCancel && collapsed === true ? '#7A7D7C' : null},
        ]}>
        {collapsed ? (
          <View style={styles.IiconContainer}>
            {IsBookingConfirmed ? <WhiteEyeIconSVG /> : <EyeIcon />}
            {/* <EyeIcon /> */}

            <CustomText
              text={viewCount}
              style={[styles.view, IsBookingConfirmed ? styles.activeView : styles.disActiveView]}
            />
          </View>
        ) : null}
        <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
          {/* <Text style={styles.applied}>2 PEOPLE APPLIED </Text> */}
          {collapsed ? (
            IsBookingConfirmed ? (
              <>
                <Text
                  style={[
                    styles.applied,
                    {color: IsBookingConfirmed && collapsed === true && 'white', fontWeight: 'bold'},
                  ]}>
                  BOOKING CONFIRMED
                </Text>
                <View>{IsBookingConfirmed ? <WhiteOpenSVG /> : null}</View>
              </>
            ) : (
              <>
                <Text style={styles.applied}>{jobApplicantsCount} PEOPLE APPLIED</Text>
                <View>{IsBookingConfirmed ? null : <Opensvg />}</View>
              </>
            )
          ) : null}
        </TouchableOpacity>
        {/* <View>{collapsed ? <Opensvg /> : null}</View> */}
      </View>
      <Collapsible collapsed={collapsed}>
        {IsBookingConfirmed === false || IsBookingConfirmed === true ? (
          <View style={styles.profileStatusBtnContainer}>
            <TouchableOpacity
              // style={[styles.btns, styles.profileBtn, activeBtn.button1 ? styles.activeBtnStyle : null]}
              style={[
                styles.btns,
                styles.profileBtn,
                activeBtn.button1 ? styles.activeBtnStyle : null,
                IsBookingCancel ? styles.isBookingCancelDisableBtn : null,
              ]}
              onPress={IsBookingCancel ? () => onPressIsBookingCancelViewProfileBtn() : () => onPressOnViewProfile()}>
              <Image
                source={{uri: 'https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp'}}
                style={styles.viewProfilePicture}
              />
              <CustomText
                text={'VIEW PROFILE'}
                style={[
                  styles.btnsText,
                  activeBtn.button1 ? styles.activeBtnTextStyle : styles.deactiveBtnTextStyle,
                  IsBookingCancel ? styles.isBookingCancelDisableBtnText : null,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // style={[styles.btns, activeBtn.button2 ? styles.activeBtnStyle : null]}
              style={[
                styles.btns,
                activeBtn.button2 ? styles.activeBtnStyle : null,
                IsBookingCancel ? styles.isBookingCancelDisableBtn : null,
              ]}
              onPress={IsBookingCancel ? () => onPressIsBookingCancelCheckStatusBtn() : () => onPressCheckStatus()}>
              <CustomText
                text={'CHECK STATUS'}
                style={[
                  styles.btnsText,
                  activeBtn.button2 ? styles.activeBtnTextStyle : styles.deactiveBtnTextStyle,
                  IsBookingCancel ? styles.isBookingCancelDisableBtnText : null,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // style={[styles.btns, activeBtn.button3 ? styles.activeBtnStyle : null]}
              style={[
                styles.btns,
                activeBtn.button3 ? styles.activeBtnStyle : null,
                IsBookingCancel ? styles.viewApplicantesDisableBtn : null,
              ]}
              onPress={() => toggleActive('button3')}>
              <CustomText
                text={'VIEW APPLICANTS'}
                style={[
                  styles.btnsText,
                  {marginLeft: -7},
                  activeBtn.button3 ? styles.activeBtnTextStyle : styles.deactiveBtnTextStyle,
                  IsBookingCancel ? styles.isBookingCancelDisableBtnText : null,
                ]}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <CustomText text={'APPLICANTS'} style={styles.applicanteStyles} />
        )}
        {IsBookingConfirmed ? (
          activeBtn.button3 && (
            <ScrollView style={styles.scrollContainer}>
              <FlatList data={jobApplications} renderItem={renderItem} keyExtractor={item => item.userId} />
            </ScrollView>
          )
        ) : (
          <ScrollView style={styles.scrollContainer}>
            <FlatList data={jobApplications} renderItem={renderItem} keyExtractor={item => item.userId} />
          </ScrollView>
        )}
        {/* {activeBtn.button3 && ( */}

        {/* )} */}

        <TouchableOpacity
          onPress={toggleCollapse}
          style={[
            styles.closeButton,
            IsBookingConfirmed ? styles.bookingBtnBg : styles.closeBtnBg,
            IsBookingCancel ? {backgroundColor: '#7A7D7C'} : null,
          ]}>
          <View style={styles.IiconContainer}>
            {IsBookingConfirmed ? <WhiteEyeIconSVG /> : <EyeIcon />}
            <CustomText
              text={viewCount}
              style={[styles.view, IsBookingConfirmed ? styles.bookingText : styles.closeBtnText]}
            />
          </View>
          <View style={styles.closeContainer}>
            <CustomText
              text={`${IsBookingConfirmed ? 'BOOKING CONFIRMED' : 'CLOSE'}`}
              style={[styles.applied, IsBookingConfirmed ? styles.bookingText : styles.closeBtnText]}
            />
            {IsBookingConfirmed ? <WhiteCloseSVG /> : <SvgComponentClose />}
          </View>
          <View>
            {/* <SvgComponentClose /> */}
            {/* {IsBookingConfirmed ? <WhiteCloseSVG /> : <SvgComponentClose />} */}
            {/* <WhiteCloseSVG /> */}
          </View>
        </TouchableOpacity>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openContainer: {
    flexDirection: 'row',
    gap: 40,
    // justifyContent: 'space-around',
    alignItems: 'center',
    padding: heightToDp(1.4),

    // borderBottomLeftRadius: widthToDp(3),
    // borderBottomRightRadius: widthToDp(3),
  },
  disActiveView: {color: Color.colorIndigo2},
  activeView: {color: Color.colorWhite},
  view: {
    fontSize: heightToDp(1.2),
    fontWeight: 'bold',
  },
  IiconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingLeft: widthToDp(3),
  },

  container: {
    // borderWidth: 1,
    borderColor: Color.colorSilver,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // overflow: 'hidden',
    // marginVertical: 3,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    // elevation: 1.6,
    backgroundColor: '#d9d9d9',
    // backgroundColor: Color.colorIndigo,
    marginTop: widthToDp(2),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    // gap: 10,
    borderBottomLeftRadius: widthToDp(3),
  },
  profileStatusBtnContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    borderBlockColor: Color.colorIndigo2,
    borderWidth: 1,
    height: widthToDp(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDp(3.8),
    paddingVertical: widthToDp(2),
  },
  activeBtnStyle: {
    backgroundColor: Color.colorIndigo2,
  },
  isBookingCancelDisableBtn: {
    backgroundColor: '#7A7D7C',
  },
  isBookingCancelDisableBtnText: {
    color: Color.colorWhite,
  },
  viewApplicantesDisableBtn: {
    backgroundColor: '#FF5757',
  },
  viewProfilePicture: {
    width: widthToDp(5),
    height: widthToDp(5),
    borderRadius: widthToDp(50),
    marginRight: widthToDp(1),
  },
  btnsText: {
    fontSize: widthToDp(2.4),
    fontWeight: 'bold',
  },
  activeBtnTextStyle: {
    color: Color.colorWhite,
  },
  deactiveBtnTextStyle: {
    color: Color.colorIndigo2,
  },
  closeButton: {
    // backgroundColor: 'red',
    padding: heightToDp(1.4),
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',

    // marginTop:30,
    gap: 40,
    // borderTopWidth: 2,
    // borderTopColor: '#ABABAB',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -2, // Negative value to cast the shadow above the element
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    // elevation: 1,
    // borderTopWidth: 1,
    // borderBottomLeftRadius: widthToDp(3),
    // borderBottomRightRadius: widthToDp(3),
  },
  bookingBtnBg: {
    backgroundColor: Color.colorGreen,
  },
  closeBtnBg: {
    backgroundColor: Color.colorWhite,
  },
  applied: {
    fontSize: heightToDp(1.5),
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#5a2daf',
    // textAlign: 'left',
    marginRight: widthToDp(5),
  },
  closeBtnText: {
    color: Color.colorIndigo2,
    marginLeft: widthToDp(3),
  },
  bookingText: {
    color: Color.colorWhite,
  },
  applicanteStyles: {
    color: Color.colorIndigo2,
    letterSpacing: widthToDp(1),
    fontWeight: '300',
    fontSize: widthToDp(3),
    padding: widthToDp(2),
  },
});

export default AccordionItem;
