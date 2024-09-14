import {StyleSheet, Dimensions} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const feedbackStyles = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return StyleSheet.create({
    feedbackContainer: {
      //   flex: 1,
      paddingTop: widthToDp(3),
      width: screenWidth - 32,
      margin: widthToDp(3),
      backgroundColor: '#fff',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      padding: widthToDp(3),
      //   height: widthToDp(15),
      height: heightToDp(88),
    },
    label: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_14,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: Margin.m_6,
    },
    textAreaLabel: {
      marginVertical: Margin.m_8,
    },
    textArea: {
      padding: Padding.p_10,
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3.84,
      shadowOpacity: 0.25,
      elevation: 5,
      backgroundColor: Color.colorWhite,
      borderRadius: Border.br_8,
      fontSize: FontSize.size_sm,
      color: Color.colorSilver,
      marginBottom: Margin.m_10,
    },
    saveButton: {
      padding: Padding.p_10,
      backgroundColor: Color.colorIndigo2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
      borderRadius: Border.br_8,
    },
    textButton: {
      color: Color.colorWhite,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: 'bold',
      letterSpacing: 0.48,
    },
    modalContainer: {
      backgroundColor: '#fff',
      borderRadius: widthToDp(2),
    },
    modalContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: widthToDp(5),
    },
    modalSuccessText: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: widthToDp(5),
    },
    modalSuccessDescriptionText: {
      textAlign: 'center',
      padding: widthToDp(2),
      color: Color.colorBlack,
    },
  });
};

export default feedbackStyles;
