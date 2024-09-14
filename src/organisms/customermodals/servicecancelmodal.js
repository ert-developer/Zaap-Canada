import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';
import {CancelPopupSvg} from '../../assets/svgImage/bottomDrawer';
import {CancelPopupTick} from '../../assets/svgImage/bottomDrawer';
import FastImage from 'react-native-fast-image';

const Service_CancelPopupAfter_otp = ({cancelPopupAfterOtp, onCancelAfterConfirm, popUpClose, onPressCancelService,}) => {
  const navigation = useNavigation();

  const [cancel, setCancel] = useState(false);
  const [cancelAfterConfirm, setCancelAfterConfirm] = useState(false);
  const [showRehireConfirm, setShowRehireConfirm] = useState(false); // Rehire confirmation state
  const [showRemoveJobConfirm, setShowRemoveJobConfirm] = useState(false); // Remove Job confirmation state

  const onPressConfirmCancelService = () => {
    onPressCancelService();
    navigation.navigate('HomeScreen');
  };

  const handleRehireConfirm = () => {
    setShowRehireConfirm(false);
    onPressConfirmCancelService();
    navigation.navigate('HomeScreen'); // Example navigation after rehire
  };

  const handleRemoveJobConfirm = async () => {
    console.log('Remove Job Confirmed');
    onCancelAfterConfirm();
    setShowRemoveJobConfirm(false);
    navigation.navigate('HomeScreen'); // Example navigation after job removal
  };

  return (
    <View>
      <Modal isVisible={cancelPopupAfterOtp} style={styles.modalContainer} onBackdropPress={popUpClose}>
        <View style={styles.modalContent}>
          {cancelAfterConfirm ? (
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: heightToDp(2)}}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelSuccess.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText
                text={'Your Booking Cancellation is '}
                style={{color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2.5)}}
              />
              <CustomText
                text={'Confirmed!'}
                style={{color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2.5)}}
              />
              <Text style={{color: '#464183', fontFamily: 'Roboto'}}>Need help with anything before you go?</Text>
              <Text style={{color: '#464183', fontFamily: 'Roboto'}}>Our support team is here for you</Text>
            </View>
          ) : cancel ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelService.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: heightToDp(1)}}>
                <CustomText text={'Hi there! Just confirming: '} style={{color: '#464183', fontFamily: 'Roboto'}} />
                <CustomText
                  text={'Do you wish to cancel the service '}
                  style={{color: '#464183', fontFamily: 'Roboto'}}
                />
                <CustomText text={"before it's finished?"} style={{color: '#464183', fontFamily: 'Roboto'}} />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: heightToDp(1)}}>
                <Text style={{color: '#000000', fontFamily: 'Roboto', fontSize: heightToDp(1.5)}}>
                  Attention: Services in progress are non-refundable.
                </Text>
                <Text style={{color: '#000000', fontFamily: 'Roboto', fontSize: heightToDp(1.5)}}>
                  Please refer to our cancellation policy for details
                </Text>
              </View>
              <View style={{gap: 20, marginTop: heightToDp(2), flexDirection: 'row'}}>
                <CustomButton
                  title={'PAY'}
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
                  title={'CANCEL'}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#FF5757',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                  }}
                  textStyle={{fontSize: heightToDp(2.2)}}
                  onPress={() => setCancelAfterConfirm(true)}
                />
              </View>
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelService.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText
                text={'Are you sure you’d like to '}
                style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(2.5)}}
              />
              <CustomText
                text={'cancel your service request? '}
                style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(2.5), marginBottom: heightToDp(2)}}
              />

              <View style={{flexDirection : 'row', gap: 20, marginTop: heightToDp(1), marginBottom: heightToDp(2)}}>
                <CustomButton
                  title={'Rehire'}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#00BF63',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                    marginLeft: heightToDp(2),
                  }}
                  textStyle={{fontSize: heightToDp(2)}}
                  onPress={() => setShowRehireConfirm(true)} // Trigger Rehire confirmation
                />
                <CustomButton
                  title={'Remove Job'}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#FF5757',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                    marginRight: heightToDp(2),
                  }}
                  textStyle={{fontSize: heightToDp(2)}}
                  onPress={() => setShowRemoveJobConfirm(true)} // Trigger Remove Job confirmation
              />
              </View>

              {/* <Text style={{color: '#000000', fontSize: heightToDp(1.5), marginTop: heightToDp(2.3), marginBottom: heightToDp(1)}}>
                ***Cancellation Charges May Apply***
              </Text> */}
            </View>
          )}
        </View>
      </Modal>

      {/* Rehire Confirmation Modal */}
      <Modal
        isVisible={showRehireConfirm}
        style={styles.modalContainer}
        onBackdropPress={() => setShowRehireConfirm(false)}>
        <View style={styles.modalContent}>
          <CustomText
            text={'Are you sure you want to rehire a new person?'}
            style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(2.5)}}
          />
          <CustomText
            text={'This process cannot be undone.'}
            style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(2.5), marginBottom: heightToDp(2)}}
          />
          <View style={{flexDirection: 'row', gap: 20}}>
            <CustomButton
              title={'Cancel'}
              style={{
                padding: heightToDp(1),
                backgroundColor: '#FF5757',
                fontFamily: 'Roboto',
                borderRadius: heightToDp(1),
                width: heightToDp(18),
              }}
              textStyle={{fontSize: heightToDp(2)}}
              onPress={() => {
                setShowRehireConfirm(false);
              }}
            />
            <CustomButton
              title={'Confirm'}
              style={{
                padding: heightToDp(1),
                backgroundColor: '#00BF63',
                fontFamily: 'Roboto',
                borderRadius: heightToDp(1),
                width: heightToDp(18),
              }}
              textStyle={{fontSize: heightToDp(2)}}
              onPress={handleRehireConfirm}
            />
          </View>
        </View>
      </Modal>

      {/* Remove Job Confirmation Modal */}
      <Modal isVisible={showRemoveJobConfirm} style={styles.modalContainer} onBackdropPress={() => setShowRemoveJobConfirm(false)}>
        <View style={styles.modalContent}>
          <FastImage
            style={{width: 100, height: 100}}
            source={require('../../assets/CancelService.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <CustomText
            text={'Are you sure you want to remove'}
            style={{
              fontFamily: 'Roboto',
              color: '#464183',
              fontSize: heightToDp(2.1),
              marginBottom: heightToDp(0.5),
              flexDirection: 'row',
            }}
          />
          <CustomText
            text={'this job?'}
            style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(2.1), marginBottom: heightToDp(2)}}
          />
          <CustomText
            text={'This process cannot be undone.'}
            style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(2.1), marginBottom: heightToDp(2)}}
          />
          <View style={{flexDirection: 'row', gap: 20}}>
            <CustomButton
              title={'Cancel'}
              style={{
                padding: heightToDp(1),
                backgroundColor: '#FF5757',
                fontFamily: 'Roboto',
                borderRadius: heightToDp(1),
                width: heightToDp(18),
                marginLeft: heightToDp(2),
              }}
              textStyle={{fontSize: heightToDp(2)}}
              onPress={() => setShowRemoveJobConfirm(false)}
            />
            <CustomButton
              title={'Confirm'}
              style={{
                padding: heightToDp(1),
                backgroundColor: '#00BF63',
                fontFamily: 'Roboto',
                borderRadius: heightToDp(1),
                width: heightToDp(18),
                marginRight: heightToDp(2),
              }}
              textStyle={{fontSize: heightToDp(2)}}
              onPress={handleRemoveJobConfirm}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Service_CancelPopupAfter_otp;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
});
