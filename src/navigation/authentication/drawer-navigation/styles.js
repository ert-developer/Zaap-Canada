import {StyleSheet} from 'react-native';
import {widthToDp, heightToDp} from '../../../responsive/responsive';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../../assets/static/globalStyles';

export const drawerStyles = () => {
  const styles = StyleSheet.create({
    inProgressText: {
      fontSize: FontSize.size_10,
      color: Color.colorIndigo,
      margin: 0,
    },
    styleImage: {
      width: widthToDp(13),
      height: widthToDp(13),
      borderRadius: widthToDp(15),
      borderColor: Color.colorBlack,
      borderWidth: 1.5,
      justifyContent: 'center',
      resizeMode: 'cover',
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
    },
    styleTitle: {
      fontSize: FontSize.size_18,
      fontWeight: 'bold',
      color: Color.colorIndigo2,
      fontFamily: FontFamily.helvetica,
    },
    styleDesc: {
      fontSize: FontSize.size_14,
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
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
    providerLabel: {
      textAlign: 'center',
      backgroundColor: Color.colorIndigo2,
      padding: Padding.p_10,
      color: Color.colorWhite,
      borderRadius: Border.br_8,
      fontWeight: 'bold',
      marginTop: widthToDp(4),
    },
    providerLabelDisabled: {
      textAlign: 'center',
      backgroundColor: Color.colorSilver,
      padding: Padding.p_10,
      color: Color.colorWhite,
      borderRadius: Border.br_8,
      fontWeight: 'bold',
      marginTop: widthToDp(4),
    },
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
