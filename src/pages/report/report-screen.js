import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, TextInput} from 'react-native';
import CircleCheckbox from '../../atoms/circleCheckbox/circleCheckbox-component';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import {RadioButton} from 'react-native-paper';
import {reportStyles} from './report-styles';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import {Image} from 'react-native';

const ReportScreen = ({submitJobReport, reportSubmitModal, onCloseSuccessModal}) => {
  const [reportValue, setReportValue] = useState();
  const [otherText, setOtherText] = useState(''); // State for TextArea

  const handleOnChangeValue = value => {
    setReportValue(value);
  };

  const styles = reportStyles();

  const reportItems = [
    'Illegal Activities',
    'Scam',
    'Safety Risk',
    'Explicit or Inappropriate content',
    'Discrimination or Harassment',
    'Other',
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {reportSubmitModal && (
        <Modal isVisible={reportSubmitModal} onBackdropPress={onCloseSuccessModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/ReportAdTransparent.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText text={'Report Success!'} style={styles.modalSuccessText} />
              <CustomText
                text={'We deeply appreciate your dedication to ensuring our community’s safety and trustworthiness.'}
                style={styles.modalSuccessDescriptionText}
              />
            </View>
          </View>
        </Modal>
      )}
      <StatusBar type="light" />
      <HeaderComponent text={'Report Ads'} />
      <ScrollView>
        <View style={styles.reportsMainContainer}>
          <RadioButton.Group value={reportValue} onValueChange={handleOnChangeValue}>
            {reportItems.map(item => {
              return (
                <View key={item} style={styles.reportItemsContainer}>
                  <CircleCheckbox value={item} color={'#5A2DAF'} />
                  <CustomText text={item} style={styles.reportTextColor} />
                </View>
              );
            })}
          </RadioButton.Group>

          {/* Conditionally render TextArea when 'Other' is selected */}
          {reportValue === 'Other' && (
            <TextAreaInputComponent
              style={styles.textArea} // Add styles for TextArea
              placeholder="Please provide more details"
              multiline={true}
              numberOfLines={4}
              value={otherText}
              onChangeText={text => setOtherText(text)}
            />
          )}

          <TouchableOpacity
            style={styles.reportSendBtn}
            onPress={() => submitJobReport(reportValue === 'Other' ? otherText : reportValue)} // Send otherText if 'Other' is selected
          >
            <CustomText text={'SEND REPORT'} style={styles.reportBtnText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;
