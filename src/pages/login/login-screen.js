import React, {useMemo, useState} from 'react';
import {FlatList, Linking, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../atoms/button/buttonComponent';
import LoginStyles from './login-styles';
import CustomText from '../../atoms/text/textComponent';
import {One, Two, Three, Four, Five, Six, Seven, GoogleIcon, FbIcon} from '../../assets/svgImage/login';
import {ZaapLogo} from '../../assets/svgImage/zaaplogo';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import CustomModelComponent from '../../atoms/model/model-component';
import Logo from '../../assets/svgImage/loginLogo';
import {SmallExclamationSVG} from '../../assets/svgImage/providerProfile';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import LegalScreen from '../contactUs/legal-scree';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({googleLogin, facebookLogin, toggleModal, modalVisible, setModalVisible, tc, logoutPress}) => {
  const styles = useMemo(() => LoginStyles(), []);
  // const [isModalVisible, setModalVisible] = useState(false);
  // const toggleModal = () => {
  //     setModalVisible(!isModalVisible);
  // };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleEmailPress = () => {
    const email = 'mailto:help@zaapondemand.in';
    Linking.canOpenURL(email)
      .then(supported => {
        return Linking.openURL(email);
      })
      .catch(err => console.error('An error occurred', err));
  };

  const tesingFirebase = async () => {
    try {
      let response;
      if (true) {
        response = await firestore().collection('user').doc('1131').set({srinivas: true});
      } else {
        response = await firestore().collection().add(data);
      }
      return response;
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, modalVisible && styles.containerFade]}>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContentContainer}>
          {/* <ContactUsSVG /> */}
          <FastImage
            style={{width: 250, height: 250}}
            source={require('../../assets/ContactSupport.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.modalContentContainer2}>
            <CustomText text={'Need Help?'} style={styles.contactUsHeading} />
            <View style={styles.contactUsDesCon}>
              <CustomText
                text={'Our dedicated support team is here to help you.'}
                style={styles.contactUsDesscription}
              />
            </View>
            <TouchableOpacity style={styles.contactUsBtn} onPress={handleEmailPress}>
              <CustomText text={'help@zaapondemand.in'} style={styles.btnText} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container]}>
        <View style={styles.helpTextContainer}>
          <TouchableOpacity style={styles.helpTextTouchableContainer} onPress={() => setIsModalVisible(true)}>
            <SmallExclamationSVG color="primary" />
            <CustomText text={'Help'} style={styles.helpText} />
          </TouchableOpacity>
        </View>

        {/* {modalVisible && <View style={styles.overlay} />} */}
        <Logo width={200} height={150} style={styles.zaaplogo} />
        <CustomText text="Welcome to ZAAP" style={styles.title} />
        <View style={styles.infoContainer}>
          <CustomText text="The trusted community to" style={styles.info} />
          <CustomText text="Hire or Work Locally" style={styles.info} />
        </View>
        <CustomButton title="Test" onPress={tesingFirebase} />
        <View style={styles.topContent}>
          <TouchableOpacity style={styles.row} onPress={googleLogin}>
            <GoogleIcon style={styles.icon} />
            <CustomButton
              title="Continue with Google"
              // iconUri="https://i.ibb.co/j82DCcR/search.png"
              style={[styles.googleButton]}
              textStyle={styles.text}
              onPress={googleLogin}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={facebookLogin}>
            <FbIcon style={styles.icon} />
            <CustomButton
              title="Continue with Facebook"
              // iconUri="https://i.ibb.co/j82DCcR/search.png"
              style={[styles.googleButton]}
              textStyle={styles.text}
              onPress={facebookLogin}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.terms}>
          <Text style={styles.termsText}>If you continue you are accepting</Text>
          {/* <CustomText text="If you continue you are accepting" style={styles.termsText} /> */}
          <CustomTouchableOpacity onPress={toggleModal}>
            <CustomText text="ZAAP Terms And Conditions And Privacy Policy" style={styles.underline} />
          </CustomTouchableOpacity>
        </View>
        <CustomModelComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
          <View style={styles.modalContent}>
            {/* <CustomText text="Terms and Conditions" style={styles.modalTitle} />
            <CustomText text={tc} style={styles.modalText} /> */}
            <LegalScreen />
            <CustomButton
              title="Agree & Close"
              onPress={toggleModal}
              style={styles.modalButton}
              textStyle={styles.buttonText}
            />
          </View>
        </CustomModelComponent>
        {/* isModalVisible&&<CustomModal toggleModal={toggleModal} text={"User Signed out Successfully"}/> */}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoginScreen);
