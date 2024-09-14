import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import updateBankDetailsStyles from './update-bank-details-styles';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import CustomText from '../../atoms/text/textComponent';
import DropdownSearchComponent from '../../organisms/dropDownSearch/dropDownSearch-component';
import Modal from 'react-native-modal';
// import {RightPopupSVG} from '../../assets/svgIcons/premiumads/premium-ads-screen-svgs';
import FastImage from 'react-native-fast-image';

const UpdateBankDetailsScreen = ({
  accountType,
  bankDetailsFields,
  formData,
  formErrors,
  handleInputChange,
  updateUserBankDetails,
  showPopup,
  onClosePopup,
  error,
}) => {
  const styles = updateBankDetailsStyles();

  const renderBankDetailsFields = () => {
    if (bankDetailsFields) {
      return bankDetailsFields[0].inputFields.map((field, index) => {
        if (field.type === 'text') {
          return (
            <TextInputWithLabelComponent
              key={index}
              label={field.name}
              value={formData[field.name.toLowerCase().split(' ').join('_')]}
              onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
              field={field.name.toLowerCase().split(' ').join('_')}
              placeholder={field.name}
              formErrors={formErrors}
            />
          );
        } else {
          return (
            <View key={index}>
              <CustomText text={field.name} style={styles.label} />
              <DropdownSearchComponent
                selectedValue={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={handleInputChange}
                fieldName={field.name.toLowerCase().split(' ').join('_')}
                defaultOption={`Select ${field.name}`}
                labelField={'name'}
                valueField={'value'}
                pickerOptions={field.name === 'Account Type' ? accountType : []}
                formErrors={formErrors}
                style={styles.accountTypeSelectedStyles}
              />
            </View>
          );
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <Modal isVisible={showPopup || error} style={styles.modalContainer} onBackdropPress={onClosePopup}>
        <View style={styles.modalContent}>
          <FastImage
            style={{width: 100, height: 100}}
            source={error ? require('../../assets/CancelService.gif') : require('../../assets/Success.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.popupHeadingCon}>
            {/* <CustomText text={'Bank Details'} style={styles.popupHeadText} /> */}
            <CustomText
              text={
                error ? 'There are some error in the form please rectify them' : ' Bank Details Updated Successfully!'
              }
              style={styles.popupHeadText}
            />
          </View>
        </View>
      </Modal>
      <HeaderComponent text={'Update Bank Details'} />
      <ScrollView>
        <View style={styles.updateBankDetailsMainCon}>
          {renderBankDetailsFields()}
          <TouchableOpacity style={styles.bankDetailsUpdateBtn} onPress={() => updateUserBankDetails()}>
            <CustomText text={'UPDATE'} style={styles.updateBtnText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateBankDetailsScreen;
