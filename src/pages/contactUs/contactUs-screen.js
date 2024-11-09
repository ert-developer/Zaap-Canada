import React, {useMemo, useState} from 'react';
import CustomText from '../../atoms/text/textComponent';
import {View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image} from 'react-native';
import ContactStyles from './styles';
import {ZaapLogo} from '../../assets/svgImage/zaaplogo';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import CustomButton from '../../atoms/button/buttonComponent';
import ButtonIconLabelComponent from '../../atoms/buttonIconlabel/buttonIconlabel-component';
import {useNavigation} from '@react-navigation/native';
import MailSVGComponent from '../../assets/svgIcons/mailsvg/mailsvg';
import HeaderComponent from '../../atoms/header/headerComponent';
import Modal from 'react-native-modal';
import {ContactUsSVG} from '../../assets/svgImage/contactUsSvg/contact-us-svg';
import {TextInput} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {Linking, Alert} from 'react-native';

const ContactUs = () => {
  const navigate = useNavigation();
  const styles = ContactStyles();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const gotoContactUsQuestionsScreen = questionCategory => {
    navigate.navigate('contactUsQuestions', {questionCategory});
  };

  const handleEmailPress = () => {
    const email = 'mailto:help@zaapondemand.ca';
    Linking.canOpenURL(email)
      .then(supported => {
        return Linking.openURL(email);
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContentContainer}>
          {/* <ContactUsSVG /> */}
          <Image
            style={{width: 250, height: 250}}
            source={require('../../assets/ContactSupport.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <CustomText text={"Still can't find"} style={styles.contactUsHeading} />
          <CustomText text={'What your are looking for ?'} style={styles.contactUsHeading} />
          <View style={styles.contactUsDesCon}>
            <CustomText text={'Our dedicated support team is here to help you.'} style={styles.contactUsDesscription} />
            <CustomText text={'Kindly email your question or concern at'} style={styles.contactUsDesscription} />
          </View>
          <TouchableOpacity style={styles.contactUsBtn} onPress={handleEmailPress}>
            <CustomText text={'help@zaapondemand.ca'} style={styles.btnText} />
          </TouchableOpacity>
        </View>
      </Modal>
      <StatusBar barStyle="light-content" />
      <HeaderComponent text={'Help Center'} />
      <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {/* <View> */}
          <View style={styles.frequentlyAskedQuestions}>
            <CustomText text="Frequently Asked Questions" style={styles.title} />
          </View>
          <View style={styles.help}>
            <CustomText text="How can we help you today?" style={styles.helpTitle} />
            <CustomText
              text="Choose a category to quickly find solutions to your questions"
              style={styles.helpTitleDescription}
            />
          </View>
          {/* </View> */}
          <View>
            {/* <CustomText text="FAQ" style={styles.title} /> */}
            <View style={styles.faqCategoryButtonContainer}>
              <CustomButton
                style={styles.categoryButton}
                onPress={() => gotoContactUsQuestionsScreen('Getting Started')}>
                <CustomText text="Getting Started" style={styles.categoryButtonText} />
              </CustomButton>
              {/* <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Ad Posting')}>
                <CustomText text="Ad Posting" style={styles.categoryButtonText} />
              </CustomButton>
              <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Hiring')}>
                <CustomText text="Hiring" style={styles.categoryButtonText} />
              </CustomButton> */}
              {/* <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Premium Ads')}>
                <CustomText text="Premium Ads" style={styles.categoryButtonText} />
              </CustomButton> */}
              <CustomButton
                style={styles.categoryButton}
                onPress={() => gotoContactUsQuestionsScreen('Background Verification')}>
                <CustomText text="Background Verification" style={styles.categoryButtonText} />
              </CustomButton>
              {/* <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Payments')}>
                <CustomText text="Payments" style={styles.categoryButtonText} />
              </CustomButton> */}
              <CustomButton
                style={styles.categoryButton}
                onPress={() => gotoContactUsQuestionsScreen('Service Provider Portfolio')}>
                <CustomText text="Service Provider Portfolio" style={styles.categoryButtonText} />
              </CustomButton>
              <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Legal')}>
                <CustomText text="Legal" style={styles.categoryButtonText} />
              </CustomButton>
              <CustomButton
                style={styles.categoryButton}
                onPress={() => gotoContactUsQuestionsScreen('Applying for Jobs')}>
                <CustomText text="Applying for Jobs" style={styles.categoryButtonText} />
              </CustomButton>
              <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Managing Jobs')}>
                <CustomText text="Managing Jobs" style={styles.categoryButtonText} />
              </CustomButton>
              <CustomButton style={styles.categoryButton} onPress={() => gotoContactUsQuestionsScreen('Policies')}>
                <CustomText text="Policies" style={styles.categoryButtonText} />
              </CustomButton>
            </View>
          </View>
        </View>
        <CustomButton style={styles.contactSupportBtn} onPress={() => setIsModalVisible(true)}>
          <View style={styles.mailIconStyles}>
            <MailSVGComponent />
          </View>
          <CustomText text="CONTACT SUPPORT" style={styles.contactSupportBtnText} />
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

const FAQItem = ({question, answer}) => {
  const styles = useMemo(() => ContactStyles(), []);
  return (
    <View style={styles.faqContainer}>
      <CustomText style={styles.ques} text={question} />
      <CustomText text={answer} style={styles.ans} />
    </View>
  );
};

export default ContactUs;

{
  /* <FAQItem
              question="Question no. 1"
              answer="Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            />

            <FAQItem
              question="Question no. 2"
              answer="Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            />
            <FAQItem
              question="Question no. 3"
              answer="Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            />
            <FAQItem
              question="Question no. 4"
              answer="Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            /> */
}
