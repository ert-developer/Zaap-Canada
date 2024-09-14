import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import {VerificationSuccessPopup} from '../../assets/svgImage/bottomDrawer';
const VerificationSuccessModal = ({toggleModal}) => {
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={toggleModal} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{justifyContent: 'center', alignItems: 'center', width: heightToDp(40)}}>
            <VerificationSuccessPopup />
            <CustomText
              text={'Verification Success !'}
              style={{color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2.3), marginVertical: heightToDp(1)}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: heightToDp(2)}}>
              <Text style={{color: '#353535', fontFamily: 'Roboto', fontSize: heightToDp(1.7)}}>
                You have been successfully
              </Text>
              <Text style={{color: '#353535', fontFamily: 'Roboto', fontSize: heightToDp(1.7)}}>authenticated</Text>
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
  },
});

export default VerificationSuccessModal;
