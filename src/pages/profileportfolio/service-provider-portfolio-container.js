import {useEffect, useState} from 'react';
import ServiceProviderPortfolioScreen from './service-provider-portfolio-screen';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, View} from 'react-native';
import profilePortfolioStyles from './service-provider-portfolio-styles';
import { envConfig } from '../../assets/helpers/envApi';

const ServiceProviderPortfolioContainer = ({route}) => {
  const styles = profilePortfolioStyles();
  const {profileUserID} = route.params;

  const [portfolioDetails, setPortfolioDetails] = useState('');
  const [showPortfolioPopup, setShowPortfolioPopup] = useState(false);
  const [eachPortfolioDetails, setEachPortfolioDetails] = useState('');

  /////////////This is for fetching Portfolio Details from Firebase Collection///////////////
  const fetchPortfolio = async () => {
    try {
      const querySnapshot = await firestore().collection(envConfig.portfolio).where('userId', '==', profileUserID).get();

      const fetchedPortfolio = [];
      querySnapshot.forEach(documentSnapshot => {
        fetchedPortfolio.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setPortfolioDetails(fetchedPortfolio);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  //////This is for Show Portfolio Popup////////
  const onPressShowPortfolioDetails = item => {
    setShowPortfolioPopup(true);
    setEachPortfolioDetails(item);
  };

  return portfolioDetails === '' ? (
    <View style={styles.activityIndicatorCon}>
      <ActivityIndicator color={'black'} size="large" />
    </View>
  ) : (
    <ServiceProviderPortfolioScreen
      portfolioDetails={portfolioDetails}
      setEachPortfolioDetails={setEachPortfolioDetails}
      eachPortfolioDetails={eachPortfolioDetails}
      setPortfolioPopup={setShowPortfolioPopup}
      showPortfolioPopup={showPortfolioPopup}
      onPressShowPortfolioDetails={onPressShowPortfolioDetails}
    />
  );
};

export default ServiceProviderPortfolioContainer;
