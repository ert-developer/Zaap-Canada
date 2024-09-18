import {SafeAreaView, ScrollView, View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import CustomText from '../../atoms/text/textComponent';
import VerifiedSVGComponent from '../../assets/svgIcons/verifiedsvg/verified-svg';
import ProfileLocationSVGComponent from '../../assets/svgIcons/profilelocationsymbol/profile-location-symbol';
import {MembershipSVGComponent} from '../../assets/svgIcons/membershipsvg/membershipsvg';
import {LanguagesSVG} from '../../assets/svgIcons/membershipsvg/membershipsvg';
import serviceProviderPublicprofileScreenStyle from './service-provider-public-profile-styles';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import ArrowIcon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
import HeaderComponent from '../../atoms/header/headerComponent';
import ReadMoreText from '../../organisms/readmore/read-more';
import CustomLoader from '../../organisms/customLoader';
import {Color} from '../../assets/static/globalStyles';
import {EmptyPortfolioSVG} from '../../assets/svgImage/portfolio/portfolio';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {useNavigation} from '@react-navigation/native';

const ServiceProviderPublicProfileScreen = ({
  profileDetails,
  location,
  starRatingCount,
  feedbackData,
  firstLetter,
  formattedDate,
  languages,
  isReviewOpen,
  setIsReviewOpen,
  handlePortfolioOpen,
}) => {
  const styles = serviceProviderPublicprofileScreenStyle();

  // Determine how to format the languages for display
  let firstLineLanguages = '';
  let secondLineLanguages = '';
  let thirdLineLanguages = '';
  if (languages.length > 6) {
    firstLineLanguages = languages.slice(0, 3).join(', ');
    secondLineLanguages = languages.slice(3, 6).join(', ');
    thirdLineLanguages = languages.slice(6).join(', ');
  } else if (languages.length > 3) {
    firstLineLanguages = languages.slice(0, 3).join(', ');
    secondLineLanguages = languages.slice(3).join(', ');
  } else if (languages.length > 0) {
    firstLineLanguages = languages.join(', ');
  } else {
    firstLineLanguages = 'No languages specified'; // Default message when no languages are provided
  }
  const navigation = useNavigation();

  const handleReviewOpen = () => {
    navigation.navigate('ServiceProviderReviews', {feedbackData, firstLetter});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <HeaderComponent text={'My Public Profie'} />
      <ScrollView>
        <Image
          source={require('../../assets/staticImages/profile-cover-photo-new.jpg')}
          style={styles.profileCoverPhoto}
        />

        <View
          style={{
            borderColor: Color.colorSilver,
            borderWidth: 1,
            margin: 10,
            borderRadius: 20,
            height: heightToDp(77),
          }}>
          <View style={styles.profileDetailsContainer}>
            {!profileDetails?.personal_photo ? (
              <Image src={profileDetails?.imageURL} style={styles.profilePhoto} />
            ) : (
              <Image src={profileDetails?.personal_photo[0]} style={styles.profilePhoto} />
            )}
            <CustomText text={profileDetails?.legal_name_on_id} style={styles.profileName} />
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
              <Text style={styles.memberShipText}>
                Languages Known: {firstLineLanguages}
                {secondLineLanguages ? `\n                                   ${secondLineLanguages}` : ''}
                {thirdLineLanguages ? `\n                                   ${thirdLineLanguages}` : ''}
              </Text>
            </View>
            <View>
              {profileDetails?.bio ? (
                <ReadMoreText text={profileDetails.bio} style={styles.profileBio} />
              ) : (
                <CustomLoader visible={true} />
              )}
            </View>
          </View>

          <View>
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
            </View>
          </View>

          <View
            style={{
              borderColor: Color.colorSilver,
              borderRadius: 10,
              borderWidth: 1,
              marginHorizontal: 10,
              paddingHorizontal: 5,
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

        {/* userWorking={userWorking} */}
        {/* <ModalComponent isVisible={isModalVisible} onClose={() => setModalVisible(false)} userWorking={userWorking} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceProviderPublicProfileScreen;
