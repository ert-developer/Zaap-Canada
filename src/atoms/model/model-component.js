import {Text, Modal, View, Alert} from 'react-native';
import React from 'react';

const CustomModelComponent = ({modalVisible, setModalVisible, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      {children}
    </Modal>
  );
};

export default CustomModelComponent;
