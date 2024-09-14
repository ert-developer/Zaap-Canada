import React, {useState, useCallback, memo, useEffect, useMemo} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Color, FontSize, Border, Padding, Margin} from '../../assets/static/globalStyles';
import Geolocation from 'react-native-geolocation-service';
import CustomText from '../../atoms/text/textComponent';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import {Live} from '../../assets/svgImage/home';
import {CurrentLocationsvg} from '../../assets/svgImage/home';
import Geocoding from 'react-native-geocoding';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {View, ScrollView, SafeAreaView, StatusBar, TextInput, Alert} from 'react-native';
import NearMeStyles from './location-styles';
import LocationStyles from './location-styles';
import {latLang} from '../../redux/location/action';
navigator.geolocation = require('react-native-geolocation-service');
import {useDispatch} from 'react-redux';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import {heightToDp} from '../../responsive/responsive';
import CustomLoader from '../../organisms/customLoader';
import {envConfig} from '../../assets/helpers/envApi';

Geocoding.init(`${envConfig.GOOGLE_API_KEY}`);

const LocationScreen = ({backNavigation, navigation}) => {
  const styles = useMemo(() => LocationStyles(), []);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  console.log('selectedLocation-nearMe', selectedLocation);

  const handleCurrentLocation = () => {
    setLoading(true); // Start loading

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        // Use reverse geocoding to get city and country code
        Geocoding.from(latitude, longitude)
          .then(response => {
            const result = response.results[0];
            const addressComponents = result?.address_components || [];
            const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
            const country = addressComponents.find(comp => comp.types.includes('country'))?.short_name || '';

            // Set the state with the extracted information
            setSelectedLocation({
              city,
              countryCode: country,
            });

            // Dispatch the location to the Redux store
            dispatch(latLang({latitude, longitude}));
          })
          .catch(error => {
            console.error('Error in reverse geocoding:', error);
          })
          .finally(() => {
            setLoading(false); // Stop loading
          });
      },
      error => {
        console.error('Error getting current location:', error);
        setLoading(false); // Stop loading on error
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // useEffect(() => {
  //   // Request location permission or handle it as needed
  //   // ...

  //   // For demonstration purposes, get the current location initially
  //   handleCurrentLocation();
  // }, []);

  return (
    <SafeAreaView style={[styles.safeArea]}>
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
            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            onPress={(data, details = null) => {
              // console.log('**************data', data);
              // console.log('*************details', details);
              // console.log('data.....', details?.geometry?.location);
              const {lat, lng} = details?.geometry?.location;
              dispatch(latLang({latitude: lat, longitude: lng}));
              if (lat && lng) {
                setLoading(true); // Start loading

                // Use reverse geocoding to get more detailed information
                Geocoding.from(lat, lng)
                  .then(response => {
                    const result = response.results[0];

                    // Extract city and country code
                    const addressComponents = result?.address_components || [];
                    const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
                    const country = addressComponents.find(comp => comp.types.includes('country'))?.short_name || '';

                    // Set the state with the extracted information
                    setSelectedLocation({
                      city,
                      countryCode: country,
                    });
                  })
                  .catch(error => {
                    console.error('Error in reverse geocoding:', error);
                  })
                  .finally(() => {
                    setLoading(false); // Stop loading
                  });
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
              container: {
                flex: 0,
              },
              description: {
                color: '#000',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#3caf50',
              },
            }}
            renderLeftButton={() => (
              <View style={{marginTop: heightToDp(2)}}>
                <Live />
              </View>
            )}
          />
        </View>
        {<CustomLoader visible={loading} />}
        {selectedLocation && navigation.navigate('HomeScreen', {selectedLocation})}
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;
