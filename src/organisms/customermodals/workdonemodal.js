import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import FastImage from 'react-native-fast-image';

const WorkDoneModal = ({showWorkDonePopup, onWorkdone, setWorkDonePopup, selectedJobDetails, providerStatus}) => {
  //asdf
  //Customer Work Done cancel

  const onPressCancelService = async () => {
    setWorkDonePopup(false);
  };

  return (
    <View>
      <Modal isVisible={showWorkDonePopup} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {/* <CancelPopupSvg style={{marginBottom: heightToDp(2)}} /> */}
            <FastImage
              style={{width: 100, height: 100}}
              source={require('../../assets/CancelService.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <CustomText text={'Attention: Final Step Ahead!'} style={{fontFamily: 'Roboto', color: '#464183'}} />
            <Text style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(1.5)}}>
              By clicking Work Done, you'll conclude the service.
            </Text>
            <Text style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(1.5)}}>
              Are you sure you want to proceed?{' '}
            </Text>
            <Text style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(1.5)}}>
              This action cannot be undone
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', gap: 20, marginTop: heightToDp(2)}}>
              <CustomButton
                title={'WORK DONE'}
                onPress={onWorkdone}
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
                title={'Cancel'}
                onPress={onPressCancelService}
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
    padding: heightToDp(1.5),
    paddingTop: heightToDp(0),
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
});

export default WorkDoneModal;
