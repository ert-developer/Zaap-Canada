import {StyleSheet} from 'react-native';
import {Color, FontSize} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';

const premiumAdsStyles = () => {
  const styles = StyleSheet.create({
    premiumAdsMainContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(3),
      margin: widthToDp(2),
      backgroundColor: Color.colorWhite,
    },
    premiumAdsFirstContainer: {
      padding: widthToDp(3),
    },
    premiumAdsBtnsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: widthToDp(3),
    },
    premiumAdsBtns: {
      borderRadius: widthToDp(2),
      width: widthToDp(43),
      height: widthToDp(10),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: Color.colorSilver,
    },
    activeBtn: {
      backgroundColor: Color.colorIndigo2,
    },
    disActiveBtn: {},
    activeText: {
      color: Color.colorWhite,
    },
    disActiveText: {
      color: Color.colorIndigo2,
    },

    premiumAdBalanceHeading: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: FontSize.size_16,
    },
    availableAdsContainer: {
      flexDirection: 'row',
      marginTop: widthToDp(3),
    },
    availableAndUsedCon: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(2),
      //   paddingHorizontal: widthToDp(5),
      width: widthToDp(30),
      height: widthToDp(20),
      marginRight: widthToDp(1),
    },
    premiumAdsAvailableStatus: {
      borderBottomWidth: 1,
      overflow: 'hidden',
      borderBottomColor: Color.colorSilver,
      textAlign: 'center',
      color: Color.colorBlack,
      padding: widthToDp(0.6),
    },
    adsStatusText: {
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: FontSize.size_16,
      color: Color.colorIndigo2,
    },
    premiumAdsHeadingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: widthToDp(2),
    },
    premiumAdsHeadingText: {
      color: Color.colorIndigo2,
      fontWeight: '900',
      fontSize: FontSize.size_16,
    },
    seeExampleText: {
      color: Color.colorIndigo2,
      textDecorationColor: Color.colorIndigo2,
      textDecorationLine: 'underline',
    },
    exclusivelyText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
      fontSize: FontSize.size_12,
      marginVertical: widthToDp(3),
    },
    adsSpacificTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: widthToDp(1),
    },
    tickMarkSvg: {
      marginRight: widthToDp(2),
    },
    adsSpecificText: {
      color: Color.colorBlack,
    },
    adsAmountMainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: widthToDp(2),
    },
    adsAmountContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderRadius: widthToDp(2),
      width: widthToDp(28),
      height: widthToDp(20),
    },
    checkBoxAndAdText: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Color.colorSilver,
    },

    adsCountText: {
      color: Color.colorBlack,
    },
    adsAmountText: {
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: FontSize.size_16,
      color: Color.colorBlack,
    },
    tenAdsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: widthToDp(2),
    },
    premiumsViewCartBtn: {
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      height: widthToDp(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: widthToDp(10),
    },
    viewCartBtnText: {
      color: Color.colorWhite,
    },
    modal: {
      margin: 0,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
      borderRadius: 20, // Adjusts the image to cover the modal area
    },
    closeButton: {
      position: 'absolute',
      top: 95,
      right: 55,
      zIndex: 1, // Make sure it's above the image
    },
    closeIcon: {
      fontSize: FontSize.size_18,
      color: Color.colorRed,
      fontWeight: 'bold',
    },
    originalPriceText: {
      textDecorationLine: 'line-through',
      color: 'grey',
      fontSize: widthToDp(3),
    },
    adsAmountText: {
      fontSize: widthToDp(4),
      fontWeight: 'bold',
      color: 'green',
    },
    priceContainer: {
      flexDirection: 'column', // Arrange prices vertically
      alignItems: 'center',
      marginTop: widthToDp(1),
    },
  });

  return styles;
};

export default premiumAdsStyles;
