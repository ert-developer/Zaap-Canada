import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';


const DeleteAccountModal = ({visible, onClose, onConfirm}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete your account? This action cannot be undone.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Yes, Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#464183',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  noButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  yesButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DeleteAccountModal;
