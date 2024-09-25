import {StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {shadow} from 'react-native-paper';

function JobDetailStyles() {
  const styles = StyleSheet.create({
    jobTitle: {
      fontFamily: 'Helvetica',
      fontWeight: '700',
      color: Color.colorBlack,
      fontSize: widthToDp(6),
      marginBottom: heightToDp(1.5),
    },
    unlocked: {
      height: 27,
      width: 27,
    },
    dynamicTextStyle: {
      color: '#000000',
      fontFamily: 'Helvetica',
      fontWeight: '400',
      fontSize: heightToDp(2),
      marginTop: heightToDp(0.5),
    },
    location: {
      width: widthToDp(49),
    },
    textSTyle: {
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      color: 'black',
      fontSize: widthToDp(4),
      paddingLeft: widthToDp(2),
    },
    directionButtton: {
      marginTop: heightToDp(5),
      alignItems: 'center',
      marginLeft: heightToDp(3),
      marginBottom: heightToDp(1),
    },
    textStyle: {
      color: 'black',
    },
    shadowLine: {
      marginVertical: Margin.m_5,
      height: 2,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2, // for Android shadow
      marginBottom: heightToDp(0.5),
      marginTop: heightToDp(1),
      borderRadius: 10,
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
      width: widthToDp(90),
    },
    popupHeadText: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: widthToDp(4.5),
      paddingHorizontal: widthToDp(10),
      textAlign: 'center',
      marginBottom: 8,
    },

    containerpadding: {
      padding: heightToDp(1),
      paddingLeft: heightToDp(3),
      paddingBottom: heightToDp(0.4),
    },

    containerpaddingforlogo: {
      paddingHorizontal: heightToDp(3),
    },
    // white - #ffffff light grey - #f2f2f2
    containerWithShadow: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // for Android shadow
      margin: heightToDp(1),
      borderRadius: 10,
    },
    dynamicDescription: {
      marginBottom: heightToDp(1),
      marginTop: heightToDp(1),
    },
    desc: {
      marginLeft: heightToDp(4),
    },
    description: {
      flexDirection: 'row',
      marginBottom: heightToDp(4),
    },
    descContainer: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // for Android shadow
    },
    conatiner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    direction: {
      padding: Padding.p_8,
      width: widthToDp(40),
      backgroundColor: Color.colorYellow,
      borderRadius: Border.br_16,
      justifyContent: 'center',
    },
    applyButton: {
      flex: 1,
      backgroundColor: '#008000',
      padding: 8,
      width: '50%',
      color: 'white',
      fontSize: heightToDp(2),
      textAlign: 'center',
    },
    backButton: {
      flex: 1,
      backgroundColor: '#FF0000',
      padding: 10,
      width: '50%',
      color: 'white',
      marginLeft: 6,
    },
    applyButtonText: {
      color: 'white',
      textAlignVertical: 'center',
    },
    buttomText: {
      fontSize: heightToDp(3),
    },
    icon: {
      width: 16,
      height: 16,
      color: '#5A2DAF',
    },
    imageContainer: {
      padding: 5,
    },
    likeshare: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'column',
      backgroundColor: Color.colorSilver,
    },
    like: {
      marginBottom: Margin.m_10,
    },
    locationAndAreaTextStyles: {
      fontSize: widthToDp(3),
    },
    applyBtnStyles: {
      width: '45%',
      backgroundColor: '#00BF63',
      borderRadius: widthToDp(3),
      height: widthToDp(12),
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteEditBtnContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: widthToDp(2),
    },
    backBtnStyles: {
      width: '45%',
      backgroundColor: '#FF5757',
      borderRadius: widthToDp(3),
      height: widthToDp(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    editBtn: {
      width: '45%',
      borderRadius: widthToDp(3),
      height: widthToDp(12),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00BF63',
    },
    expiryContainer: {
      backgroundColor: Color.colorWhite,
      width: widthToDp(90),
      height: widthToDp(50),
      borderRadius: widthToDp(2),
      padding: widthToDp(3),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // for Android shadow
    },
    expiryContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addImageContainer: {
      backgroundColor: Color.colorWhite,
      borderRadius: widthToDp(2),
      // padding: widthToDp(3),
      height: heightToDp(40),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // for Android shadow
    },
    addimageStyles: {
      width: '90%',
      height: '90%',
      borderRadius: 10,
    },
    expiredText: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: widthToDp(4),
    },
    expiredCancelBtn: {
      backgroundColor: Color.colorRed2,
      width: '100%',
      height: widthToDp(10),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthToDp(2),
      marginTop: widthToDp(8),
    },
    cancelText: {
      color: Color.colorWhite,
      fontWeight: 'bold',
    },
  });
  return styles;
}

export default JobDetailStyles;
