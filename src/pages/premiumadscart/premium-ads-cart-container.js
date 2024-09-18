import {useEffect, useState} from 'react';
import PremiumAdsCartScreen from './premium-ads-cart-screen';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import usePayment from '../../custom-hooks/payment/usePayment';
import {useNavigation} from '@react-navigation/native';
import handlePayment from '../../custom-hooks/payment/useRazorPayPayment';
import {envConfig} from '../../assets/helpers/envApi';

const PremiumAdsCartContainer = () => {
  const [featuredAdsCount, setFeaturedAdsCount] = useState(0);
  const [spotlightAdsCount, setSpotlightAdsCount] = useState(0);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const price = featuredAdsCount * 120 + spotlightAdsCount * 100;
  const discount = (price * 10) / 100;

  const user = useSelector(state => state.Auth.user);
  const userId = user.userId;

  const {handleCheckout} = usePayment();
  const navigation = useNavigation();

  const route = useRoute();
  const purchaseAdsData = route.params;

  useEffect(() => {
    setFeaturedAdsCount(purchaseAdsData.featuredAdsCount);
    setSpotlightAdsCount(purchaseAdsData.spotlightAdsCount);
  }, []);

  const onCloseSuccessModal = () => {
    setPaymentSuccessModal(false);
    navigation.navigate('HomeScreen');
  };

  const [countFeaturedChange, setFeaturedCountChange] = useState(purchaseAdsData.featuredAdsCount === 0 ? 0 : 1);
  const [countSpotlightChange, setSpotlightCountChange] = useState(purchaseAdsData.spotlightAdsCount === 0 ? 0 : 1);

  ///////////////////Decrease the Ads Count//////////////////
  const onDecreaseAdsCount = (type, count) => {
    if (type === 'featured') {
      if (count > 0) {
        setFeaturedCountChange(countFeaturedChange - 1);
      }
    } else {
      if (count > 0) {
        setSpotlightCountChange(countSpotlightChange - 1);
      }
    }
  };
  //////////////////Increase the Ads Count///////////////////
  const onIncreaseAdsCount = (type, count) => {
    if (type === 'featured') {
      setFeaturedCountChange(countFeaturedChange + 1);
    } else {
      setSpotlightCountChange(countSpotlightChange + 1);
    }
  };

  // useEffect(() => {
  //   if (spotlightAdsCount === 0) {
  //     setSpotlightCountChange(0);
  //   }
  //   if (featuredAdsCount === 0) {
  //     setFeaturedCountChange(0);
  //   }
  // }, []);

  const purchasePremiumAds = async finalAmount => {
    setLoader(true);
    try {
      if (isNaN(finalAmount) || finalAmount <= 0) {
        setLoader(false);
        Alert.alert('Empty Cart!', 'Kindly add items to your cart', [{text: 'OK'}]);
        return;
      }
      // Start payment process
      // let response = await handlePayment(parseInt(finalAmount));
      let response = await handleCheckout(parseInt(finalAmount));
      if (response && response['_documentPath']) {
        const collectionRef = firestore().collection(envConfig.Premium_ads);
        const docRef = collectionRef.doc(userId); // Use the user's ID as the document ID
        // Prepare the data to update or create the document
        const featuredFinalCount = purchaseAdsData.featuredAdsCount === 0 ? countFeaturedChange : featuredAdsCount;
        const spotlightFinalCount = purchaseAdsData.spotlightAdsCount === 0 ? countSpotlightChange : spotlightAdsCount;
        const premiumAdsData = {
          creationTime: Date.now(),
          userId: userId,
          featuredAds: firestore.FieldValue.increment(featuredFinalCount), // Increment the value
          spotlightAds: firestore.FieldValue.increment(spotlightFinalCount), // Increment the value
        };
        // Update or create the document
        await docRef.set(premiumAdsData, {merge: true});
        // Reset counts and show success modal
        setPaymentSuccessModal(true);
        setFeaturedAdsCount(0);
        setSpotlightAdsCount(0);
      } else {
        Alert.alert('Cancel', 'Canceled Payment.', [{text: 'OK'}]);
      }
    } catch (error) {
      console.error('Error purchasing premium ads:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <PremiumAdsCartScreen
      featuredAdsCount={featuredAdsCount}
      setFeaturedAdsCount={setFeaturedAdsCount}
      spotlightAdsCount={spotlightAdsCount}
      setSpotlightAdsCount={setSpotlightAdsCount}
      onDecreaseAdsCount={onDecreaseAdsCount}
      onIncreaseAdsCount={onIncreaseAdsCount}
      purchasePremiumAds={purchasePremiumAds}
      paymentSuccessModal={paymentSuccessModal}
      onCloseSuccessModal={onCloseSuccessModal}
      loader={loader}
      countFeaturedChange={countFeaturedChange}
      countSpotlightChange={countSpotlightChange}
    />
  );
};

export default PremiumAdsCartContainer;
