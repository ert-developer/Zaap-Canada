import Modal from 'react-native-modal';
import {View, StyleSheet} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {useState} from 'react';
import CustomButton from '../../atoms/button/buttonComponent';
import {widthToDp} from '../../responsive/responsive';
import {Color, Margin} from '../../assets/static/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {heightToDp} from '../../responsive/responsive';
import FastImage from 'react-native-fast-image';

const NoJobPostModal = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigation = useNavigation();

  const onCloseSuccessModal = () => {
    setShowPopup(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      {/* <Modal isVisible={showPopup} onBackdropPress={onCloseSuccessModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText text={'Feedback Already Submitted!'} style={styles.modalSuccessText} />
          </View>
          <CustomButton title={'Submit'} onPress={onCloseSuccessModal} />
        </View>
      </Modal> */}
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{width: heightToDp(43)}}>
            <View style={{justifyContent: 'center', alignItems: 'center', padding: heightToDp(1.5)}}>
              <FastImage
                style={{width: 100, height: 100}}
                source={require('../../assets/Cross.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText
                text={'Job Posting Not Allowed!'}
                style={{
                  color: '#464183',
                  fontFamily: 'Roboto',
                  fontSize: heightToDp(2.5),
                  marginVertical: heightToDp(1),
                  // marginBottom: heightToDp(2),
                }}
              />
              <CustomText
               text={`Service Providers can't post ads.`}
                style={{
                  fontFamily: 'Roboto',
                  marginLeft: heightToDp(2.1),
                  fontSize: heightToDp(1.5),
                  }}
              />
              <CustomText
                text={`Log in with other account to post ads.`}
                style={{
                  fontFamily: 'Roboto',
                  marginLeft: heightToDp(2.1),
                  fontSize: heightToDp(1.5),
                  }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: heightToDp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  modalSuccessText: {
    color: Color.colorIndigo2,
    fontWeight: 'bold',
    fontSize: widthToDp(5),
  },
  modalSuccessDescriptionText: {
    textAlign: 'center',
    padding: widthToDp(2),
    color: Color.colorBlack,
  },
  buttonStyles: {
    padding: widthToDp(3),
    borderRadius: widthToDp(1),
    marginTop: widthToDp(2),
  },
});

export default NoJobPostModal;
