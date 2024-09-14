import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';

const ChattModal = ({isVisible, navigation, text}) => {
  return (
    <View>
      <Modal isVisible={isVisible} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.firstTextContainer}>
            <CustomText text={text} style={styles.firstText} />
          </View>
          <CustomButton
            title={'Back To Home Screen'}
            style={styles.bactohome}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#D3D3D3',
    // padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    // borderColor: 'rgba(0, 0, 0.1)',
    padding: heightToDp(1),
    // height: 100,
    width: widthToDp(90),
    height: heightToDp(25),
    textAlign: 'center',
  },
  firstText: {
    fontSize: heightToDp(2),
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: '#000000',
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

export default ChattModal;
