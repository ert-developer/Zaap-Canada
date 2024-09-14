import {StyleSheet} from 'react-native';
import {Border, Color, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const updateBankDetailsStyles = () => {
  const styles = StyleSheet.create({
    updateBankDetailsMainCon: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(5),
      margin: widthToDp(3),
      padding: widthToDp(5),
    },
    accountTypeSelectedStyles: {
      padding: Padding.p_8,
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
      color: Color.colorBlack,
      marginBottom: Margin.m_10,
    },
    label: {
      color: Color.colorBlack,
      // fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_14,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: Margin.m_6,
    },
    bankDetailsUpdateBtn: {
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      height: widthToDp(12),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: widthToDp(5),
    },
    updateBtnText: {
      color: Color.colorWhite,
      fontWeight: '900',
      fontSize: FontSize.size_16,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      // padding: 20,
      borderRadius: 5,
      alignItems: 'center',
      width: widthToDp(90),
      height: heightToDp(25),
      justifyContent: 'center',
    },
    popupHeadingCon: {
      marginTop: widthToDp(5),
    },
    popupHeadText: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: widthToDp(4.5),
      paddingHorizontal: widthToDp(15),
      textAlign: 'center',
    },
    popupDescriptionText: {
      color: Color.colorBlack,
      paddingHorizontal: widthToDp(5),
      textAlign: 'center',
      marginTop: widthToDp(5),
    },
  });
  return styles;
};

export default updateBankDetailsStyles;
