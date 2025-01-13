import React, {useState, useMemo} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';
import {check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import {View, SafeAreaView, StatusBar, Alert, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import CustomLoader from '../../organisms/customLoader';
import LocationStyles from './location-styles';
import {latLang} from '../../redux/location/action';
import {envConfig} from '../../assets/helpers/envApi';
import CustomText from '../../atoms/text/textComponent';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import {Live} from '../../assets/svgImage/home';
import {CurrentLocationsvg} from '../../assets/svgImage/home';
import {heightToDp} from '../../responsive/responsive';

Geocoding.init(`${envConfig.GOOGLE_API_KEY}`);

const LocationScreen = ({backNavigation, navigation}) => {
  const styles = useMemo(() => LocationStyles(), []);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCurrentLocation = async () => {
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      });

      if (!permission) {
        Alert.alert('Error', 'Platform not supported');
        return;
      }

      const status = await check(permission);

      if (status === RESULTS.DENIED) {
        // Request permission if not granted yet
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          showPermissionAlert();
        }
      } else if (status === RESULTS.BLOCKED || status === RESULTS.LIMITED) {
        // Permission is blocked or limited
        showPermissionAlert();
      } else if (status === RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true); // Start loading
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        Geocoding.from(latitude, longitude)
          .then(response => {
            const result = response.results[0];
            const addressComponents = result?.address_components || [];
            const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
            const country = addressComponents.find(comp => comp.types.includes('country'))?.short_name || '';

            setSelectedLocation({city, countryCode: country});
            dispatch(latLang({latitude, longitude}));
          })
          .catch(error => console.error('Reverse geocoding error:', error))
          .finally(() => setLoading(false));
      },
      error => {
        console.error('Geolocation error:', error);
        setLoading(false);
        Alert.alert('Error', 'Unable to fetch your location. Please try again.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Location Permission Required',
      'Location access is required to use this feature. Please enable it in settings.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open Settings',
          onPress: () => openSettings(),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={[styles.header, styles.row]}>
          <BackIcon onPress={backNavigation} />
          <CustomText text="Select Location" style={styles.titleText} />
        </View>
        <View>
          <GooglePlacesAutocomplete
            debounce={300}
            placeholder="Search for street, city name.."
            onPress={(data, details = null) => {
              const {lat, lng} = details?.geometry?.location;
              if (lat && lng) {
                setLoading(true);
                Geocoding.from(lat, lng)
                  .then(response => {
                    const result = response.results[0];
                    const addressComponents = result?.address_components || [];
                    const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
                    const country = addressComponents.find(comp => comp.types.includes('country'))?.short_name || '';

                    setSelectedLocation({city, countryCode: country});
                    dispatch(latLang({latitude: lat, longitude: lng}));
                  })
                  .catch(error => console.error('Reverse geocoding error:', error))
                  .finally(() => setLoading(false));
              }
            }}
            query={{key: `${envConfig.GOOGLE_API_KEY}`}}
            fetchDetails={true}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            inbetweenCompo={
              <CustomTouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
                onPress={handleCurrentLocation}>
                <CurrentLocationsvg />
                <CustomText text="Current Location" style={{color: '#5A2DAF'}} />
              </CustomTouchableOpacity>
            }
            styles={{
              container: {flex: 0},
              description: {color: '#000', fontSize: 16},
              predefinedPlacesDescription: {color: '#3caf50'},
            }}
            renderLeftButton={() => (
              <View style={{marginTop: heightToDp(2)}}>
                <Live />
              </View>
            )}
          />
        </View>
        <CustomLoader visible={loading} />
        {selectedLocation && navigation.navigate('HomeScreen', {selectedLocation})}
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;
