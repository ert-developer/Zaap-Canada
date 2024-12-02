// CurrentLocation.js

import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';
import {Alert, StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';
import {check, PERMISSIONS, request, openSettings} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {currentLocation} from '../../redux/location/action';
import {envConfig} from '../../assets/helpers/envApi';

const Loc = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    try {
      Geolocation?.getCurrentPosition(position => {
        setLocation(position.coords);
      });
    } catch (error) {
      console.log('current location', error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await Geocoding.from({latitude, longitude});
      const address = response.results[5].address_components[0].long_name;
      setLocationName(address);
      dispatch(currentLocation(address));
    } catch (error) {
      console.log(error);
    }
  };

  const checkLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (result === 'granted') {
        getCurrentLocation();
      } else {
        const permissionResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (permissionResult === 'granted') {
          checkLocationServices();
        } else {
          Alert.alert('Location permission denied');
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const checkLocationServices = async () => {
    try {
      const serviceStatus = await Geolocation.checkStatus();

      if (serviceStatus.locationServicesEnabled) {
        getCurrentLocation();
      } else {
        // Prompt user to enable location services
        openSettings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Geocoding.init(`${envConfig.GOOGLE_API_KEY}`);
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      reverseGeocode(location.latitude, location.longitude);
    }
  }, [location]);

  return null;
};
export default Loc;
const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.size_12,
    fontFamily: FontFamily.helvetica,
    color: Color.colorIndigo,
    position: 'absolute',
    right: Margin.m_10,
    bottom: Margin.m_10,
  },
});
