import PortfolioScreen from './portfolio-screen';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState, useCallback} from 'react';
import {Text} from 'react-native';
import LoadingIndicator from '../../atoms/loadingIndicator/LoadingIndicator';
import { envConfig } from '../../assets/helpers/envApi';
import {useNavigation} from '@react-navigation/native'; 

const PortfolioContainer = () => {
  const user = useSelector(state => state.Auth.user); // User details
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioDetails, setPortfolioDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const fetchPortfolio = async () => {
    setLoader(true);
    try {
      const querySnapshot = await firestore()
        .collection(envConfig.portfolio)
        .where('userId', '==', user.userId) // Corrected the where clause
        .get();

      const fetchedPortfolio = [];
      querySnapshot.forEach(documentSnapshot => {
        fetchedPortfolio.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setPortfolioDetails(fetchedPortfolio);
      setIsLoading(false);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPortfolio();
    });

    return unsubscribe;
  }, [fetchPortfolio, navigation]);

  // const onDeletePortfolio = async portfolioId => {
  //   try {
  //     await firestore().collection('portfolio_dev').doc(portfolioId).delete();
  //     fetchPortfolio();

  //     console.log(`Document with ID ${portfolioId} deleted successfully.`);
  //   } catch (error) {
  //     console.error('Error deleting document:', error);
  //   }
  // };

  const onRefresh = useCallback(() => {
    fetchPortfolio();
  });

  const onDeletePortfolio = async portfolioId => {
    try {
      const portfolioRef = firestore().collection(envConfig.portfolio);
      const snapshot = await portfolioRef.where('id', '==', portfolioId).get();

      if (snapshot.empty) {
        console.log(`No document with ID ${portfolioId} found.`);
        return;
      }

      snapshot.forEach(async doc => {
        await doc.ref.delete();
        
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });

      fetchPortfolio();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <PortfolioScreen
      portfolioDetails={portfolioDetails}
      onDeletePortfolio={onDeletePortfolio}
      onRefresh={onRefresh}
      loader={loader}
    />
  );
};

export default PortfolioContainer;
