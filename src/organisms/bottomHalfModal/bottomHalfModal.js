import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, AppState} from 'react-native';
import {LocationDeny} from '../../assets/svgImage/home';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import {Border, Color, FontFamily, FontSize} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {check, PERMISSIONS, request, openSettings} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Geolocation from 'react-native-geolocation-service';
import {permission} from '../../redux/location/action';
import {useDispatch, useSelector} from 'react-redux';

function BottomHalfModal({onPermissionGranted}) {
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      setAppState(nextAppState);
      if (nextAppState === 'active') {
        // Check if location permissions are now granted
        checkLocationPermission();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  const checkLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      dispatch(permission(result));
      if (result === 'granted') {
        navigation.navigate('nearMe');
      }
    } catch (error) {
      console.log('Error checking location permission:', error);
    }
  };

  const locationPermission = async () => {
    try {
      console.log('Location permission denied');
      // You can show an alert or take other actions as needed
      // Alert.alert('Permission Denied', 'Please enable location services to use this feature.', [
      //   {
      //     text: 'Cancel',
      //     style: 'cancel',
      //   },
      //   {
      //     text: 'Open Settings',
      //     onPress: async () => {
      await openSettings();
      // Call the callback to notify HomeScreen about permission change
      onPermissionGranted();
      //     },
      //   },
      // ]);
    } catch (error) {
      console.log('bottomHalf', error);
    }
  };
  const goNearME = () => {
    navigation.navigate('nearMe');
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={true}
        swipeDirection="down"
        animationInTiming={200}
        animationOutTiming={200}
        style={styles.modal}
        useNativeDriverForBackdrop
        propagateSwipe
        avoidKeyboard>
        <View style={styles.modalContainer}>
          <LocationDeny />
          <CustomText text="Location permission is off" style={styles.title} />
          <CustomText text="Enable location permission for better" style={styles.desc} />
          <CustomText text="experience" style={styles.desc} />
          <CustomButton
            title="Enable Location Permission from Phone Settings"
            onPress={locationPermission}
            style={styles.enable}
            textStyle={styles.enableText}
          />
          <CustomTouchableOpacity onPress={goNearME}>
            <CustomText text="Select location manually" style={styles.manual} />
          </CustomTouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: 'auto',
    justifyContent: 'flex-end',
  },
  container: {
    // flex: 1,
    // justifyContent: 'flex-end', // Align content at the bottom
    // height: heightToDp(20),
    // position: 'absolute',
    // bottom: 0,
  },
  modalContainer: {
    height: heightToDp(30),
    // backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorGray,
  },
  title: {
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.helvetica,
    fontWeight: '700',
    color: Color.colorBlack,
  },
  desc: {
    fontSize: FontSize.size_16,
    fontWeight: '400',
    fontFamily: FontFamily.helvetica,
    color: '#949494',
  },
  enable: {
    backgroundColor: '#9460F6',
    borderRadius: Border.br_8,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthToDp(80),
    height: heightToDp(6),
  },
  enableText: {
    fontSize: FontSize.size_16,
    color: Color.colorWhite,
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
  },
  manual: {
    color: '#5A2DAF',
    fontSize: FontSize.size_16,
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
  },
});

export default BottomHalfModal;
