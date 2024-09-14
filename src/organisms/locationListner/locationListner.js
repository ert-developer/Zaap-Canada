import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import {currentLocation, latLang, permission} from '../../redux/location/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationListener = ({onPermissionGranted}) => {
  const [locationName, setLocationName] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const notificationGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );

          if (notificationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission denied');
            // return;
          }
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            // title: 'Location Permission',
            // message: 'This app needs access to your location to provide location information.',
            // buttonNeutral: 'Ask Me Later',
            // buttonNegative: 'Cancel',
            // buttonPositive: 'OK',
          });
          dispatch(permission(granted));

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setupLocationListener();
          } else {
            console.log('Location permission denied');
          }
        } else if (Platform.OS === 'ios') {
          // Implement iOS permission request here
          // You can use a library like react-native-permissions for a unified API
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    const setupLocationListener = () => {
      // Function to handle location updates
      const handleLocation = async newLocation => {
        // Do something with the new location
        dispatch(latLang({latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude}));

        // Reverse geocode to obtain location name (address)
        try {
          const response = await Geocoding.from(newLocation.coords.latitude, newLocation.coords.longitude);
          const address = response.results[5].address_components[0].long_name;
          const addressComponents = response.results[0].address_components;

          // Extract city and country code
          const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
          const country = addressComponents.find(comp => comp.types.includes('country'))?.short_name || '';

          setLocationName(address);
          // setLocationName({
          //   city,
          //   countryCode: country,
          // });
          dispatch(currentLocation(address));
        } catch (error) {
          console.error('Error getting location name:', error);
        }
      };

      // Start listening for location updates
      const watchId = Geolocation.watchPosition(
        handleLocation,
        error => {
          console.log('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 10000,
          fastestInterval: 5000,
          forceRequestLocation: true,
        },
      );

      // Clean up the location listener when the component unmounts
      return () => {
        Geolocation.clearWatch(watchId);
      };
    };

    // Check for location permissions and start the process
    requestLocationPermission();
  }, [dispatch]);

  return null;
  // (
  //   <View>
  //     {/* You can include UI elements related to location here if needed */}
  //     {locationName && <Text>Location Name: {locationName}</Text>}
  //   </View>
  // );
};

export default LocationListener;
