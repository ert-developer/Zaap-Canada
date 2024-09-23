import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';
import {CancelPopupTick} from '../../assets/svgImage/bottomDrawer';
import {Color} from '../../assets/static/globalStyles';
import FastImage from 'react-native-fast-image';
const CustomerServiceCompletedModal = ({isVisiblecompleted, serviceCompleteClose}) => {
  return (
    <View>
      <Modal isVisible={isVisiblecompleted} style={styles.modalContainer} onBackdropPress={serviceCompleteClose}>
        <View style={styles.modalContent}>
          <View style={{alignItems: 'center', justifyContent: 'center', padding: heightToDp(2)}}>
            {/* <CancelPopupTick /> */}
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/Success.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: heightToDp(1)}}>
              <CustomText text={'Success! Your request'} style={styles.successPopupHead} />
              <CustomText text={'is now fulfilled.'} style={styles.successPopupHead} />
            </View>
            <Text style={styles.successPopupdesc}>Check Out Other Service You Might Need</Text>
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
    backgroundColor: 'white',

    borderRadius: 19,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: heightToDp(2),
  },
  modaltext: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: '#000000',
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
  successPopupHead: {fontFamily: 'Roboto', color: Color.colorIndigo2, fontSize: widthToDp(4.5)},
  successPopupdesc: {fontFamily: 'Roboto', fontSize: widthToDp(3), color: Color.colorIndigo2},
});

export default CustomerServiceCompletedModal;
