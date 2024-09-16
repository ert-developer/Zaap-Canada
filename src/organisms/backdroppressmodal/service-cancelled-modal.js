import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {widthToDp, heightToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {CancelPopupSvg, CancelPopupTick} from '../../assets/svgImage/bottomDrawer';
import FastImage from 'react-native-fast-image';
const ServiceCanceldModal = ({isVisible, isClose, onPressCancelService, onCustCancelltionCharge}) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);

  //   const toggleModal = () => {
  //     setModalVisible(!isModalVisible);
  //   };
  const navigation = useNavigation();

  //asdf ??? MODAL

  const [cancelService, SetCancelService] = useState(false);

  const onCancelBeforeStartWork = () => {
    // navigation.navigate('HomeScreen')
    SetCancelService(true);
    // onPressCancelService();
    onCustCancelltionCharge();
  };

  const onPressGoBackDrop = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View>
      <Modal isVisible={isVisible} style={styles.modalContainer} onBackdropPress={onPressGoBackDrop}>
        <View style={styles.modalContent}>
          {cancelService ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: heightToDp(2),
                width: heightToDp(37),
              }}>
              {/* <CancelPopupTick style={{marginBottom: heightToDp(2)}} /> */}
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelSuccess.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText
                text={'Your Service Cancellation is '}
                style={{color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2.5)}}
              />
              <CustomText
                text={'Confirmed!'}
                style={{color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2.5)}}
              />
              <Text style={{fontFamily: 'Roboto', marginTop: 10}}>Need help with anything before you go?</Text>
              <Text style={{fontFamily: 'Roboto'}}>Our support team is here for you</Text>
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelService.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />

              <CustomText text={'Are you sure you’d like to '} style={styles.modaltext} />
              <CustomText text={'cancel your service request ?'} style={styles.modaltext} />
              <Text
                style={{
                  fontFamily: 'Roboto',
                  color: '#000000',
                  marginVertical: heightToDp(1.4),
                  marginBottom: heightToDp(3.5),
                  flexDirection: 'row',
                  textAlign: 'center',
                }}>
                Cancellation charges may apply
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <CustomButton
                  title={'NO, GO BACK'}
                  onPress={isClose}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#00BF63',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                  }}
                  textStyle={{fontSize: heightToDp(2.2)}}
                />
                <CustomButton
                  title={'YES, CANCEL'}
                  onPress={onCancelBeforeStartWork}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#FF5757',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                  }}
                  textStyle={{fontSize: heightToDp(2.2)}}
                />
              </View>
            </View>
          )}
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
    padding: heightToDp(2),
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
  modaltext: {
    fontSize: heightToDp(2.5),
    fontFamily: 'Roboto',
    color: '#464183',
  },
});

export default ServiceCanceldModal;
