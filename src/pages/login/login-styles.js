import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import LogoutContainer from '../log-out/logout-container';

const {width: screenWidth} = Dimensions.get('window');

function LoginStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: 'white',
    },
    container: {
      height: Dimensions.get('window').height,
      backgroundColor: Color.colorWhite,
    },
    helpTextContainer: {
      // display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: widthToDp(5),
    },
    helpTextTouchableContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    helpText: {
      fontSize: widthToDp(4),
      fontWeight: 'bold',
      color: Color.colorBlack,
    },
    topContent: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightToDp(5),
    },
    row: {
      flexDirection: 'row',
      backgroundColor: Color.colorGray,
      width: screenWidth * 0.9,
      alignSelf: 'center',
      marginBottom: Margin.m_16,
      height: heightToDp(8),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    mainText: {
      fontSize: 54,
      color: 'white',
    },
    carText: {
      color: Color.colorBlack,
      fontFamily: 'Inter',
      fontSize: FontSize.size_20,
      fontWeight: '700',
    },
    banner: {
      width: screenWidth * 0.8,
      marginHorizontal: Margin.m_35,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Margin.m_22,
    },
    bannerImage: {
      width: widthToDp(50),
      height: heightToDp(25),
      justifyContent: 'center',
      alignItems: 'center',
    },
    zaaplogo: {
      alignSelf: 'center',
      marginTop: heightToDp(15),
    },
    signIn: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: Margin.m_10,
      marginTop: Margin.m_40,
    },
    flatListContainer: {
      paddingHorizontal: Padding.p_16,
      marginTop: Margin.m_10,
      marginBottom: Margin.m_22,
    },
    googleButton: {
      backgroundColor: 'transparant',
      borderRadius: 5,
    },
    text: {
      color: Color.colorBlack,
      marginLeft: Margin.m_22,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
    },
    icon: {
      position: 'absolute',
      left: 60,
    },
    terms: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Margin.m_22,
    },
    termsText: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      // marginBottom: Margin.m_6,
      color: 'black',
      fontWeight: '200',
    },
    underline: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      textDecorationLine: 'underline',
      // textDecorationThickness: 2,
      color: Color.colorBlack,
    },
    modalContent: {
      // width: widthToDp(80),
      // height: heightToDp(70),
      alignSelf: 'center',
      backgroundColor: Color.colorWhite,
      padding: Padding.p_10,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: heightToDp(10),
    },
    modalButton: {
      backgroundColor: Color.colorIndigo,
      borderRadius: Border.br_4,
      width: widthToDp(80),
      height: heightToDp(5),
      // marginTop: Margin.m_16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: '700',
      color: Color.colorWhite,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    },
    title: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_18,
      // fontWeight: '700',
      color: Color.colorIndigo,
      textAlign: 'center',
      marginBottom: Margin.m_20,
    },
    info: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_14,
      color: Color.colorIndigo,
      textAlign: 'center',
      // fontWeight: '700',
    },
    infoContainer: {
      marginBottom: Margin.m_40,
    },
    containerFade: {
      backgroundColor: Color.pageBgFade,
    },
    modalContentContainer: {
      backgroundColor: Color.colorWhite,
      borderRadius: widthToDp(3),
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 80,
    },
    modalContentContainer2: {
      alignItems: 'center',
      position: 'absolute',
      zIndex: 1,
      top: 220,
    },
    contactUsHeading: {color: Color.colorIndigo2, fontSize: heightToDp(2.7), fontWeight: 'bold'},
    contactUsDesCon: {marginBottom: widthToDp(2)},
    contactUsDesscription: {fontSize: widthToDp(3), textAlign: 'center'},
    contactUsBtn: {
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      height: widthToDp(10),
      width: '80%',
      marginBottom: widthToDp(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: Color.colorWhite,
    },
  });
  return styles;
}

export default LoginStyles;
