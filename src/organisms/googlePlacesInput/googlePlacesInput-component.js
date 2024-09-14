import React, {useState, useCallback, memo, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Color, FontSize, Border, Padding, Margin} from '../../assets/static/globalStyles';
import Geolocation from 'react-native-geolocation-service';
import {envConfig} from '../../assets/helpers/envApi';
navigator.geolocation = require('react-native-geolocation-service');

const GooglePlacesInput = ({value, onHandleChange, field, placeholder, formErrors}) => {
  const [search, setSearch] = useState('');
  const [clear, setClear] = useState(false);

  // useEffect(() => {
  //   setSearch(value);
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log('CURRENT LOCATION - ', position);
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, [value]);

  const handlePlaceSelect = (data, details) => {
    // 'details' is provided when fetchDetails = true
    console.log('Selected place:', data);
    console.log('Details:', details);
    if (data.description) {
      const location = {
        description: data.description,
        location: details.geometry.location,
      };
      onHandleChange(location);
    }
  };

  // const handleCurrentLocationPress = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log('CURRENT LOCATION - ', position);

  //       // Use the obtained position data as the current location
  //       const currentLocation = {
  //         description: 'Current Location',
  //         geometry: {
  //           location: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //         },
  //       };
  //       console.log('Current Location Details:', currentLocation);

  //       // Update the state to automatically set the current location in the autocomplete component
  //       setSearch(''); // Clear the current search term
  //       onHandleChange(currentLocation);
  //     },
  //     error => {
  //       console.log('Error getting current location:', error.code, error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  //   );
  // };

  const clearInput = () => {
    setSearch('');
    setClear(true);
    onHandleChange(null);
  };
  const hasError = formErrors[field];
  const inputStyle = hasError ? [styles.input, styles.inputErrorStyles] : [styles.input];

  return (
    <View>
      <GooglePlacesAutocomplete
        returnKeyType={'default'}
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        minLength={2}
        numberOfLines={2}
        isRowScrollable={true}
        // handleCurrentLocationPress={handleCurrentLocationPress}
        textInputProps={{
          placeholder: placeholder,
          placeholderTextColor: Color.colorSilver,
          returnKeyType: 'search',
          onChangeText: text => {
            if (clear) {
              setClear(true);
            } else {
              setSearch(text);
            }
          },
          // fontFamily: font.opensans,
          // onChange: handleLocation,
        }}
        value={search ? search : ''}
        onPress={handlePlaceSelect}
        query={{
          key: `${envConfig.GOOGLE_API_KEY}`,
          language: 'en',
        }}
        currentLocation={true}
        styles={{
          textInput: inputStyle,
          description: {
            color: 'red',
            fontSize: 14,
          },
          textInputContainer: {
            borderColor: 'green',
          },
        }}
        enablePoweredByContainer={false}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        listEmptyComponent={() => (
          <View style={{flex: 1}}>
            <Text>No Location Found</Text>
          </View>
        )}
        autofill={true} // Automatically fill the input with current location
      />
      {/* {search && (
        <View style={styles.clearButtonContainer}>
          <Text style={styles.clearButton} onPress={clearInput}>
            Clear
          </Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 48,
    padding: 10,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
  },
  inputErrorStyles: {
    borderColor: 'red',
    borderWidth: 1,
  },
  clearButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  clearButton: {
    color: 'blue',
  },
});
export default memo(GooglePlacesInput);
