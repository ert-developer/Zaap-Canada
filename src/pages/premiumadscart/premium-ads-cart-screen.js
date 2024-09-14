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
}) => {
  const styles = premiumAdsCartStyles();

  const originalPrice =
    featuredAdsCount *
      (featuredAdsCount === 10 ? 2000 : featuredAdsCount === 5 ? 1000 : featuredAdsCount === 3 ? 600 : 200) +
    spotlightAdsCount *
      (spotlightAdsCount === 10 ? 3000 : spotlightAdsCount === 5 ? 1500 : spotlightAdsCount === 3 ? 900 : 300);

  const price =
    featuredAdsCount *
      (featuredAdsCount === 10 ? 1499 : featuredAdsCount === 5 ? 799 : featuredAdsCount === 3 ? 499 : 149) +
    spotlightAdsCount *
      (spotlightAdsCount === 10 ? 2099 : spotlightAdsCount === 5 ? 1099 : spotlightAdsCount === 3 ? 699 : 249);

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
                  'You ads now benefit from priority placement and enhanced visibility Find premium ad details in My Account'
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
                  <CustomText text={`${featuredAdsCount} ADS`} style={styles.adsCountText} />
                </View>
                <CustomText text={'='} style={styles.equalTo} />
                <View style={styles.priceContainer}>
                  <CustomText
                    text={`₹${
                      featuredAdsCount *
                      (featuredAdsCount === 10
                        ? 1499 / 10
                        : featuredAdsCount === 5
                        ? 799 / 5
                        : featuredAdsCount === 3
                        ? 499 / 3
                        : 149)
                    }`}
                    style={styles.adsAmount}
                  />
                </View>
              </View>
              <View style={styles.increaseBtnContainer}>
                <TouchableOpacity onPress={() => onDecreaseAdsCount('featured', featuredAdsCount)}>
                  <CustomText text={'-'} style={styles.minusIcon} />
                </TouchableOpacity>
                <CustomText text={featuredAdsCount} />
                <TouchableOpacity onPress={() => onIncreaseAdsCount('featured', featuredAdsCount)}>
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
                  <CustomText text={`${spotlightAdsCount} ADS`} style={styles.adsCountText} />
                </View>
                <CustomText text={'='} style={styles.equalTo} />
                <View style={styles.priceContainer}>
                  <CustomText
                    text={`₹${
                      spotlightAdsCount *
                      (spotlightAdsCount === 10
                        ? 2099 / 10
                        : spotlightAdsCount === 5
                        ? 1099 / 5
                        : spotlightAdsCount === 3
                        ? 699 / 3
                        : 249)
                    }`}
                    style={styles.adsAmount}
                  />
                </View>
              </View>
              <View style={styles.increaseBtnContainer}>
                <TouchableOpacity onPress={() => onDecreaseAdsCount('spotlight', spotlightAdsCount)}>
                  <CustomText text={'-'} style={styles.minusIcon} />
                </TouchableOpacity>
                <CustomText text={spotlightAdsCount} />
                <TouchableOpacity onPress={() => onIncreaseAdsCount('spotlight', spotlightAdsCount)}>
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
                <CustomText text={`₹${originalPrice}`} style={styles.cashText} />
              </View>
              <View style={styles.amountAndDiscountContainer}>
                <CustomText text={'Discount'} style={styles.priceText} />
                <CustomText text={`₹${discount}`} style={styles.cashText} />
              </View>
            </View>
            <View style={styles.totalAmountContainer}>
              <CustomText text={'Total'} style={styles.totalText} />
              <CustomText text={`₹${originalPrice - discount}`} style={styles.totalAmount} />
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
