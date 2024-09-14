import {StyleSheet, Platform} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

function ContactStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: Color.pageBgColor,
      flex: 1,
    },
    modalContentContainer: {
      backgroundColor: Color.colorWhite,
      borderRadius: widthToDp(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
    contactUsHeading: {color: Color.colorIndigo2, fontSize: widthToDp(4.5), fontWeight: 'bold'},
    contactUsDesCon: {marginVertical: widthToDp(3)},
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
    container: {
      padding: widthToDp(2),
      borderWidth: 2,
      borderColor: Color.colorLightGray,
      borderRadius: widthToDp(3),
      margin: widthToDp(3),
      backgroundColor: Color.colorWhite,
    },
    scrollView: {
      // marginHorizontal: 0,
    },
    faqContainer: {
      marginBottom: 20,
    },
    ques: {
      fontSize: FontSize.size_14,
      fontWeight: '700',
      marginBottom: Margin.m_8,
      color: Color.colorBlack,
    },
    frequentlyAskedQuestions: {
      // padding: Padding.p_5,
      fontSize: widthToDp(10),
      fontWeight: 'bold',
      color: Color.colorIndigo2,
    },
    helpTitle: {
      fontSize: widthToDp(6),
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      marginTop: widthToDp(5),
    },
    helpTitleDescription: {
      fontSize: widthToDp(4),
      color: 'gray',
      FontFamily: 'Inter',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: widthToDp(4),
      paddingHorizontal: widthToDp(8),
    },
    title: {
      fontSize: widthToDp(5),
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: widthToDp(2),
    },
    faqCategoryButton: {
      FontFamily: FontFamily.helvetica,
      fontWeight: '600',
    },
    faqCategoryButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      backgroundColor: Color.pageBgColor,
      marginTop: widthToDp(6),
    },
    categoryButton: {
      backgroundColor: Color.colorWhite,
      width: widthToDp(40),
      height: heightToDp(7),
      borderRadius: 5,
      margin: Margin.m_4,
      borderColor: Color.colorGray,
      borderWidth: 2,
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryButtonText: {
      color: Color.colorIndigo2,
      textAlign: 'center',
      fontSize: widthToDp(4.2),
      paddingHorizontal: widthToDp(2),
    },
    contactSupportBtn: {
      backgroundColor: Color.colorIndigo2,
      width: widthToDp(80),
      height: heightToDp(6),
      padding: Padding.p_8,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: Margin.m_10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthToDp(3),
    },
    contactSupportBtnText: {
      color: Color.colorWhite,
      textAlign: 'center',
      fontSize: FontSize.size_18,
    },
    mailIconStyles: {
      width: 40,
      height: 20,
      marginRight: Margin.m_6,
    },
    ans: {
      fontSize: FontSize.size_12,
      fontFamily: FontFamily.helvetica,
      color: Color.colorBlack,
    },
    logo: {
      marginLeft: Margin.m_32,
    },

    help: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    mailButton: {
      backgroundColor: Color.colorIndigo,
      width: widthToDp(60),
      height: heightToDp(5),
      borderRadius: Border.br_8,
      marginVertical: Margin.m_8,
      justifyContent: 'center',
      alignItems: 'center',
      // padding: Padding.p_10,
      alignSelf: 'center',
    },
    mailText: {
      fontFamily: 'Inter',
      fontSize: FontSize.size_14,
      color: Color.colorWhite,
      fontWeight: '600',
      // marginBottom: Margin.m_10,
    },
  });
  return styles;
}
export default ContactStyles;
