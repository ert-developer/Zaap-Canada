import {View} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {ScrollView} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import feedbackStyles from './feedback-styles';
import CustomButton from '../../atoms/button/buttonComponent';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native';

const FeedbackScreen = ({
  formData,
  formErrors,
  handleChangeInputText,
  onSubmitFeedback,
  showFeedbackModal,
  onCloseSuccessModal,
}) => {
  const styles = feedbackStyles();
  return (
    <>
      <HeaderComponent text="Feedback" />
      <ScrollView>
        {showFeedbackModal && (
          <Modal isVisible={showFeedbackModal} onBackdropPress={onCloseSuccessModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/Success.gif')}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <CustomText text={'Feedback Received!'} style={styles.modalSuccessText} />
                <CustomText text={'Thanks for your feedback!'} style={styles.modalSuccessText} />

                <CustomText
                  text={' Your suggestions are important and will help us improve the app'}
                  style={styles.modalSuccessDescriptionText}
                />
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.feedbackContainer}>
          <TextInputWithLabelComponent
            //   key={index}
            label={'Name'}
            value={formData.name}
            onHandleChange={text => handleChangeInputText('name', text)}
            field={'name'}
            placeholder={'Enter your name'}
            formErrors={formErrors}
            //   onSubmitEditing={handleTextInputSubmit}
          />
          <TextInputWithLabelComponent
            //   key={index}
            label={'Email'}
            value={formData.email}
            onHandleChange={text => handleChangeInputText('email', text)}
            field={'email'}
            placeholder={'Enter your Email'}
            formErrors={formErrors}
            //   onSubmitEditing={handleTextInputSubmit}
          />
          <View>
            <CustomText text={'Feedback'} style={[styles.label, styles.textAreaLabel]} />
            <TextAreaInputComponent
              style={[styles.textArea, {textAlignVertical: 'top'}]}
              value={formData.feedback}
              placeholder={'Enter your feedback'}
              numberOfLines={4}
              onChangeText={text => handleChangeInputText('feedback', text)}
              fieldName={'feedback'}
              formErrors={formErrors}
              multiline
              maxLength={1000}
            />
          </View>
          <CustomButton
            title={'SUBMIT'}
            style={[styles.saveButton]}
            textStyle={styles.textButton}
            onPress={() => {
              // handleCategoriesChange(nextCategory);
              onSubmitFeedback();
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default FeedbackScreen;
