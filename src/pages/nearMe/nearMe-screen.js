import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {check, PERMISSIONS, openSettings} from 'react-native-permissions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {widthToDp} from '../../responsive/responsive';

const NearMeScreen = () => {
  const defaultIndiaRegion = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 25.0,
    longitudeDelta: 25.0,
  };
  const [hasPermission, setHasPermission] = useState(null);
  const [loader, setLoader] = useState(false);
  const latlang = useSelector(state => state?.location?.latlang);
  const {jobs} = useSelector(state => state.home);
  const [region, setRegion] = useState(
    latlang
      ? {
          latitude: latlang.latitude,
          longitude: latlang.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      : defaultIndiaRegion,
  );
  const navigation = useNavigation();

  const checkLocationPermission = async () => {
    try {
      const permissionResult = await check(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (permissionResult === 'granted') {
        setHasPermission(true);
      } else if (permissionResult === 'denied') {
        // If the permission is denied, you might want to request it
        const requestResult = await request(
          Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (requestResult === 'granted') {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      } else if (permissionResult === 'blocked') {
        // Handle the case where permission is blocked
        setHasPermission(false);
        // Optionally guide the user to the settings
      }
    } catch (err) {
      console.warn(err);
      setHasPermission(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      checkLocationPermission();
      setLoader(false);
    }, []),
  );

  const handleEnableLocation = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('Error opening settings', error);
    }
  };

  const navigatetoLocation = () => {
    navigation.navigate('nearMe');
  };

  return (
    <View style={styles.container}>
      {loader && <ActivityIndicator size={20} color={'black'} />}
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
          minZoomLevel={5} // Minimum zoom level
          maxZoomLevel={13} // Maximum zoom level
          zoomControlEnabled={true}
          scrollEnabled={true}
          pitchEnabled={true}
          showsUserLocation>
          {jobs.map((item, index) => {
            const jobCoordinates = {
              latitude: item.area.lat,
              longitude: item.area.lng,
            };

            // Filter jobs that are in the same area
            const jobsInArea = jobs.filter(job => job.area.lat === item.area.lat && job.area.lng === item.area.lng);

            // Count the number of jobs in the area
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
    width: widthToDp(50), // Increased width
    height: widthToDp(25), // Increased height
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTitle: {
    color: '#473369',
    fontSize: widthToDp(4), // Adjusted font size
    fontWeight: 'bold',
    textAlign: 'center', // Center text
  },
  jobSubtitle: {
    color: '#473369',
    fontSize: widthToDp(3), // Adjusted font size
    textAlign: 'center', // Center text
  },
  viewDetailsText: {
    color: '#473369',
    fontWeight: 'bold',
    fontSize: widthToDp(4), // Adjusted font size
    textDecorationLine: 'underline',
    textDecorationColor: '#473369',
    textAlign: 'center', // Center text
  },
});
