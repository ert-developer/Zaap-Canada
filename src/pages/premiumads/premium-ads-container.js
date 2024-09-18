import {useEffect, useState} from 'react';
import PremiumAdsScreen from './premium-ads-screen';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';

const PremiumAdsContainer = () => {
  const [isSpotlightOrFeatured, setIsSpotlightOrFeatured] = useState(true);
  const [premiumAdsDataList, setPremiumAdsDataList] = useState({});
  const user = useSelector(state => state.Auth.user);
  const loginUserId = user.userId;

  const getPremiumAdsData = async () => {
    try {
      const docRef = firestore().collection(envConfig.Premium_ads).doc(loginUserId);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        const premiumAdsData = docSnapshot.data();

        setPremiumAdsDataList(premiumAdsData);
        return premiumAdsData;
      } else {
        // setFeaturedAdsCount(0);
        // setSpotlightAdsCount(0);
        console.log('Premium ads document does not exist for user:', loginUserId);
        return null; // or return some default value as needed
      }
    } catch (error) {
      console.error('Error getting premium ads data:', error);
      return null; // or handle error accordingly
    }
  };

  useEffect(() => {
    getPremiumAdsData();
  }, []);

  return (
    <PremiumAdsScreen
      isSpotlightOrFeatured={isSpotlightOrFeatured}
      setIsSpotlightOrFeatured={setIsSpotlightOrFeatured}
      // featuredAdsCount={featuredAdsCount}
      // spotlightAdsCount={spotlightAdsCount}
      premiumAdsDataList={premiumAdsDataList}
    />
  );
};

export default PremiumAdsContainer;
