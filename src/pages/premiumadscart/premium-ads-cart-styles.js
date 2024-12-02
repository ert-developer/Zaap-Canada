import {Color, FontSize, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const {StyleSheet} = require('react-native');

const premiumAdsCartStyles = () => {
  const styles = StyleSheet.create({
    premiumAdsMainContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      margin: widthToDp(3),
      borderRadius: widthToDp(2),
      paddingVertical: widthToDp(4),
      paddingHorizontal: widthToDp(3),
      backgroundColor: '#fff',
    },
    premiumTypeHeading: {
      fontSize: FontSize.size_18,
      color: Color.colorIndigo2,
      fontWeight: '900',
    },
    cartAdsDataContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: widthToDp(3),
      paddingBottom: widthToDp(8),
      borderBottomWidth: 1,
      borderBottomColor: Color.colorSilver,
    },
    adsCountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // borderWidth: 1,
      width: widthToDp(32),
    },
    adsCountTextBox: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(1),
      padding: widthToDp(2),
    },
    adsCountText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
    },
    equalTo: {
      color: Color.colorBlack,
    },
    adsAmount: {
      color: Color.colorBlack,
    },
    increaseBtnContainer: {
      width: widthToDp(20),
      height: widthToDp(8),
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: Color.colorSilver,
      borderRadius: widthToDp(1),
    },
    spotlightContainer: {
      marginTop: widthToDp(3),
    },
    pricingInformationContainer: {
      marginTop: widthToDp(4),
    },
    priceInformationText: {
      color: Color.colorBlack,
      fontSize: FontSize.size_16,
      fontWeight: 'bold',
    },
    amountAndDiscountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: widthToDp(1),
    },
    amountContainer: {
      marginVertical: widthToDp(2),
    },
    priceText: {
      color: Color.colorBlack,
    },
    cashText: {
      color: Color.colorBlack,
    },
    totalAmountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopColor: Color.colorSilver,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: Color.colorSilver,
      // marginTop: widthToDp(2),
      paddingVertical: widthToDp(2),
    },
    totalText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
      fontSize: FontSize.size_16,
    },
    totalAmount: {
      color: Color.colorBlack,
      fontWeight: 'bold',
      fontSize: FontSize.size_16,
    },
    payBtnContainer: {
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: widthToDp(11),
      marginTop: widthToDp(51),
    },
    payText: {
      color: Color.colorWhite,
    },
    minusIcon: {
      fontSize: FontSize.size_18,
    },
    plusIcon: {
      fontSize: FontSize.size_18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      // padding: 20,
      borderRadius: 5,
      alignItems: 'center',
      paddingVertical: 10,
    },
    modalSuccessText: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: FontSize.size_18,
    },
    modalSuccessDescriptionText: {
      FontSize: FontSize.size_10,
      color: Color.colorBlack,
      textAlign: 'center',
      paddingHorizontal: Padding.p_30,
      marginVertical: widthToDp(2),
    },
    originalPriceText: {
      textDecorationLine: 'line-through',
      color: 'grey',
      fontSize: widthToDp(3),
    },
    priceContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: widthToDp(1),
    },
  });
  return styles;
};

export default premiumAdsCartStyles;
