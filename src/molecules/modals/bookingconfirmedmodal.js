import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {FreeGreenTickSVG} from '../../assets/svgImage/profile';
import {Color} from '../../assets/static/globalStyles';
const BookingConfirmedModal = ({toggleModal}) => {
  const navigation = useNavigation();

  const closeModal = () => {
    toggleModal();
  };
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={closeModal} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.firstTextContainer}>
            <View style={styles.container}>
              {/* Using FastImage for a GIF from a URL */}
              {/* <FastImage
                source={{
                  uri: 'https://res.cloudinary.com/dzxemuctv/image/upload/v1707980738/Animation_-_1707980330777_f8zlij.gif',
                  priority: FastImage.priority.normal,
                }}
                style={styles.gif}
                resizeMode={FastImage.resizeMode.contain}
              /> */}
              <FastImage
                style={{width: 150, height: 150}}
                source={require('../../assets/payment-success.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <CustomText text={'Thank you for your payment!'} style={styles.firstText} />

            {/* <CustomText text={'Service provider confirmed.'} style={styles.firstText} /> */}
            <CustomText text={'Your Booking is confirmed.'} style={styles.firstText} />
            {/* <CustomText text={'Kindly check the invoice in your profile'} style={styles.secondText} x /> */}
          </View>

          {/* <CustomButton title = {"Back To Home Screen"} style={styles.bactohome} onPress={() => navigation.navigate('HomeScreen')}/> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  secondText: {
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
  },
  gif: {
    width: 60,
    height: 60,
    // alignItems:"center"
  },
  secondText: {
    fontSize: heightToDp(1.6),
    letterSpacing: widthToDp(0.2),
    fontFamily: 'Helvetica',
    textAlign: 'center',
  },
  secondTextContainer: {
    marginBottom: heightToDp(1),
  },
  firstTextContainer: {
    marginBottom: heightToDp(1),
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    // padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    // borderColor: 'rgba(0, 0, 0.1)',

    // height: 100,
    width: widthToDp(78),
    height: heightToDp(27),
  },
  firstText: {
    fontSize: heightToDp(2),
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: Color.colorIndigo2,
    marginBottom: heightToDp(0.3),

    letterSpacing: widthToDp(0.1),
  },
  bactohome: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    borderRadius: 8,
    backgroundColor: '#008000',
    width: heightToDp(23),
    padding: heightToDp(1),
    borderRadius: heightToDp(7),
    fontSize: 16,
    letterSpacing: 0.4,

    borderRadius: heightToDp(1),
    marginTop: heightToDp(2),
  },
});

export default BookingConfirmedModal;
