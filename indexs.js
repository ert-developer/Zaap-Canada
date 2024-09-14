import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const LogInContainer = ({route, navigation}) => {
  const mapViewRef = useRef(null);

  const API_KEY = `${envConfig.GOOGLE_API_KEY}`;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const updateMapView = (latitude, longitude) => {
    setCurrentLocation(prevLocation => ({
      ...prevLocation,
      latitude,
      longitude,
    }));

    mapViewRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const getCurrentPosition = (lat, lng) => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
          updateMapView(position.coords.latitude, position.coords.longitude);
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
        },
      );
    });
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          color: '#000',
        }}>
        Address
      </Text>
      <View style={{}}>
        <MapView
          ref={mapViewRef} // Assign ref to MapView
          style={{height: '80%', width: '100%'}}
          initialRegion={currentLocation}>
          <Marker title="You are here" description="This is your current location" coordinate={currentLocation} />
        </MapView>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            margin: 0,
            backgroundColor: '#fff',
            elevation: 10,
            padding: 10,
          }}>
          <View style={{display: 'flex', flex: 0.8}}>
            <TouchableOpacity
              style={{
                width: '90%',
                padding: '5%',
                alignSelf: 'center',
                borderRadius: 5,
                backgroundColor: 'orange',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => getCurrentPosition(currentLocation.latitude, currentLocation.longitude)}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Get Current Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LogInContainer;
