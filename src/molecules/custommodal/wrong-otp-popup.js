import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import {CancelPopupSvg, CancelPopupTick, VerificationSuccessPopup} from '../../assets/svgImage/bottomDrawer';
import FastImage from 'react-native-fast-image';
const WrongOtpMdal = ({toggleModal}) => {
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={toggleModal} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{justifyContent: 'center', alignItems: 'center', width: heightToDp(40)}}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/CancelService.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <CustomText
              text={'INVALID OTP!'}
              style={{color: 'red', fontFamily: 'Roboto', fontSize: heightToDp(2.3), marginVertical: heightToDp(1)}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: heightToDp(2)}}>
              <Text style={{color: '#353535', fontFamily: 'Roboto', fontSize: heightToDp(1.7)}}>
                Please Enter a valid OTP
              </Text>
            </View>
            <View style={styles.okButtonn}></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: heightToDp(1),
    padding: widthToDp(3),
  },
});

export default WrongOtpMdal;
