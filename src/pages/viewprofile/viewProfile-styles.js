import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthArea, widthToDp} from '../../responsive/responsive';

function ViewProfileStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: Color.pageBgColor,
      flex: 1,
    },
    container: {
      padding: Padding.p_16,
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
    },
    label: {
      color: Color.colorIndigo,
      fontWeight: '700',
      fontSize: FontSize.size_12,
      marginBottom: Margin.m_10,
      fontFamily: FontFamily.helvetica,
      letterSpacing: 1.2,
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
    column: {
      flex: 1,
      marginLeft: widthArea(6),
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
      backgroundColor: Color.colorYellow,
      height: heightToDp(5),
      flex: 1,
      justifyContent: 'center',
      width: widthToDp(80),
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
      color: Color.colorBlack, // Use 'black' for color
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
    profileImage: {
      borderColor: 'transparant',
      width: widthToDp(30),
      height: widthToDp(30),
      // borderRadius: widthToDp(10),
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: Margin.m_22,
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
    profileContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
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
  });
  return styles;
}

export default ViewProfileStyles;
