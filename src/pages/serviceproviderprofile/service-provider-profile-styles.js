import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthArea, widthToDp} from '../../responsive/responsive';

function ServiceProviderProfileStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: Color.pageBgColor,
      flex: 1,
    },
    charLeftText: {
      color: '#464183',
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'right',
      marginTop: 10,
    },
    container: {
      padding: Padding.p_10,
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderRadius: widthToDp(2),
      margin: widthToDp(3),
    },
    containerFade: {
      backgroundColor: Color.pageBgFade,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    pageTitle: {
      fontSize: FontSize.size_24,
      color: Color.colorIndigo,
      fontWeight: '700',
      fontFamily: FontFamily.helvetica,
      marginBottom: Margin.m_8,
    },
    inputContainer: {
      marginVertical: Margin.m_10,
      // width: widthToDp(40),
    },
    donAndInputContainer: {
      width: widthToDp(43),
    },
    marginRigth: {
      marginRigth: widthToDp(2),
    },
    disableTextColor: {
      color: 'red',
      fontWeight: 'bold',
    },
    label: {
      color: Color.colorBlack,
      fontWeight: '700',
      fontSize: FontSize.size_14,
      marginBottom: Margin.m_10,
      fontFamily: FontFamily.helvetica,
      // letterSpacing: 1.2,
    },
    fullnameInputStyles: {
      borderColor: 'red',
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: widthToDp(5),
      color: 'red',
    },
    input: {
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
      fontSize: FontSize.size_16,
      color: Color.colorSilver,
    },
    input1: {
      padding: Padding.p_4,
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: widthToDp(0),
        height: widthToDp(2),
      },
      shadowRadius: 3.84,
      shadowOpacity: 0.25,
      elevation: 5,
      backgroundColor: Color.colorWhite,
      borderRadius: Border.br_8,
      fontSize: FontSize.size_16,
      color: Color.colorSilver,
    },
    inputWrapper: {
      padding: Padding.p_1,
    },
    firstPicker: {
      marginBottom: Margin.m_4,
    },
    secondPicker: {
      width: '95%',
    },
    row: {
      justifyContent: 'space-between',
      marginVertical: Margin.m_8,
      flexDirection: 'row',
    },
    dobAndGenderCon: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      marginLeft: widthArea(6),
    },
    selectDOB: {
      flex: 1,
    },
    row1: {
      justifyContent: 'space-between',
      marginVertical: Margin.m_10,
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
        width: widthToDp(0),
        height: widthToDp(2),
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    selectPhotoTitle: {
      fontSize: FontSize.size_22,
      color: Color.colorBlack,
      fontWeight: '600',
      fontFamily: 'FontFamily.helvetica',
      textAlign: 'left',
      marginBottom: Margin.m_12,
    },
    twoButton: {},
    buttonCenter: {
      alignItems: 'center',
    },
    cancelButton: {
      borderRadius: Border.br_20,
      padding: Padding.p_8,
      elevation: 2,
      backgroundColor: 'red',
      textAlign: 'center',
      margin: Margin.m_10,
    },
    textStyle: {
      color: '#a1a1a1',
      fontWeight: '500',
    },
    cancelTextStyle: {
      color: 'white',
      fontWeight: '500',
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
      width: widthToDp(95),
      height: widthToDp(95),
      borderRadius: 2,
    },
    deleteIconContainer: {
      position: 'absolute',
      top: 5,
      right: 10,
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      padding: Padding.p_2,
      borderRadius: Border.br_50,
    },
    nextButton: {
      backgroundColor: Color.colorIndigo2,
      height: heightToDp(6),
      flex: 1,
      justifyContent: 'center',
      width: widthToDp(90),
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: Border.br_8, // Border radius adjusted for a smoother look
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
      fontSize: FontSize.size_12, // Adjust font size if needed
      fontWeight: '700',
    },
    imageContainer1: {
      height: widthToDp(30),
      width: widthToDp(30),
      borderWidth: 1.8,
      borderRadius: widthToDp(15),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: Margin.m_4,
      position: 'relative',
      borderColor: 'transparent',
    },
    backtNtitle: {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    editButton: {
      width: widthToDp(10),
      height: heightToDp(5),
      backgroundColor: Color.colorYellow,
      borderRadius: Border.br_20,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right: 150,
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      // alignItems: 'center',
      position: 'relative',
    },
    profileImageCon: {
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'relative',
    },
    profileImage: {
      borderColor: Color.colorBlack,
      borderWidth: 1,
      width: widthToDp(30),
      height: widthToDp(30),
      borderRadius: widthToDp(50),
      resizeMode: 'cover',
    },
    cameraIconStyles: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    exclamationStyles: {
      position: 'absolute',
      top: 5,
      right: 5,
      // borderWidth: 1,
      // borderColor: 'red',
      // borderStyle: 'solid',
    },
    exclamationIcon: {
      marginLeft: 'auto',
      marginBottom: widthToDp(1),
    },
    tooltipTextContainer: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: Color.colorSilver,
      borderRadius: widthToDp(1),
      padding: widthToDp(1),
    },
    tooltipText: {
      fontSize: widthToDp(2),
      textAlign: 'center',
    },
    logout: {
      backgroundColor: 'red',
      width: widthToDp(80),
      padding: Padding.p_10,
      marginTop: heightToDp(25),
      borderRadius: Border.br_8,
      alignSelf: 'center',
      height: heightToDp(5),
    },
    imageborder: {
      width: widthToDp(30),
      height: widthToDp(30),
      borderRadius: widthToDp(15),
      borderWidth: 2,
      borderColor: Color.colorSilver,
      justifyContent: 'center',
      alignItems: 'center',
    },
    edit: {
      backgroundColor: Color.colorYellow,
      width: widthToDp(10),
      height: widthToDp(10),
      // alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthToDp(5),
      position: 'absolute',
      top: 100,
      right: 80,
    },
    editText: {
      color: Color.colorBlack,
    },
    editlog: {},
    editfalse: {
      flex: 1,
      padding: 16,
    },
    // profileContainer: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // },
    userInfoContainer: {
      width: '100%',
      marginTop: Margin.m_22,
    },
    userInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: Margin.m_12,
    },
    value: {
      flexShrink: 1,
    },
    popupContainer: {
      backgroundColor: Color.colorWhite,
      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthToDp(3),
      width: widthToDp(70),
      height: heightToDp(25),
      // width: widthToDp(80),
      // height: widthToDp(40),
      // flex: 2,
    },
    popupText: {
      color: Color.colorIndigo2,
      fontSize: widthToDp(5),
      fontWeight: 'bold',
    },
    dropdownStyle: {
      padding: Padding.p_6,
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      shadowOpacity: 0.25,
      elevation: 2,
      backgroundColor: Color.colorWhite,
      borderRadius: Border.br_8,
      fontSize: FontSize.size_16,
      color: Color.colorSilver,
      borderWidth: 0,
      marginBottom: 15,
    },
    dropDownContainer: {
      borderWidth: 0,
    },
    badgeTextStyle: {
      color: '#000', // Style for selected badges text
    },
    imageContainer1: {
      height: 100,
      width: 100,
      borderWidth: 1.8,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 4,

      position: 'relative',
      borderColor: 'transparent',
      borderRadius: 70,
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: 13.5, // Adjust the border radius to match the parent container's borderRadius minus borderWidth
    },
    errorStyle: {
      borderColor: 'red', // Red border to indicate an error
      borderWidth: 1,
    },
  });
  return styles;
}

export default ServiceProviderProfileStyles;
