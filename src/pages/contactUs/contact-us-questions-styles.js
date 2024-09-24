import {StyleSheet, Platform} from 'react-native';
import {Color, FontFamily, Padding} from '../../assets/static/globalStyles.js';
import {heightToDp, widthToDp} from '../../responsive/responsive';

function ContactUsQuestionsStyles() {
  const styles = StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      borderColor: Color.colorGray,
      borderRadius: widthToDp(3),
      margin: widthToDp(3),
      backgroundColor: Color.colorWhite,
    },
    frequentlyAskedQuestions: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Color.colorGray,
      borderStyle: 'solid',
      fontSize: widthToDp(4),
      fontWeight: 'bold',
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingHorizontal: widthToDp(5),
      marginVertical: widthToDp(2),
    },
    title: {
      fontSize: widthToDp(5),
      color: Color.colorIndigo2,
      fontFamily: FontFamily.helvetica,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    contactUsButtonListCon: {
      height: widthToDp(15),
    },
    horizontalContactUsBtnFlatList: {
      padding: Padding.p_5,
    },
    contactUsBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.colorIndigo2,
      width: widthToDp(25),
      height: heightToDp(4.5),
      marginHorizontal: widthToDp(1),
      borderRadius: widthToDp(1),
    },
    contactUsBtnText: {
      color: Color.colorWhite,
      fontSize: widthToDp(3),
    },
    contactUsQuestionHeading: {
      fontSize: widthToDp(6),
      fontWeight: 'bold',
      // padding: Padding.p_5,
      color: Color.colorIndigo2,
      marginBottom: widthToDp(4),
      marginLeft: 10,
    },
    questionsContainer: {
      borderBottomWidth: 1,
      borderColor: Color.colorGray,
      // borderTopWidth: 1,
      // borderColor: Color.colorBlack,
      // borderStyle: 'solid',
    },
    questionAndAnswerContainer: {
      borderWidth: 0.5,
      borderColor: Color.colorBlack,
      borderStyle: 'solid',
      padding: Padding.p_8,
    },
    questionContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    questionTextStyle: {
      fontSize: 16,
      fontWeight: '400',
      color: Color.colorBlack,
      flex: 1,
      flexWrap: 'wrap',
      marginRight: heightToDp(0.8),
      // textAlign: 'justify',
      paddingLeft: Padding.p_5,
      fontFamily: FontFamily.helvetica,
    },
    answerTextStyle: {
      padding: Padding.p_5,
      textAlign: 'justify',
      fontSize: 13,
      fontFamily: FontFamily.poppins,
      fontWeight: 'normal',
    },
    minusIconStyle: {
      marginLeft: 'auto',
      marginTop: -10,
    },
  });
  return styles;
}

export default ContactUsQuestionsStyles;
