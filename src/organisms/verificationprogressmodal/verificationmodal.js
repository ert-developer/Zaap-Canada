import {color} from '@rneui/base';
import React from 'react';
import {Modal, View, Text, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../../atoms/text/textComponent';
import {Image} from 'react-native';

const VerificationInProgressModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Handles Android back button
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Image style={{width: 150, height: 150}} source={require('../../assets/CancelService.gif')} />
              <CustomText text={'Verification In Progress'} style={styles.modalTitle} />
              <CustomText
                text={'Your identity verification is currently in progress. Please wait until the process is complete.'}
                style={styles.modalMessage}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#464183',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
  },
};

export default VerificationInProgressModal;
