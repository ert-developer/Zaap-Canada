import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, AppState, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import {PERMISSIONS, RESULTS, check, openSettings, request} from 'react-native-permissions';
import {useSelector} from 'react-redux';

const NearMeScreen = () => {
  const defaultIndiaRegion = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 25.0,
    longitudeDelta: 25.0,
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [loader, setLoader] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const latlang = useSelector(state => state?.location?.latlang);

  const {jobs} = useSelector(state => state.home);
  const [region, setRegion] = useState({
    latitude: latlang?.latitude ?? defaultIndiaRegion.latitude,
    longitude: latlang?.longitude ?? defaultIndiaRegion.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (latlang) {
      setRegion({
        latitude: latlang.latitude,
        longitude: latlang.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [latlang]);
  const navigation = useNavigation();

  const checkLocationPermission = async () => {
    try {
      const permissionType =
        Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const permissionResult = await check(permissionType);

      if (permissionResult === RESULTS.GRANTED) {
        setHasPermission(true);
      } else if (permissionResult === RESULTS.DENIED) {
        setHasPermission(false);
        const requestResult = await request(permissionType);
        setHasPermission(requestResult === RESULTS.GRANTED);
      } else if (permissionResult === RESULTS.BLOCKED) {
        setHasPermission(false);
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    const recheckPermissionOnAppStateChange = nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground
        checkLocationPermission();
      }
      setAppState(nextAppState);
    };
    checkLocationPermission();

    const appStateListener = AppState.addEventListener('change', recheckPermissionOnAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, [appState]);

  const handleEnableLocation = () => {
    openSettings();
  };

  const navigatetoLocation = () => {
    navigation.navigate('nearMe');
  };

  return (
    <View style={styles.container}>
      {loader && <ActivityIndicator size={20} color="black" />}
      {hasPermission === false && (
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dzxemuctv/image/upload/v1705930365/WhatsApp_Image_2024-01-22_at_18.57.51_bbf04358_cah8kj.jpg',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.text}>Location Access</Text>
          <Text style={styles.subtext}>Grant location access for a better and personalized app experience</Text>
          <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
            <Text style={styles.enableButtonText}>ENABLE LOCATION</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigatetoLocation}>
            <Text style={styles.manualText}>Select Manually</Text>
          </TouchableOpacity>
        </View>
      )}
      {hasPermission === true && (
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          minZoomLevel={5}
          maxZoomLevel={13}
          zoomControlEnabled
          scrollEnabled
          pitchEnabled
          showsUserLocation>
          {jobs.map((item, index) => {
            const jobCoordinates = {
              latitude: item.area.lat,
              longitude: item.area.lng,
            };

            const jobsInArea = jobs.filter(job => job.area.lat === item.area.lat && job.area.lng === item.area.lng);

            const numberOfJobsInArea = jobsInArea.length;

            return (
              <Marker key={index} coordinate={jobCoordinates} pinColor="#464183">
                <Callout onPress={() => navigation.navigate('nearmejobs', jobsInArea)}>
                  <View style={styles.tooltipContainer}>
                    <Text style={styles.jobTitle}>{`${numberOfJobsInArea} ${
                      numberOfJobsInArea === 1 ? 'job' : 'jobs'
                    } available`}</Text>
                    <Text style={styles.jobSubtitle}>in this region</Text>
                    <Text style={styles.viewDetailsText}>View details</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      )}
    </View>
  );
};

export default NearMeScreen;

// (Styles remain the same as before)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '80%',
    marginBottom: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    bottom: 10,
    left: 10,
    color: '#473369',
    alignSelf: 'center',
    width: '60%',
    marginLeft: '16%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    bottom: 10,
    left: 10,
    color: 'gray',
    alignSelf: 'center',
    width: '60%',
    marginTop: 10,
  },
  enableButton: {
    marginTop: 10,
    backgroundColor: '#77a35d',
    borderRadius: 40,
    width: '57%',
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  enableButtonText: {
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  manualText: {
    bottom: 10,
    color: 'black',
    alignSelf: 'center',
    width: '60%',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontWeight: '800',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tooltipContainer: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTitle: {
    color: '#473369',
    fontSize: 14,
    fontWeight: 'bold',
  },
  jobSubtitle: {
    color: '#473369',
    fontSize: 12,
  },
  viewDetailsText: {
    color: '#473369',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
