import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Color} from '../../assets/static/globalStyles';
import {ServiceProviderVerificationModalSVG} from '../../assets/svgImage/providerProfile';

const ServiceProviderVerificationModal = ({closeModal}) => {
  const navigation = useNavigation();

  // const closeModal = () => {
  //   console.log("CLoseModal")
  // };
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={closeModal} style={styles.modalContainer} onBackButtonPress={closeModal}>
        <View style={styles.modalContent}>
          <View style={styles.firstTextContainer}>
            <View style={styles.container}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/BGCSubmited.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <CustomText text={'Your Details are Successfully Submitted'} style={styles.firstText} />

            {/* <CustomText text ={"Great Work!"} style={styles.firstText}/> */}
            {/* <CustomText text ={"Expect Your Earning Shortly."} style={styles.firstText}/> */}
            <CustomText
              text={
                'Our team is reviewing your information \nKindly check your email for updates\n We appreciate your patience'
              }
              style={styles.secondText}
            />
            {/* <CustomText text={'Maximize Your Income by '} style={styles.secondText} /> */}
            {/* <CustomText text={'Exploring More Taks Nearby '} style={styles.secondText} x /> */}
          </View>

          <CustomButton
            title={'BACK TO HOME'}
            style={styles.bactohome}
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  secondText: {
    fontSize: heightToDp(1.6),
    letterSpacing: widthToDp(0.2),
    color: Color.colorBlack,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    // padding: widthToDp(2),
    paddingHorizontal: widthToDp(10),
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  firstText: {
    fontSize: heightToDp(2.2),
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: Color.colorIndigo2,
    fontWeight: '800',
    marginBottom: 10,
    // letterSpacing: widthToDp(0.1),
  },
  bactohome: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    borderRadius: 8,
    backgroundColor: Color.colorIndigo2,
    width: '60%',
    padding: heightToDp(1),
    borderRadius: heightToDp(7),
    fontSize: 16,
    letterSpacing: 0.4,
    borderRadius: heightToDp(1),
    marginTop: heightToDp(1),
  },
});

export default ServiceProviderVerificationModal;
