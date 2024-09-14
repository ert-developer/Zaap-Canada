import {StyleSheet} from 'react-native';
import {Padding, Margin, FontFamily, FontSize, Color} from '../../assets/static/globalStyles';
import {widthToDp, heightToDp} from '../../responsive/responsive';

function serviceProviderPublicprofileScreenStyle() {
  const styles = StyleSheet.create({
    profileCoverPhoto: {
      height: heightToDp(13),
    },
    profilePhoto: {
      borderRadius: 50,
      width: widthToDp(20),
      height: heightToDp(10),
      marginTop: -50,
      margin: Margin.m_6,
    },
    modalcontainer: {
      marginTop: widthToDp(20),
    },
    closeButton: {
      position: 'absolute',
      top: 30,
      right: 30,
      zIndex: 1, // Make sure it's above the image
    },
    emptyProfilePortfolioSvg: {
      marginBottom: widthToDp(3),
    },
    modalContentContainer: {
      backgroundColor: '#fff',
      borderRadius: widthToDp(3),
      justifyContent: 'center',
      // alignItems: 'center',
      height: heightToDp(70),
      width: widthToDp(90),
      padding: 0,
      overflow: 'hidden',
    },
    profileDetailsContainer: {
      marginLeft: Margin.m_16,
    },
    profileName: {
      fontSize: FontSize.size_22,
      fontWeight: 'bold',
      color: Color.colorBlack,
    },
    verificationAndReviews: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: Margin.m_4,
    },
    verifiedTextStyle: {
      fontWeight: '500',
      fontSize: FontSize.size_18,
      color: Color.colorBlack,
    },
    reviewsTextStyle: {
      fontWeight: '500',
      fontSize: FontSize.size_16,
      color: Color.colorBlack,
    },
    locationsStyle: {
      flexDirection: 'row',
      margin: Margin.m_4,
    },
    locationIconStyle: {
      width: 20,
      height: 20,
      marginRight: Margin.m_6,
    },
    locationTestStyle: {
      color: '#03a1fc',
      fontWeight: '500',
      fontSize: FontSize.size_16,
    },
    memberShipContainer: {
      flexDirection: 'row',
      margin: Margin.m_4,
    },
    memberShipText: {
      fontWeight: '500',
      fontSize: FontSize.size_16,
      color: Color.colorBlack,
    },
    profileBio: {
      marginTop: Margin.m_16,
      lineHeight: widthToDp(6),
      fontSize: FontSize.size_14,
      textAlign: 'justify',
    },
    reviewsHeadingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: Margin.m_12,
      borderColor: Color.colorGray,
    },
    reviewsHeadingTextStyle: {
      fontSize: FontSize.size_18,
      color: Color.colorBlack,
    },
    portfolioHeadingTextStyle: {
      fontSize: FontSize.size_18,
      color: Color.colorBlack,
    },
    downArrowStyles: {fontSize: FontSize.size_22},
    bottomButtonContainer: {
      width: '98%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    hireButton: {
      width: widthToDp(46),
      height: heightToDp(6),
      borderRadius: widthToDp(2),
      textAlign: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00BF63',
      // marginRight: 2,
    },

    feedBackConatiner: {
      marginTop: heightToDp(3),
      textAlign: 'center',
      borderRadius: 8,
      backgroundColor: Color.colorGray,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 1.6,
      padding: heightToDp(1.6),
      width: '80%',
      marginLeft: widthToDp(10),
    },
    Conatiner: {
      padding: 5,
      marginTop: heightToDp(3),
    },
    dateAndSTarsContainer: {
      flexDirection: 'row',
      gap: 20,
      marginTop: heightToDp(0.5),
    },
    feedBackDescription: {
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: '#000',
      //   width: 306,
      marginTop: heightToDp(0.5),
    },
    feedbackNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    logoName: {
      fontSize: heightToDp(2),
      fontWeight: '700',
      fontFamily: 'Helvetica',
      color: '#000',
    },
    feedbackNameLogo: {
      backgroundColor: '#D9D9D9',
      height: heightToDp(6),
      width: heightToDp(6),
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    feedbackName: {
      padding: 11,
      color: '#000',
      fontSize: heightToDp(2.5),
      fontWeight: '700',
      fontFamily: 'Helvetica',
      letterSpacing: 0.8,
    },

    providerContainer: {
      padding: 10,
      flex: 1,
    },
    profileContainer: {
      alignItems: 'center', // Center content horizontally
      marginTop: heightToDp(6),
    },
    contentContainer: {
      alignItems: 'center', // Center content horizontally within contentContainer
    },
    description: {
      fontSize: 12,
      letterSpacing: 0.5,
      fontFamily: 'Helvetica',
      color: '#000',
      width: 268,
      marginTop: heightToDp(0.5),
    },
    name: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: '700',
      fontFamily: 'Helvetica',
      color: '#000',
      marginTop: heightToDp(1.3),
    },
    logoContainer: {
      backgroundColor: '#5A2DAF',
      height: heightToDp(12),
      width: heightToDp(12),
      borderRadius: 90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    namelogo: {
      padding: 1,
      color: '#FFFFFF',
      fontSize: heightToDp(9),
      fontWeight: '700',
      fontFamily: 'Helvetica',
      letterSpacing: 0.8,
    },
    Profile: {
      fontSize: 24,
      fontWeight: '700',
      fontFamily: 'Helvetica',
      color: '#000',
    },
    feedback: {
      fontSize: 12,
      letterSpacing: 2.4,
      textTransform: 'uppercase',
      fontWeight: '300',
      fontFamily: 'Helvetica',
      color: '#5a2daf',
    },

    reviewsContainer: {
      padding: Padding.p_14,
    },
  });

  return styles;
}

export default serviceProviderPublicprofileScreenStyle;
