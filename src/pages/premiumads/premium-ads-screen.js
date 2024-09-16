import {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView, StatusBar} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import premiumAdsStyles from './premium-ads-styles';
import CustomText from '../../atoms/text/textComponent';
import {PremiumAdsHorizontalRowSVG, TickMarkSVG} from '../../assets/svgIcons/premiumads/premium-ads-screen-svgs';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import SvgComponentClose from '../../assets/svgIcons/close/close-container';
import {Color} from '../../assets/static/globalStyles';

const PremiumAdsScreen = ({isSpotlightOrFeatured, setIsSpotlightOrFeatured, premiumAdsDataList}) => {
  const styles = premiumAdsStyles();
  const navigation = useNavigation();

  const [checkedIndex, setCheckedIndex] = useState(null); // State to keep track of checked checkbox index
  const [spotLightCheckedIndex, setSpotLightCheckedIndex] = useState(null);
  // const [featuredCheckedIndex, setFeaturedCheckedIndex] = useState(null); // State to keep track of checked checkbox index for featured ads
  // const [spotlightCheckedIndex, setSpotlightCheckedIndex] = useState(null); // State to keep track of checked checkbox index for spotlight ads

  const [purchaseAdsData, setPurchaseAdsData] = useState({featuredAdsCount: 0, spotlightAdsCount: 0}); // Updated state to include both counts

  // Function to handle checkbox press
  const featuredHandleCheckboxPress = index => {
    if (checkedIndex === index) {
      // If the same checkbox is clicked again, uncheck it
      setCheckedIndex(null);
    } else {
      // Otherwise, check the new checkbox
      setCheckedIndex(index);
      const count = index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 5 : index === 3 ? 10 : 0;
      setPurchaseAdsData({...purchaseAdsData, featuredAdsCount: count}); // Update both counts
    }
  };

  const spotlightHandleCheckboxPress = index => {
    if (spotLightCheckedIndex === index) {
      setSpotLightCheckedIndex(null);
    } else {
      setSpotLightCheckedIndex(index);
      const count = index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 5 : index === 3 ? 10 : 0;
      setPurchaseAdsData({...purchaseAdsData, spotlightAdsCount: count}); // Update both counts
    }
  };

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  // Function to toggle modal visibility
  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible1);
  };

  const toggleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <HeaderComponent text={'Premium Ads'} />
        <View style={styles.premiumAdsMainContainer}>
          <View style={styles.premiumAdsFirstContainer}>
            <View style={styles.premiumAdsBtnsContainer}>
              <TouchableOpacity
                style={[styles.premiumAdsBtns, isSpotlightOrFeatured ? styles.activeBtn : styles.disActiveBtn]}
                onPress={() => setIsSpotlightOrFeatured(true)}>
                <CustomText
                  text={'FEATURED'}
                  style={[isSpotlightOrFeatured ? styles.activeText : styles.disActiveText]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.premiumAdsBtns, isSpotlightOrFeatured ? styles.disActiveBtn : styles.activeBtn]}
                onPress={() => setIsSpotlightOrFeatured(false)}>
                <CustomText
                  text={'SPOTLIGHT'}
                  style={[isSpotlightOrFeatured ? styles.disActiveText : styles.activeText]}
                />
              </TouchableOpacity>
            </View>
            <CustomText
              text={`Your ${isSpotlightOrFeatured ? 'Featured' : 'Spotlight'} Ad Balance`}
              style={styles.premiumAdBalanceHeading}
            />
            <View style={styles.availableAdsContainer}>
              <View style={styles.availableAndUsedCon}>
                <CustomText text={'Available'} style={styles.premiumAdsAvailableStatus} />
                <CustomText
                  text={`${
                    isSpotlightOrFeatured
                      ? premiumAdsDataList.featuredAds
                        ? premiumAdsDataList.featuredAds
                        : 0
                      : premiumAdsDataList.spotlightAds
                      ? premiumAdsDataList.spotlightAds
                      : 0
                  }`}
                  style={styles.adsStatusText}
                />
              </View>
              {/* <View style={styles.availableAndUsedCon}>
                <CustomText text={'Used'} style={styles.premiumAdsAvailableStatus} />
                <CustomText
                  text={
                    isSpotlightOrFeatured
                      ? premiumAdsDataList.usedFeaturedAds
                        ? premiumAdsDataList.usedFeaturedAds
                        : 0
                      : premiumAdsDataList.usedSpotlightAds
                      ? premiumAdsDataList.usedSpotlightAds
                      : 0
                  }
                  style={styles.adsStatusText}
                />
              </View> */}
            </View>
          </View>
          <PremiumAdsHorizontalRowSVG />
          <Modal isVisible={isModalVisible1} onBackdropPress={toggleModal1} style={styles.modal}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/staticImages/Example_Featured.png')} style={styles.image} />
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal1}>
                <Text style={styles.closeIcon}> X </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={isModalVisible2} onBackdropPress={toggleModal2} style={styles.modal}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/staticImages/Example_Spotlight.png')} style={styles.image} />
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal2}>
                <Text style={styles.closeIcon}> X </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.premiumAdsFirstContainer}>
            <View style={styles.premiumAdsHeadingContainer}>
              <CustomText
                text={`${isSpotlightOrFeatured ? 'Featured Ads' : 'Spotlight Ads'}`}
                style={styles.premiumAdsHeadingText}
              />
              {isSpotlightOrFeatured ? (
                <TouchableOpacity onPress={toggleModal1} style={styles.openButton}>
                  <CustomText text={'See Example'} style={styles.seeExampleText} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleModal2} style={styles.openButton}>
                  <CustomText text={'See Example'} style={styles.seeExampleText} />
                </TouchableOpacity>
              )}
            </View>
            <CustomText
              text={`${
                isSpotlightOrFeatured
                  ? 'Will stand out at the top of the chosen category'
                  : 'Exclusively featured on the Home Screen'
              }`}
              style={styles.exclusivelyText}
            />
            <View>
              <View style={styles.adsSpacificTextContainer}>
                <TickMarkSVG style={styles.tickMarkSvg} />
                <CustomText
                  text={`${isSpotlightOrFeatured ? 'Priority Placement' : 'Prime Positioning'}`}
                  style={styles.adsSpecificText}
                />
              </View>
              <View style={styles.adsSpacificTextContainer}>
                <TickMarkSVG style={styles.tickMarkSvg} />
                <CustomText
                  text={`${isSpotlightOrFeatured ? 'More Visibility' : 'Exclusive Exposure'}`}
                  style={styles.adsSpecificText}
                />
              </View>
              <View style={styles.adsSpacificTextContainer}>
                <TickMarkSVG style={styles.tickMarkSvg} />
                <CustomText
                  text={`${isSpotlightOrFeatured ? 'Stand Out' : 'Maximum Visibility'}`}
                  style={styles.adsSpecificText}
                />
              </View>
            </View>
            {isSpotlightOrFeatured ? (
              // This is Featured Side
              <View>
                <View style={styles.adsAmountMainContainer}>
                  {[
                    {count: 1, price: 149, original: 200},
                    {count: 3, price: 499, original: 600},
                    {count: 5, price: 799, original: 1000},
                  ].map((ad, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.adsAmountContainer}
                      onPress={() => featuredHandleCheckboxPress(index)}>
                      <View style={styles.checkBoxAndAdText}>
                        <CheckBox
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          value={checkedIndex === index}
                          onValueChange={() => featuredHandleCheckboxPress(index)}
                        />
                        <CustomText text={`  ${ad.count} AD`} style={styles.adsCountText} />
                      </View>
                      <View style={styles.priceContainer}>
                        <CustomText text={`$ ${ad.original}`} style={styles.originalPriceText} />
                        <CustomText text={`$ ${ad.price}`} style={styles.adsAmountText} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.tenAdsContainer}>
                  <TouchableOpacity style={styles.adsAmountContainer} onPress={() => featuredHandleCheckboxPress(3)}>
                    <View style={styles.checkBoxAndAdText}>
                      <CheckBox
                        style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                        value={checkedIndex === 3}
                        onValueChange={() => featuredHandleCheckboxPress(3)}
                      />
                      <CustomText text={' 10 AD'} style={styles.adsCountText} />
                    </View>
                    <View style={styles.priceContainer}>
                      <CustomText text={`$ 2000`} style={styles.originalPriceText} />
                      <CustomText text={`$ 1499`} style={styles.adsAmountText} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // This is Spotlight Side
              <View>
                <View style={styles.adsAmountMainContainer}>
                  {[
                    {count: 1, price: 249, original: 300},
                    {count: 3, price: 699, original: 900},
                    {count: 5, price: 1099, original: 1500},
                  ].map((ad, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.adsAmountContainer}
                      onPress={() => spotlightHandleCheckboxPress(index)}>
                      <View style={styles.checkBoxAndAdText}>
                        <CheckBox
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          value={spotLightCheckedIndex === index}
                          onValueChange={() => spotlightHandleCheckboxPress(index)}
                        />
                        <CustomText text={`  ${ad.count} AD`} style={styles.adsCountText} />
                      </View>
                      <View style={styles.priceContainer}>
                        <CustomText text={`$ ${ad.original}`} style={styles.originalPriceText} />
                        <CustomText text={`$ ${ad.price}`} style={styles.adsAmountText} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.tenAdsContainer}>
                  <TouchableOpacity style={styles.adsAmountContainer} onPress={() => spotlightHandleCheckboxPress(3)}>
                    <View style={styles.checkBoxAndAdText}>
                      <CheckBox
                        style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                        value={spotLightCheckedIndex === 3}
                        onValueChange={() => spotlightHandleCheckboxPress(3)}
                      />
                      <CustomText text={' 10 AD'} style={styles.adsCountText} />
                    </View>
                    <View style={styles.priceContainer}>
                      <CustomText text={`$ 3000`} style={styles.originalPriceText} />
                      <CustomText text={`$ 2099`} style={styles.adsAmountText} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <TouchableOpacity
              style={styles.premiumsViewCartBtn}
              onPress={() => navigation.navigate('PremiumAdsCart', purchaseAdsData)}>
              <CustomText text={'VIEW CART'} style={styles.viewCartBtnText} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PremiumAdsScreen;
