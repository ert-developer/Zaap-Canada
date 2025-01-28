import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import NavigationStack from './src/navigation/authentication/navigation';
import {StripeProvider} from '@stripe/stripe-react-native';
import {Provider} from 'react-redux';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './src/redux/store/store';
import CurrentLocation from './src/organisms/currentLocation/currentLocation';
import LocationListener from './src/organisms/locationListner/locationListner';
import Geocoding from 'react-native-geocoding';
import PremiumAdsContainer from './src/pages/premiumads/premium-ads-container';
import {envConfig} from './src/assets/helpers/envApi';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        SplashScreen?.hide(); // Hide splash screen after 5 seconds
      }, 5000);
    }
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  useEffect(() => {
    // Initialize Geocoding library
    Geocoding?.init(`${envConfig.GOOGLE_API_KEY}`);
    // You may also want to check other global configurations or perform other app-level setup here.
  }, []);
  return (
    <StripeProvider publishableKey={envConfig.STRIPE_API_KEY}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={{flex: 1}}>
              <NavigationStack />
              {/* <CurrentLocation /> */}
              <LocationListener />
            </SafeAreaView>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
