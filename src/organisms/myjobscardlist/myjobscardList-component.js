import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import CustomImage from '../../atoms/image/imageComponent';
import {Border, Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import StaticImage from '../../assets/svgImage/static';
import {
  SpotlightBanner,
  FeaturedBanner,
  NewFeaturedBanner,
  NewSpotlightBanner,
} from '../../assets/svgIcons/spotlightbanner';
import AccordionItem from '../accordian/accordian-container';
import {FeedbacjobkSVGComponent} from '../../assets/svgIcons/feebackpaymentmodal';
import {useDispatch} from 'react-redux';

// import AccordionItem from '../../organisms/accordian/accordian-container';
import {storeProfileJobDetails} from '../../redux/checkprofilejobdetails/action';
import {useNavigation} from '@react-navigation/native';
import {getSelectedProfilesJobDetails} from '../../redux/selectedjobdetails/action';
import ServiceProviderAccordian from '../accordian/service-provider-accordian';
import {SmallExclamationSVG} from '../../assets/svgImage/providerProfile';
import {is} from 'date-fns/locale';

const MyjobsCardList = ({
  JobsList,
  jobAdType,
  accordianStatus,
  jobApplications,
  viewCount,
  isimageVisible,
  isNavigate,
  istouchvisible,
  IsBookingConfirmed,
  cardModal,
  selectedCandidateDetails,
  IsBookingCancel,
  hired,
  cancelCandidateDetails,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isBookingCancelText, setIsBookingCancelText] = useState(false);

  const onGetJobDetails = () => {
    dispatch(storeProfileJobDetails(JobsList));
    navigation.navigate('ProviderFeedbackScreen');
  };

  const checkStatusOnGetJobDetails = () => {
    dispatch(storeProfileJobDetails(JobsList));
    // navigation.navigate('ProviderFeedbackScreen');
    dispatch(getSelectedProfilesJobDetails(JobsList));
  };

  const renderBanner = () => {
    switch (jobAdType) {
      case 'SPOTLIGHT':
        return (
          <View style={styles.bannerContainer}>
            <NewSpotlightBanner />
            <CustomText text={'SPOTLIGHT'} style={styles.spotlightText} />
          </View>
        );
      case 'FEATURED':
        return (
          <View style={styles.bannerContainer}>
            <NewFeaturedBanner />
            <CustomText text={'FEATURED'} style={styles.featuredText} />
          </View>
        );
      default:
        return null;
    }
  };

  const handleJobPress = job => {
    navigation.navigate('JobDeatil', {
      imageSource: job.imageUrls[0],
      id: job.jobId,
      title: job.jobTitle,
      category: job.category,
      subCategory: job.subCategory,
      price: job.salary,
      description: job.jobDescription,
      location: job.address,
      starttime: job.starttime,
      startdate: job.startdate,
      isExpired: job.isExpired,
      createdOn: job.createdOn,
      images: job.imageUrls,
      area: job.area,
      address: job.address,
      postedBy: job.postedBy,
      location: job?.locationDesc?.description,
      IsPaid: job?.IsPaid ? job.IsPaid : false,
    });
  };

  const getserviceProviderItemData = JobsList => {
    navigation.navigate('PreviousJobsPaymentScreen');
    dispatch(getSelectedProfilesJobDetails(JobsList));

    // console.log('JobsListJobsList',JobsList);
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const truncatedTitle = truncateText(JobsList.jobTitle, 20);
  const truncatedLocation = truncateText(JobsList.locationDesc.description, 35);

  return (
    <TouchableOpacity
      activeOpacity={IsBookingCancel && !accordianStatus ? 1 : 0.7} // Set active opacity based on conditions
      onPress={
        IsBookingCancel && !accordianStatus
          ? null
          : istouchvisible
          ? null
          : isNavigate
          ? () => getserviceProviderItemData(JobsList)
          : () => handleJobPress(JobsList)
      }
      disabled={IsBookingCancel && !accordianStatus}
      style={{
        borderRadius: 10,
        borderTopColor: Color.colorGray,
        borderRightColor: Color.colorGray,
        borderLeftColor: Color.colorGray,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        marginBottom: 5,
        // Android fallback for shadow
      }}>
      {IsBookingCancel && isBookingCancelText && (
        <View style={styles.isBookingCancelTextCon}>
          <SmallExclamationSVG />
          <CustomText
            text={
              'Your chosen service provider is not available at the moment due to unforeseen event. Kindly re-hire a new provider from “View applicants'
            }
            style={styles.isBookingCancelText}
          />
        </View>
      )}
      <View
        style={[
          hired === true || IsBookingConfirmed ? styles.afterBookingMainContainer : styles.mainContainer,
          IsBookingCancel && !accordianStatus ? styles.afterCancelMainContainer : null,
        ]}>
        <View style={styles.frameParent}>
          <Image
            style={{width: 90, height: 90, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
            source={{
              uri: JobsList.imageUrls && JobsList.imageUrls.length > 0 ? JobsList.imageUrls[0] : JobsList.imageUrls,
            }}
          />
          <View style={styles.textContainer}>
            <View style={styles.SvgtextContainer}>
              <View style={styles.spotlightBannerContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                  {truncatedTitle}
                </Text>
                {renderBanner()}
              </View>
              <View>
                <CustomText text={JobsList.category} style={styles.categoryTextStyle} />
                <CustomText text={truncatedLocation} style={styles.categoryTextStyle} />
              </View>
            </View>
            <View style={styles.DateandRadius}>
              <CustomText text={JobsList.timeAgo} style={styles.AgoText} />
              <View style={styles.amountContainer}>
                <CustomText text={`$${JobsList.salary}`} style={styles.text1} />
              </View>
            </View>
          </View>
        </View>
        {cardModal ? null : (
          <>
            {accordianStatus ? (
              <AccordionItem
                onGetJobDetails={onGetJobDetails}
                checkStatusOnGetJobDetails={checkStatusOnGetJobDetails}
                jobApplications={jobApplications}
                viewCount={viewCount}
                IsBookingConfirmed={IsBookingConfirmed}
                selectedCandidateDetails={selectedCandidateDetails}
                IsBookingCancel={IsBookingCancel}
                setIsBookingCancelText={setIsBookingCancelText}
                isBookingCancelText={isBookingCancelText}
                cancelCandidateDetails={cancelCandidateDetails}
              />
            ) : (
              <ServiceProviderAccordian isBookingCancel={IsBookingCancel} />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MyjobsCardList;

const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: 'row',
  },
  bannerContainer: {
    position: 'relative',
    right: 40,
  },
  spotlightText: {
    position: 'absolute',
    fontSize: heightToDp(1.32),
    right: 4,
    top: 4,
    color: 'black',
    fontWeight: 'bold',
  },

  featuredText: {
    position: 'absolute',
    fontSize: heightToDp(1.32),
    color: 'white',
    top: 4,
    left: 15,
    fontWeight: 'bold',
  },
  spotlightBannerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Border.br_8,
  },
  mainContainer: {
    marginBottom: heightToDp(1),
    // borderWidth: 2,
    // borderColor: Color.colorRed,
    // borderRadius: widthToDp(2),
  },
  afterBookingMainContainer: {
    borderWidth: 2,
    borderColor: Color.colorGreen,
    borderRadius: widthToDp(2),
    marginBottom: widthToDp(1.5),
  },

  afterCancelMainContainer: {
    borderWidth: 2,
    borderColor: Color.colorRed,
    borderRadius: widthToDp(2),
    marginBottom: widthToDp(1.5),
  },

  isBookingCancelTextCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: widthToDp(1.5),
  },
  isBookingCancelText: {
    color: '#FF5757',
    fontSize: widthToDp(2.2),
    marginLeft: widthToDp(2),
    // textTransform: 'uppercase',
  },
  rupeeIcon: {
    width: widthToDp(5),
    height: widthToDp(5),
    marginTop: heightToDp(0.8),
  },

  frameParent: {
    flexDirection: 'row',
    backgroundColor: Color.colorWhite,
    borderRadius: widthToDp(3),
    marginBottom: heightToDp(0),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: heightToDp(0.4),
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    // margin: 5,
  },
  myJobCardImage: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderTopLeftRadius: widthToDp(2),
    borderBottomLeftRadius: widthToDp(2),
  },
  jobCardImageStyle: {
    width: widthToDp(28),
    height: widthToDp(26),
    borderTopLeftRadius: widthToDp(2),
    borderBottomLeftRadius: widthToDp(2),
  },
  textContainer: {
    flex: 1,
    marginLeft: heightToDp(2),
    justifyContent: 'center',
  },
  within15Kms: {
    fontSize: heightToDp(1.5),
    fontWeight: '300',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    marginTop: heightToDp(0.2),
    flexWrap: 'wrap',
    width: 100,
  },
  text1: {
    fontSize: heightToDp(1.5),
    letterSpacing: 1,
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    fontWeight: '300',
    marginTop: heightToDp(0.5),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  DateandRadius: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // AgoText: {
  //   fontSize: heightToDp(1.3),
  //   fontFamily: FontFamily.helvetica,
  //   color: '#949494',
  //   marginRight: heightToDp(2.5),
  //   marginTop: heightToDp(3),
  // },
  frameParent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: widthToDp(3),
    shadowOffset: {
      width: 0,
      height: heightToDp(0.4),
    },
    // marginBottom: -10,
  },
  textContainer: {
    flex: 1,
    marginLeft: heightToDp(2),
    justifyContent: 'center',
  },
  name: {
    fontSize: heightToDp(1.8),
    fontWeight: 'bold',
    fontFamily: FontFamily.helvetica,
    color: Color.colorIndigo2,
    width: widthToDp(50),
  },
  within15Kms: {
    fontSize: heightToDp(1.5),
    fontWeight: '300',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    marginTop: heightToDp(0.2),
    flexWrap: 'wrap',
    width: 100,
  },
  text1: {
    fontSize: heightToDp(1.5),
    letterSpacing: 1,
    fontFamily: FontFamily.helvetica,
    color: '#16A637',
    fontWeight: 'bold',
    marginTop: heightToDp(0.5),
    marginRight: widthToDp(4),
    fontSize: widthToDp(4),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  DateandRadius: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AgoText: {
    fontSize: heightToDp(1.3),
    fontFamily: FontFamily.helvetica,
    color: '#949494',
    marginRight: heightToDp(2.5),
    marginTop: heightToDp(3),
  },
  categoryTextStyle: {
    color: Color.colorSilver,
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: widthToDp(2.7),
  },
});
