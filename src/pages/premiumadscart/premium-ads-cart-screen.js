import {SafeAreaView, View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import premiumAdsCartStyles from './premium-ads-cart-styles';
import {StatusBar} from 'react-native';
import {FreeGreenTickSVG} from '../../assets/svgImage/profile';
import Modal from 'react-native-modal';
import CustomButton from '../../atoms/button/buttonComponent';
import FastImage from 'react-native-fast-image';

const PremiumAdsCartScreen = ({
  featuredAdsCount,
  onDecreaseAdsCount,
  spotlightAdsCount,
  onIncreaseAdsCount,
  purchasePremiumAds,
  paymentSuccessModal,
  onCloseSuccessModal,
  loader,
  countFeaturedChange,
  countSpotlightChange,
}) => {
  const styles = premiumAdsCartStyles();

  const originalPrice =
    countFeaturedChange *
      (featuredAdsCount === 10 ? 249 : featuredAdsCount === 5 ? 124 : featuredAdsCount === 3 ? 74 : 24) +
    countSpotlightChange *
      (spotlightAdsCount === 10 ? 399 : spotlightAdsCount === 5 ? 199 : spotlightAdsCount === 3 ? 119 : 39);

  const price =
    countFeaturedChange *
      (featuredAdsCount === 10 ? 169 : featuredAdsCount === 5 ? 89 : featuredAdsCount === 3 ? 54 : 19) +
    countSpotlightChange *
      (spotlightAdsCount === 10 ? 229 : spotlightAdsCount === 5 ? 129 : spotlightAdsCount === 3 ? 79 : 29);
  const discount = originalPrice - price;

  return (
    <SafeAreaView>
      {paymentSuccessModal && (
        <Modal isVisible={paymentSuccessModal} onBackdropPress={onCloseSuccessModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <FreeGreenTickSVG /> */}
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/Success.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText text={'Success! Premium Ads Purchased'} style={styles.modalSuccessText} />
              <CustomText
                text={
                  'You ads now benefit from priority placement and enhanced visibility.\n Find premium ad details in My Account'
                }
                style={styles.modalSuccessDescriptionText}
              />
            </View>
          </View>
        </Modal>
      )}
      <StatusBar barStyle="light-content" />
      <HeaderComponent text={'Your Cart'} />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.premiumAdsMainContainer}>
          <View>
            <CustomText text={'Feature Ads'} style={styles.premiumTypeHeading} />
            <View style={styles.cartAdsDataContainer}>
              <View style={styles.adsCountContainer}>
                <View style={styles.adsCountTextBox}>
                  {featuredAdsCount !== 0 ? (
                    <CustomText text={`${featuredAdsCount} ADS`} style={styles.adsCountText} />
                  ) : (
                    <CustomText text={`${countFeaturedChange} ADS`} style={styles.adsCountText} />
                  )}
                </View>
                <CustomText text={'='} style={styles.equalTo} />
                <View style={styles.priceContainer}>
                  {featuredAdsCount !== 0 ? (
                    <CustomText text={`$${featuredAdsCount * 19.99}`} style={styles.adsAmount} />
                  ) : (
                    <CustomText text={`$${countFeaturedChange * 19.99}`} style={styles.adsAmount} />
                  )}
                </View>
              </View>
              <View style={styles.increaseBtnContainer}>
                <TouchableOpacity onPress={() => onDecreaseAdsCount('featured', countFeaturedChange)}>
                  <CustomText text={'-'} style={styles.minusIcon} />
                </TouchableOpacity>
                <CustomText text={countFeaturedChange} />
                <TouchableOpacity onPress={() => onIncreaseAdsCount('featured', countFeaturedChange)}>
                  <CustomText text={'+'} style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.spotlightContainer}>
            <CustomText text={'Spotlight Ads'} style={styles.premiumTypeHeading} />
            <View style={styles.cartAdsDataContainer}>
              <View style={styles.adsCountContainer}>
                <View style={styles.adsCountTextBox}>
                  {spotlightAdsCount !== 0 ? (
                    <CustomText text={`${spotlightAdsCount} ADS`} style={styles.adsCountText} />
                  ) : (
                    <CustomText text={`${countSpotlightChange} ADS`} style={styles.adsCountText} />
                  )}
                </View>
                <CustomText text={'='} style={styles.equalTo} />
                <View style={styles.priceContainer}>
                  {spotlightAdsCount !== 0 ? (
                    <CustomText text={`$${spotlightAdsCount * 19.99}`} style={styles.adsAmount} />
                  ) : (
                    <CustomText text={`$${countSpotlightChange * 19.99}`} style={styles.adsAmount} />
                  )}
                </View>
              </View>
              <View style={styles.increaseBtnContainer}>
                <TouchableOpacity onPress={() => onDecreaseAdsCount('spotlight', countSpotlightChange)}>
                  <CustomText text={'-'} style={styles.minusIcon} />
                </TouchableOpacity>
                <CustomText text={countSpotlightChange} />
                <TouchableOpacity onPress={() => onIncreaseAdsCount('spotlight', countSpotlightChange)}>
                  <CustomText text={'+'} style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.pricingInformationContainer}>
            <CustomText text={'Pricing Information'} style={styles.priceInformationText} />
            <View style={styles.amountContainer}>
              <View style={styles.amountAndDiscountContainer}>
                <CustomText text={'Original Price'} style={styles.priceText} />
                <CustomText text={`$${originalPrice}`} style={styles.cashText} />
              </View>
              <View style={styles.amountAndDiscountContainer}>
                <CustomText text={'Discount'} style={styles.priceText} />
                <CustomText text={`$${discount}`} style={styles.cashText} />
              </View>
            </View>
            <View style={styles.totalAmountContainer}>
              <CustomText text={'Total'} style={styles.totalText} />
              <CustomText text={`$${originalPrice - discount}`} style={styles.totalAmount} />
            </View>
          </View>
          <CustomButton
            title={
              loader ? (
                <ActivityIndicator size={30} color={'white'} style={{justifyContent: 'center', alignItems: 'center'}} />
              ) : (
                'PAY'
              )
            }
            style={styles.payBtnContainer}
            onPress={() => purchasePremiumAds(originalPrice - discount)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PremiumAdsCartScreen;
