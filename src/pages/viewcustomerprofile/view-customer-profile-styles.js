import {StyleSheet} from 'react-native';
import {Color, FontSize, Padding} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';

const viewCustomerProfileStyles = () => {
  const styles = StyleSheet.create({
    editfalse: {
      //   flex: 1,
      padding: Padding.p_8,
      borderWidth: 0.5,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      margin: widthToDp(1),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthToDp(5),
    },
    profileIconAndTextStyle: {
      //   borderWidth: 1,
      //   borderColor: 'red',
      //   borderStyle: 'solid',

      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      width: widthToDp(40),
    },
    profileIcon: {
      marginRight: widthToDp(5),
    },
    customerNameText: {
      color: Color.colorBlack,
      fontSize: FontSize.size_16,
    },
    customerLocationText: {
      color: 'blue',
      fontWeight: '500',
    },
    customerRatingText: {
      color: Color.colorBlack,
    },
    customerPreviousJobsContainer: {
      padding: Padding.p_8,
      paddingVertical: Padding.p_16,
      borderWidth: 0.5,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      margin: widthToDp(1),
      borderRadius: widthToDp(5),
    },
    customerPreAdsBtn: {
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      padding: Padding.p_2,
      width: widthToDp(70),
      marginHorizontal: widthToDp(3),
    },
    customerOtherAddText: {
      color: Color.colorWhite,
      textAlign: 'center',
    },
    profileContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    profileImage: {
      borderColor: 'transparant',
      width: widthToDp(20),
      height: widthToDp(20),
      borderRadius: widthToDp(50),
      resizeMode: 'contain',
      alignSelf: 'center',
      resizeMode: 'contain',
      // marginVertical: Margin.m_22,
    },
    imageborder: {
      width: widthToDp(20),
      height: widthToDp(20),
      borderRadius: widthToDp(15),
      borderWidth: 1,
      borderColor: Color.colorSilver,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return styles;
};

export default viewCustomerProfileStyles;
