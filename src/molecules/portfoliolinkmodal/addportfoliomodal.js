import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import {AddPortfolioPop} from '../../assets/svgIcons/bottomdrawersvg';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const PortfolioAddPopup = ({portfolioAdded, setPortFolioAdded}) => {
  const navigation = useNavigation();

  const handleClose = () => {
    setPortFolioAdded(false);
    navigation.navigate('Portfolio');
  };

  return (
    <View>
      <Modal isVisible={portfolioAdded} style={styles.modalContainer} onBackdropPress={handleClose}>
        <View style={styles.modalContent}>
          <View style={{width: heightToDp(40)}}>
            <View style={{justifyContent: 'center', alignItems: 'center', padding: heightToDp(1.5)}}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/Success.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText
                text={'Portfolio Added Successfully !'}
                style={{
                  color: '#464183',
                  fontFamily: 'Roboto',
                  fontSize: heightToDp(2.5),
                  marginVertical: heightToDp(2),
                  marginBottom: heightToDp(5),
                }}
              />
            </View>
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
    borderRadius: heightToDp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default PortfolioAddPopup;
