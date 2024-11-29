import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {widthToDp, heightToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {CancelPopupSvg, CancelPopupTick} from '../../assets/svgImage/bottomDrawer';
import {Color, FontSize} from '../../assets/static/globalStyles';
import FastImage from 'react-native-fast-image';
const ServiceProviderCanceldModal = ({
  isVisible,
  isClose,
  onPressGoBackCancelPopup,
  onPressCancelService,
  setCancelPopup,
}) => {
  const navigation = useNavigation();
  //asdf Serive Provider OTP Cancelled Modal

  const [cancelService, SetCancelService] = useState(false);

  //this is cancel service//
  const onPresscancelOkPopup = () => {
    onPressGoBackCancelPopup();
  };

  const onCancelBeforeStartWork = () => {
    // navigation.navigate('HomeScreen')
    onPressCancelService();
    SetCancelService(true);
  };

  const onPressBackDropBtn = () => {
    if (cancelService) {
      navigation.navigate('HomeScreen');
      setCancelPopup(false);
    }
  };

  return (
    <View>
      <Modal isVisible={isVisible} style={styles.modalContainer} onBackdropPress={onPressBackDropBtn}>
        <View style={styles.modalContent}>
          {cancelService ? (
            <View style={styles.cancelContainer}>
              {/* <CancelPopupTick style={{marginBottom: heightToDp(2)}} /> */}
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelSuccess.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText text={'Your Service Cancellation is '} style={styles.cancelConfirmText} />
              <CustomText text={'Confirmed!'} style={styles.cancelConfirmText} />
              <Text style={styles.needHelpText}>Need help with anything before you go?</Text>
              <Text style={styles.supportText}>Our support team is here for you</Text>
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {/* <CancelPopupSvg style={{marginVertical: heightToDp(1), marginBottom: heightToDp(2)}} /> */}
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/CancelService.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />

              <CustomText
                text={'Hey there! Quick check: \nAre you considering cancelling the service before its complete? '}
                style={styles.modaltext}
              />
              <View style={styles.popupNoteTextCon}>
                <CustomText
                  text={
                    'Please Note: Cancelling with impact your ratings and reliability, potentially leading to account termination'
                  }
                  style={styles.noteDescription}
                />
              </View>

              <View style={{flexDirection: 'row', gap: 10}}>
                <CustomButton
                  title={'GO BACK'}
                  onPress={onPresscancelOkPopup}
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
                  onPress={() => onCancelBeforeStartWork()}
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
  cancelContainer: {flexDirection: 'column', alignItems: 'center'},
  needHelpText: {
    fontWeight: 'bold',
    marginTop: widthToDp(3),
    fontSize: FontSize.size_12,
  },
  supportText: {fontWeight: 'bold', fontSize: FontSize.size_12},
  cancelConfirmText: {
    color: '#464183',
    fontFamily: 'Roboto',
    fontSize: heightToDp(2.2),
  },
  modalContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
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
  popupNoteTextCon: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: widthToDp(15),
    paddingVertical: widthToDp(3),
    textAlign: 'center',
  },
  noteHead: {
    fontWeight: 'bold',
    color: Color.colorBlack,
    fontSize: FontSize.size_10,
  },
  noteDescription: {
    fontWeight: 'bold',
    color: Color.colorBlack,
    fontSize: FontSize.size_10,
    textAlign: 'center',
  },
});

export default ServiceProviderCanceldModal;
