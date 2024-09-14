import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const updateGovtDetailsStyles = () => {
  const styles = StyleSheet.create({
    updateGovtDetailsMainCon: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(5),
      margin: widthToDp(3),
      padding: widthToDp(5),
    },
    selfieLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginLeft: widthToDp(5),
    },
    exclamationIconStyles: {
      marginLeft: widthToDp(1),
      marginTop: widthToDp(-1),
    },
    totalWidth: {
      width: widthToDp(85),
      padding: Padding.p_14,
      backgroundColor: Color.colorIndigo2,
      justifyContent: 'center',
      alignItems: 'center',
      // marginVertical: Margin.m_16,
      borderRadius: Border.br_8,
      flexDirection: 'row',
      marginBottom: widthToDp(2),
    },
    label: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_14,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: Margin.m_6,
    },
    inputErrorStyles: {
      borderColor: Color.colorRed,
      borderWidth: 2,
    },
    textWhite: {
      color: Color.colorWhite,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: '700',
      letterSpacing: 0.48,
      paddingHorizontal: Padding.p_5,
    },
    image: {
      flex: 1,
      width: '95%',
      height: '95%',
      borderRadius: 5,
    },
    deleteIconContainer: {
      position: 'absolute',
      top: 5,
      right: 10,
      backgroundColor: Color.colorRed,
      padding: Padding.p_2,
      borderRadius: Border.br_50,
    },
    imageContainer: {
      width: Dimensions.get('window').width / 4 - 10, // Each image takes one-third of the screen width
      height: Dimensions.get('window').width / 4 - 10, // Height for two rows of images
      position: 'relative',
      overflow: 'hidden',
    },
    select: {
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
    selfieLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginLeft: widthToDp(5),
    },
    exclamationIconStyles: {
      marginLeft: widthToDp(1),
      marginTop: widthToDp(-1),
    },
    halfWidth: {
      width: widthToDp(40),
      padding: Padding.p_14,
      backgroundColor: Color.colorIndigo2,
      justifyContent: 'center',
      alignItems: 'center',
      // marginVertical: Margin.m_16,
      borderRadius: Border.br_8,
      flexDirection: 'row',
    },
    updateBtn: {
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      height: widthToDp(12),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: widthToDp(5),
      marginBottom: widthToDp(10),
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
      height: heightToDp(35),
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

export default updateGovtDetailsStyles;
