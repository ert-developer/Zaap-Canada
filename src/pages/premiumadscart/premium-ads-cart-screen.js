import {SafeAreaView, View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import premiumAdsCartStyles from './premium-ads-cart-styles';
import {StatusBar} from 'react-native';
import {FreeGreenTickSVG} from '../../assets/svgImage/profile';
import Modal from 'react-native-modal';
import CustomButton from '../../atoms/button/buttonComponent';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native';

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

  let originalPrice =
    countFeaturedChange *
      (featuredAdsCount === 10 ? 249.9 : featuredAdsCount === 5 ? 124.95 : featuredAdsCount === 3 ? 74.97 : 24.99) +
    countSpotlightChange *
      (spotlightAdsCount === 10 ? 399.9 : spotlightAdsCount === 5 ? 199.95 : spotlightAdsCount === 3 ? 119.97 : 39.99);

  let price =
    countFeaturedChange *
      (featuredAdsCount === 10 ? 169.99 : featuredAdsCount === 5 ? 89.99 : featuredAdsCount === 3 ? 54.99 : 19.99) +
    countSpotlightChange *
      (spotlightAdsCount === 10 ? 229.99 : spotlightAdsCount === 5 ? 129.99 : spotlightAdsCount === 3 ? 79.99 : 29.99);
  let discount = originalPrice - price;

  originalPrice = originalPrice.toFixed(2);
  price = price.toFixed(2);
  discount = discount.toFixed(2);

  return (
    <SafeAreaView>
      {paymentSuccessModal && (
        <Modal isVisible={paymentSuccessModal} onBackdropPress={onCloseSuccessModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <FreeGreenTickSVG /> */}
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/Success.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText text={'Success! Premium Ads Purchased'} style={styles.modalSuccessText} />
              <CustomText
                text={
                  'You ads now benefit from priority placement and enhanced visibility. Find premium ad details in My Account'
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
                    <CustomText text={`$${(featuredAdsCount * 24.99).toFixed(2)}`} style={styles.adsAmount} />
                  ) : (
                    <CustomText text={`$${(countFeaturedChange * 24.99).toFixed(2)}`} style={styles.adsAmount} />
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
                    <CustomText text={`$${(spotlightAdsCount * 39.99).toFixed(2)}`} style={styles.adsAmount} />
                  ) : (
                    <CustomText text={`$${(countSpotlightChange * 39.99).toFixed(2)}`} style={styles.adsAmount} />
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
              <CustomText text={`$${(originalPrice - discount).toFixed(2)}`} style={styles.totalAmount} />
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
