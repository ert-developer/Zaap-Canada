import {Dimensions, StyleSheet} from 'react-native';
import {Color, FontSize, Border, Padding, Margin, FontFamily} from '../../assets/static/globalStyles';
import {heightArea, heightToDp, widthToDp} from '../../responsive/responsive';

function PostJobStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: '#ffffff',
      flex: 1,
      paddingBottom: heightToDp(2),
    },
    charLeftText: {
      color: Color.colorRed,
      fontSize: 10,
      fontWeight: '400',
      textAlign: 'right',
    },
    container: {
      borderColor: Color.colorSilver,
      borderWidth: 1,
      padding: Padding.p_16,
      margin: widthToDp(2),
      borderRadius: widthToDp(5),
      marginTop: 20,
    },
    // containerFade: {
    //   backgroundColor: Color.pageBgFade,
    // },
    scrollView: {
      marginHorizontal: 0,
    },
    pageTitle: {
      fontSize: FontSize.size_24,
      color: Color.colorIndigo,
      fontWeight: '700',
      fontFamily: 'Helvetica',
      textAlign: 'left',
      marginBottom: Margin.m_12,
    },
    inputContainer: {
      marginVertical: Margin.m_10,
    },
    label: {
      color: Color.colorBlack,
      fontWeight: '700',
      fontSize: FontSize.size_14,
      marginBottom: Margin.m_4,
    },
    input: {
      // height: 48,
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
      fontSize: FontSize.size_16,
      color: Color.colorSilver,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'centre',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    checkboxLabel: {
      color: Color.colorBlack,
      fontWeight: '700',
      fontSize: FontSize.size_14,
      marginBottom: Margin.m_4,
    },
    premiumAdInput: {
      marginLeft: widthToDp(5),
    },
    inputWrapper: {
      padding: Padding.p_1,
    },
    firstPicker: {
      width: '95%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Margin.m_22,
    },
    modalView: {
      margin: Margin.m_20,
      backgroundColor: Color.pageBgColor,
      borderRadius: Border.br_20,
      padding: Padding.p_30,
      alignItems: 'center',
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    selectPhotoTitle: {
      fontSize: FontSize.size_22,
      color: Color.colorBlack,
      fontWeight: '600',
      fontFamily: 'Helvetica',
      textAlign: 'left',
      marginBottom: Margin.m_12,
    },
    twoButton: {
      // height: 70,
      // width: 80,
      // margin: 10,
      // borderRadius: 18,
      // padding: 8,
      // elevation: 2,
      // backgroundColor: '#e8e8e8',
      // textAlign: 'center',
    },
    buttonCenter: {
      alignItems: 'center',
    },
    cancelButton: {
      borderRadius: Border.br_20,
      padding: Padding.p_8,
      elevation: 2,
      backgroundColor: Color.colorRed,
      textAlign: 'center',
      margin: Margin.m_10,
    },
    textStyle: {
      color: '#a1a1a1',
      fontWeight: '500',
    },
    cancelTextStyle: {
      color: Color.colorWhite,
      fontWeight: '500',
    },
    addPhotoButton: {
      borderRadius: Border.br_8,
      backgroundColor: Color.colorIndigo2,
      width: '45%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Padding.p_8,
      marginBottom: heightArea(10),
    },
    icon: {
      marginRight: Margin.m_10,
    },
    disabledButton: {
      opacity: 0.9, // Make the button look disabled
    },

    addPhotosText: {
      color: Color.colorWhite,
      fontWeight: '700',
    },
    grid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
    },
    imageContainer: {
      width: Dimensions.get('window').width / 4 - 10, // Each image takes one-third of the screen width
      height: Dimensions.get('window').width / 4 - 10, // Height for two rows of images
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      width: '95%',
      height: '95%',
      borderRadius: 2,
    },
    deleteIconContainer: {
      position: 'absolute',
      top: 5,
      right: 10,
      backgroundColor: Color.colorRed,
      padding: Padding.p_2,
      borderRadius: Border.br_50,
    },
    updateBtnContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    nextButton: {
      backgroundColor: Color.colorIndigo2,
      width: '50%', // 50% width for each button
      height: 42,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Border.br_8, // Border radius adjusted for a smoother look
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      marginTop: heightArea(10),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      elevation: 3,
    },
    cancelBtn: {
      backgroundColor: Color.colorIndigo2,
      width: '45%', // 50% width for each button
      height: 42,
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Border.br_8, // Border radius adjusted for a smoother look
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      marginTop: heightArea(10),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      elevation: 3,
    },
    updateBtn: {
      backgroundColor: Color.colorIndigo2,
      width: '45%', // 50% width for each button
      height: 42,
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Border.br_8, // Border radius adjusted for a smoother look
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      marginTop: heightArea(10),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      elevation: 3,
    },
    paymentButton: {
      backgroundColor: Color.colorYellow,
      width: '100%', // 50% width for each button
      height: 42,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Border.br_20, // Border radius adjusted for a smoother look
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      elevation: 3,
    },
    nextText: {
      color: Color.colorWhite, // Use 'black' for color
      fontSize: FontSize.size_16, // Adjust font size if needed
      fontWeight: '700',
    },
    congratulationsText: {
      color: Color.colorIndigo2,
      fontWeight: '900',
      fontSize: FontSize.size_18,
      fontFamily: 'Roboto',
    },
    adText: {
      color: Color.colorIndigo2,
      fontWeight: '900',
      fontSize: FontSize.size_18,
      fontFamily: 'Roboto',
    },
  });
  return styles;
}

export default PostJobStyles;
