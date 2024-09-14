// import {StyleSheet} from 'react-native';
// import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../../assets/static/globalStyles';
// import {widthToDp} from '../../../responsive/responsive';

// const styles = StyleSheet.create({
//   styleContainer: {
//     borderRadius: Border.br_10,
//     // margin: Margin.m_8,
//     // flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     flexDirection:"row",
//     alignItems:"center",
//     marginLeft:widthToDp(5),
//     // gap:10,
//     // borderWidth:1,

//   },
//   styleImage: {
//     width: widthToDp(15),
//     height: widthToDp(15),
//     borderRadius: widthToDp(15),
//     // marginBottom: Margin.m_10,
//     borderColor: Color.colorBlack,
//     borderWidth: 1.5,
//     justifyContent: 'center',
//     resizeMode: 'contain',

//  },
//   styleTitle: {
//     fontSize: FontSize.size_16,
//     fontWeight: 'bold',
//     // marginBottom: 5,
//     color: Color.colorBlack,
//     fontFamily: FontFamily.helvetica,
//     // textAlign: 'center',
//     // borderWidth:5
//   },
//   styleDesc: {
//     fontSize: FontSize.size_14,
//     color: Color.colorBlack,
//     fontFamily: FontFamily.helvetica,
//     // textAlign: 'center',
//   },
//   button: {
//     width: widthToDp(30),
//     backgroundColor: Color.colorIndigo,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: Padding.p_10,
//     borderRadius: Border.br_50,
//     marginTop: Margin.m_10,
//   },
//   text: {
//     fontFamily: FontFamily.helvetica,
//     fontSize: FontSize.size_14,
//   },
//   profileCard: {
//     marginBottom: Margin.m_16,
//   },
//   BackIcon: {
//     marginLeft: widthToDp(45),
//     flexDirection: 'row',
//     paddingHorizontal: Padding.p_16,
//     paddingVertical: Padding.p_8,
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   tabBackIcon: {
//     marginLeft: widthToDp(45),
//     flexDirection: 'row',
//     paddingHorizontal: Padding.p_16,
//     paddingVertical: Padding.p_8,
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     marginTop: Margin.m_16,
//   },
//   back: {
//     width: widthToDp(40),
//     height: widthToDp(40),
//   },
//   closeText: {
//     fontFamily: FontFamily.helvetica,
//     fontWeight: '400',
//     fontSize: FontSize.size_16,
//     color: Color.colorBlack,
//     position: 'absolute',
//     right: 10,
//   },
//   tabClose: {
//     fontFamily: FontFamily.helvetica,
//     fontWeight: '400',
//     fontSize: FontSize.size_24,
//     color: Color.colorBlack,
//   },
//   zaapLogo: {
//     marginLeft: widthToDp(30),
//   },
//   providerIcon: {
//     width: 24,
//     height: 24,
//   },
//   providerLabel: {
//     width: widthToDp(60),
//     textAlign: 'center',
//     backgroundColor: Color.colorIndigo,
//     padding: Padding.p_10,
//     color: Color.colorWhite,
//     borderRadius: Border.br_8,
//     fontWeight: 'bold',
//   },
//   header: {
//     width: widthToDp(40),
//     height: widthToDp(10),
//     flexDirection: 'row',
//   },
//   hamberger: {
//     marginTop: Margin.m_20,
//     marginLeft: Margin.m_20,
//   },
//   tabDrawer: {
//     width: '50%',
//   },
//   drawerWidth: {
//     width: '30%',
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   verifyContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   verifyText: {fontFamily: FontFamily.helvetica, color: 'green'},
// });

// export default styles;

import {StyleSheet} from 'react-native';
import {widthToDp, heightToDp} from '../../../responsive/responsive';
// import {Color, Margin, Padding} from '../../../assets/static/globalStyles';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../../assets/static/globalStyles';

export const drawerStyles = () => {
  const styles = StyleSheet.create({
    styleContainer: {
      // borderRadius: Border.br_8,
      // margin: Margin.m_8,
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      // marginLeft:widthToDp(5),
      // gap:10,
      // borderWidth:1,
    },
    inProgressText: {
      fontSize: FontSize.size_10,
      color: Color.colorIndigo,
      margin: 0,
    },
    styleImage: {
      width: widthToDp(13),
      height: widthToDp(13),
      borderRadius: widthToDp(15),
      // marginBottom: Margin.m_10,
      borderColor: Color.colorBlack,
      borderWidth: 1.5,
      justifyContent: 'center',
      resizeMode: 'contain',
      marginRight: Margin.m_10,
    },
    userProfileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: 'grey',
      borderStyle: 'solid',
      borderRadius: widthToDp(1),
      padding: Padding.p_10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      // shadowOpacity: 0.2,
      // shadowRadius: 1.41,
      // elevation: 2,
    },
    styleTitle: {
      fontSize: FontSize.size_18,
      fontWeight: 'bold',
      // marginBottom: 5,
      color: Color.colorIndigo2,
      fontFamily: FontFamily.helvetica,
      // textAlign: 'center',
      // borderWidth:5
    },
    styleDesc: {
      fontSize: FontSize.size_14,
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      // textAlign: 'center',
    },
    button: {
      width: widthToDp(30),
      backgroundColor: Color.colorIndigo,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Padding.p_10,
      borderRadius: Border.br_50,
      marginTop: Margin.m_10,
    },
    text: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_14,
    },
    profileCard: {
      marginBottom: Margin.m_16,
    },
    BackIcon: {
      marginLeft: widthToDp(45),
      flexDirection: 'row',
      paddingHorizontal: Padding.p_16,
      paddingVertical: Padding.p_8,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    versionContainer: {
      marginTop: 'auto',
      padding: 10,
    },
    versionText: {
      color: Color.colorSilver,
      fontSize: 16,
      marginTop: 30,
      fontWeight: '600',
    },
    versionTextSP: {
      color: Color.colorSilver,
      fontSize: 16,
      padding: 10,
      fontWeight: '600',
    },
    versionContainerSP: {
      marginTop: 'auto',
      padding: 10,
    },
    tabBackIcon: {
      marginLeft: widthToDp(45),
      flexDirection: 'row',
      paddingHorizontal: Padding.p_16,
      paddingVertical: Padding.p_8,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginTop: Margin.m_16,
    },
    back: {
      alignSelf: 'flex-end',
      top: 55,
    },
    closeText: {
      fontFamily: FontFamily.helvetica,
      fontWeight: '400',
      fontSize: FontSize.size_16,
      color: Color.colorBlack,
      position: 'absolute',
      right: 10,
    },
    tabClose: {
      fontFamily: FontFamily.helvetica,
      fontWeight: '400',
      fontSize: FontSize.size_24,
      color: Color.colorBlack,
    },
    zaapLogo: {
      marginLeft: widthToDp(30),
    },
    providerIcon: {
      width: 24,
      height: 24,
    },
    providerLabel: {
      // width: widthToDp(70),
      textAlign: 'center',
      backgroundColor: Color.colorIndigo2,
      padding: Padding.p_10,
      color: Color.colorWhite,
      borderRadius: Border.br_8,
      fontWeight: 'bold',
      // marginLeft: 6,
      marginTop: widthToDp(4),
    },
    providerLabelDisabled: {
      // width: widthToDp(70),
      textAlign: 'center',
      backgroundColor: Color.colorSilver,
      padding: Padding.p_10,
      color: Color.colorWhite,
      borderRadius: Border.br_8,
      fontWeight: 'bold',
      // marginLeft: 6,
      marginTop: widthToDp(4),
    },
    header: {
      width: widthToDp(40),
      height: widthToDp(10),
      flexDirection: 'row',
    },
    hamberger: {
      marginTop: Margin.m_20,
      marginLeft: Margin.m_20,
    },
    tabDrawer: {
      width: '50%',
    },
    drawerWidth: {
      width: '30%',
    },
    row: {
      flexDirection: 'row',
    },
    verifyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    verifyText: {fontFamily: FontFamily.helvetica, color: 'green'},
    label: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: 'black',
      marginLeft: -2,
      fontWeight: 'bold',
    },
    label2: {
      color: Color.colorIndigo2,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      marginLeft: -2,
      fontWeight: 'bold',
    },
    logoutAndDarkCon: {
      marginTop: heightToDp(42),
    },
    customerLogoutAndDarkCon: {
      marginTop: heightToDp(28),
    },
    verifiedTextCon: {
      flexDirection: 'row',
    },
    rightTick: {margin: widthToDp(0.5)},
    verificationText: {fontWeight: '700', color: 'green'},
    serviceProvidertext: {
      fontWeight: '700',
    },
    backBtnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backBtnText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
      marginLeft: widthToDp(3),
      fontSize: widthToDp(5),
    },
  });
  return styles;
};
