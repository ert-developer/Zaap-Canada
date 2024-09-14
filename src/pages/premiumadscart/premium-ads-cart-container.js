import {useEffect, useState} from 'react';
import PremiumAdsCartScreen from './premium-ads-cart-screen';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import usePayment from '../../custom-hooks/payment/usePayment';
import {useNavigation} from '@react-navigation/native';
import handlePayment from '../../custom-hooks/payment/useRazorPayPayment';
import { envConfig } from '../../assets/helpers/envApi';

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

  ///////////////////Decrease the Ads Count//////////////////
  const onDecreaseAdsCount = (type, count) => {
    if (type === 'featured') {
      if (count > 0) {
        setFeaturedAdsCount(featuredAdsCount - 1);
      }
    } else {
      if (count > 0) {
        setSpotlightAdsCount(spotlightAdsCount - 1);
      }
    }
  };
  //////////////////Increase the Ads Count///////////////////
  const onIncreaseAdsCount = (type, count) => {
    if (type === 'featured') {
      setFeaturedAdsCount(featuredAdsCount + 1);
    } else {
      setSpotlightAdsCount(spotlightAdsCount + 1);
    }
  };

  const purchasePremiumAds = async finalAmount => {
    setLoader(true);
    try {
      // Start payment process
      let response = await handlePayment(parseInt(finalAmount));

      if (response && response.result.status === 'success') {
        const collectionRef = firestore().collection(envConfig.Premium_ads);
        const docRef = collectionRef.doc(userId); // Use the user's ID as the document ID

        // Prepare the data to update or create the document
        const premiumAdsData = {
          creationTime: Date.now(),
          userId: userId,
          featuredAds: firestore.FieldValue.increment(featuredAdsCount), // Increment the value
          spotlightAds: firestore.FieldValue.increment(spotlightAdsCount), // Increment the value
        };

        // Update or create the document
        await docRef.set(premiumAdsData, {merge: true});

        // Reset counts and show success modal
        setPaymentSuccessModal(true);
        setFeaturedAdsCount(0);
        setSpotlightAdsCount(0);
        console.log('Premium ads document processed for user:', userId);
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
    />
  );
};

export default PremiumAdsCartContainer;
