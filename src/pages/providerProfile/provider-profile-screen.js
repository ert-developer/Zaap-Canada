import React, {useMemo, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import CustomButton from '../../atoms/button/buttonComponent';
import ProviderProfileStyles from './provider-profile-styles';
import CustomText from '../../atoms/text/textComponent';
import ServiceProviderVerificationModal from '../../organisms/serviceproviderpopupmodal/serviceprovider-popup-modal';

import {
  PersonalIcon,
  BankDetailsIcon,
  BackgroundCheckIcon,
  TCIcon,
  GreenTickIcon,
  CameraIcon,
  FrontIcon,
  Back,
  PersonIconComplete,
  PersonalIconStart,
  BankDetailIconProgress,
  BankDetailIconCompleted,
  BackGroundCheckInProgress,
  BackGroundCheckCompleted,
  TCIConInProgress,
} from '../../assets/svgImage/providerProfile';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import DropdownSearchComponent from '../../organisms/dropDownSearch/dropDownSearch-component';
import CustomCheckBox from '../../atoms/checkBox/checkBoxComponent';
import DeleteCustomImage from '../../organisms/deleteImage/deleteImage-component';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import {TickMark} from '../../assets/svgIcons/providerPaymentSvg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {setDate} from 'date-fns';
// import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import HeaderComponent from '../../atoms/header/headerComponent';
import {ExclamationSVG} from '../../assets/svgImage/providerProfile';
import TextInputWithIconComponent from '../../organisms/textInputWithIcon/textInputWithIcon-component';
import {CalenderSVG} from '../../assets/svgImage/profile';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import ContractorAgreement from '../termsandconditions/contractor-agreement';
import DropDownPicker from 'react-native-dropdown-picker';
import {envConfig} from '../../assets/helpers/envApi';

const ProviderProfile = ({
  categoriesData,
  formData,
  formErrors,
  handleInputChange,
  selectedCategory,
  handleCategoriesChange,
  countries,
  states,
  navigation,
  data,
  categoryData,
  nextCategory,
  accountType,
  indiaGovDocs,
  handleOpenCamera,
  onHandleDeleteImage,
  govDocuments,
  handleSubmit,
  showVerificationModal,
  handleCategoriesChangeonTop,
  toggleCheckBox,
  setToggleCheckBox,
  genderOptions,
  photoLoader,
  frontLoader,
  backLoader,
  indiaStateOptions,
}) => {
  // const styles = ProviderProfileStyles();

  // const [text, setText] = useState('');
  // const [enteredTexts, setEnteredTexts] = useState([]);
  // const [confirmAccountValid, setConfirmAccountValid] = useState(true);

  // const handleConfirmAccountNumber = () => {};

  // const handleTextChange = inputText => {
  //   setText(inputText);
  // };

  // const handleAddText = () => {
  //   if (text.trim() !== '') {
  //     const updatedTexts = [...enteredTexts, text];
  //     setEnteredTexts(updatedTexts);
  //     formData.languages_known = updatedTexts;
  //     setText('');
  //   }
  // };

  // const handleDeleteText = index => {
  //   const updatedTexts = [...enteredTexts];
  //   updatedTexts.splice(index, 1);
  //   setEnteredTexts(updatedTexts);
  //   handleInputChange('languages_known', updatedTexts); // Update the field here with the latest texts
  // };

  // const handleTextInputSubmit = () => {
  //   handleAddText();
  // };

  // const handleTextChange = inputText => {
  //   setText(inputText);
  // };

  // const handleAddText = () => {
  //   if (text.trim() !== '') {
  //     setEnteredTexts([...enteredTexts, text]);
  //     setText('');
  //   }
  // };

  // const handleDeleteText = index => {
  //   const updatedTexts = [...enteredTexts];
  //   updatedTexts.splice(index, 1);
  //   setEnteredTexts(updatedTexts);
  // };

  // const handleTextInputSubmit = () => {
  //   handleAddText();
  //   handleInputChange('language', enteredTexts);
  // };

  const [open, setOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(formData.languagesKnown || []);
  const [items, setItems] = useState([
    {label: 'English', value: 'English'},
    {label: 'French', value: 'French'},
    {label: 'Mandarin', value: 'Mandarin'},
    {label: 'Cantonese', value: 'Cantonese'},
    {label: 'Punjabi', value: 'Punjabi'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'Italian', value: 'Italian'},
    {label: 'German', value: 'German'},
    {label: 'Tagalog', value: 'Tagalog'},
    {label: 'Arabic', value: 'Arabic'},
    {label: 'Portuguese', value: 'Portuguese'},
    {label: 'Urdu', value: 'Urdu'},
    {label: 'Russian', value: 'Russian'},
    {label: 'Korean', value: 'Korean'},
    {label: 'Vietnamese', value: 'Vietnamese'},
    {label: 'Persian (Farsi)', value: 'Persian'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Greek', value: 'Greek'},
    {label: 'Polish', value: 'Polish'},
    {label: 'Ukrainian', value: 'Ukrainian'},
    {label: 'Tamil', value: 'Tamil'},
    {label: 'Bengali', value: 'Bengali'},
    {label: 'Gujarati', value: 'Gujarati'},
    {label: 'Hebrew', value: 'Hebrew'},
    {label: 'Dutch', value: 'Dutch'},
    {label: 'Romanian', value: 'Romanian'},
    {label: 'Turkish', value: 'Turkish'},
    {label: 'Serbian', value: 'Serbian'},
    {label: 'Somali', value: 'Somali'},
    {label: 'Amharic', value: 'Amharic'},
    {label: 'Cree', value: 'Cree'},
    {label: 'Ojibwe', value: 'Ojibwe'},
    {label: 'Inuktitut', value: 'Inuktitut'},
    {label: 'Albanian', value: 'Albanian'},
    {label: 'Croatian', value: 'Croatian'},
    {label: 'Cree', value: 'Cree'},
    {label: 'Ojibwe', value: 'Ojibwe'},
    {label: 'Inuktitut', value: 'Inuktitut'},
    {label: 'Innu', value: 'Innu'},
    {label: "Mi'kmaq", value: 'Mikmaq'},
    {label: 'Syriac', value: 'Syriac'},
    {label: 'Pashto', value: 'Pashto'},
    {label: 'Turkish', value: 'Turkish'},
    {label: 'Japanese', value: 'Japanese'},
    {label: 'Somali', value: 'Somali'},
    {label: 'Burmese', value: 'Burmese'},
    {label: 'Malay', value: 'Malay'},
    {label: 'Thai', value: 'Thai'},
    {label: 'Amharic', value: 'Amharic'},
    {label: 'Swahili', value: 'Swahili'},
    {label: 'Armenian', value: 'Armenian'},
    {label: 'Lithuanian', value: 'Lithuanian'},
    {label: 'Hungarian', value: 'Hungarian'},
    {label: 'Finnish', value: 'Finnish'},
    {label: 'Norwegian', value: 'Norwegian'},
    {label: 'Icelandic', value: 'Icelandic'},
  ]);

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const handleCheckBoxClick = () => {
    setToggleCheckBox(!toggleCheckBox);
    // setIsModalVisible3(true); // Show modal when checkbox is clicked
  };

  const [dob, setDob] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
    console.log('toggleDatePicker', toggleDatePicker);
  };

  const [idExpirationDate, setIdExpirationDate] = useState('');
  const [showIdExpirationPicker, setShowIdExpirationPicker] = useState(false);

  // console.log("dob",dob)
  const onChange = selectedDate => {
    toggleDatePicker(); // Close the date picker
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const day = currentDate.getDate();

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      setDob(formattedDate);

      // Set the selected date to the state variable
      setDob(formattedDate);
      handleInputChange('date_of_birth', formattedDate); // Update the form data with the selected date
    }
  };

  const toggleIdExpirationDatePicker = () => {
    setShowIdExpirationPicker(!showIdExpirationPicker);
  };

  const onIdExpirationDateChange = selectedDate => {
    toggleIdExpirationDatePicker(); // Close the date picker
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const day = currentDate.getDate();

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      setIdExpirationDate(formattedDate);

      // Update the form data with the selected date
      handleInputChange('id_expiration_date', formattedDate);
    }
  };

  // Set the maximum date to the current date
  const maxDate = new Date();

  // Set the minimum date to January 1, 1990
  const minDate = new Date(1990, 0, 1);

  const renderInputsForCategory = () => {
    if (categoryData) {
      return categoryData.inputFields.map((field, index) => {
        if (field.type === 'text' && field.name === 'Date of Birth') {
          return (
            <View key={index}>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  maximumDate={maxDate}
                  minimumDate={new Date(1950, 0, 1)}
                  timeZoneOffsetInMinutes={60}
                  timeZoneOffsetInSeconds={3600}
                  value={new Date()} // Set the initial value for the date
                  onChange={(event, selectedDate) => onChange(selectedDate)}
                />
              )}
              <Pressable onPress={toggleDatePicker}>
                <TextInputWithIconComponent
                  label={field.name}
                  value={dob}
                  onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                  field={field.name.toLowerCase().split(' ').join('_')}
                  placeholder={field.name}
                  formErrors={formErrors}
                  editable={false}
                  icon={<CalenderSVG />}
                  // onPress={toggleDatePicker}
                />
              </Pressable>
            </View>
          );
        } else if (field.type === 'text' && field.name === 'ID Expiration Date') {
          const selectedDoc = formData.id_type; // Get the selected document from formData
          const isDisabled = selectedDoc === 'Aadhar' || selectedDoc === 'Voter ID' || selectedDoc === '';

          return (
            <View key={index}>
              <Pressable onPress={!isDisabled ? toggleIdExpirationDatePicker : null} disabled={isDisabled}>
                {showIdExpirationPicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={new Date()} // Set the initial value for the date
                    onChange={(event, selectedDate) => onIdExpirationDateChange(selectedDate)}
                  />
                )}
                <TextInputWithLabelComponent
                  label={field.name}
                  value={isDisabled ? (formData.id_expiration_date = 'NA') : idExpirationDate}
                  onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                  field={field.name.toLowerCase().split(' ').join('_')}
                  placeholder={field.name}
                  formErrors={formErrors}
                  editable={false} // Disable input when conditions match
                  icon={<CalenderSVG />}
                />
              </Pressable>
            </View>
          );
        } else if (field.type === 'LANGUAGE' && field.name === 'Languages Known') {
          return (
            <View>
              {/* <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={text}
                onHandleChange={text => handleTextChange(text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={'Type language name and press Enter'}
                formErrors={formErrors}
                onSubmitEditing={handleTextInputSubmit}
              /> */}
              <CustomText text={'Languages Known'} style={styles.label} />

              <DropDownPicker
                open={open}
                multiple={true}
                value={selectedLanguages}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedLanguages}
                setItems={setItems}
                onChangeValue={value => {
                  setSelectedLanguages(value); // Update selected languages
                  formData.languages_known = value; // Update formData with selected languages
                }}
                placeholder="Select languages"
                mode="BADGE" // Display selected languages as badges
                badgeTextStyle={styles.badgeTextStyle} // Custom text style
                tickIconStyle={{tintColor: Color.colorIndigo}} // Change the color of the tick for selected languages
                style={[
                  styles.dropdownStyle,
                  formErrors.languages_known ? styles.errorStyle : null, // Apply error style if there are formErrors
                ]} // Custom dropdown border style
                dropDownContainerStyle={styles.dropDownContainer} // Style for the dropdown container
                listMode="MODAL"
                maxHeight={250}
              />

              {/* <ScrollView horizontal={true}>
                {enteredTexts.map((enteredText, index) => (
                  <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <Text>{enteredText}</Text>
                    <TouchableOpacity onPress={() => handleDeleteText(index)}>
                      <Text style={{color: 'red', marginLeft: 3}}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView> */}
            </View>
          );
        }
        // } else if (field.type === 'LOCATION' && field.name === 'LOCATION') {
        //   return (
        //     <View>
        //       <CustomText text={'LOCATION'} style={styles.label} />

        //       <GooglePlacesInput
        //         value={formData.location}
        //         onHandleChange={value => console.log('val;ue', value)} // Check if this is the correct prop name
        //         field={'location'}
        //         placeholder={'Enter Address'}
        //         formErrors={formErrors}
        //       />
        //     </View>
        //   );
        // }
        else if (field.type === 'text' && field.name === 'Account Number') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={field.name}
                formErrors={formErrors}
              />
            </View>
          );
        } else if (field.type === 'text' && field.name === 'Confirm Account Number') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={field.name}
                formErrors={formErrors}
              />
            </View>
          );
        } else if (field.type === 'text' && field.name === 'Phone Number') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={'+1'}
                formErrors={formErrors}
              />
            </View>
          );
        } else if (field.type === 'text' && field.name === 'Email ID') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={'Email modification not allowed'}
                formErrors={formErrors}
              />
            </View>
          );
        } else if (field.type === 'text' && field.name === 'Legal Name on ID') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={'First, Middle, Last'}
                formErrors={formErrors}
              />
            </View>
          );
        } else if (field.type === 'text' && field.name === 'City') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => {
                  handleInputChange(field.name.toLowerCase().split(' ').join('_'), text);
                  fetchCities(text);
                }}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={'Enter your city'}
                formErrors={formErrors}
              />
              <FlatList
                data={cities}
                keyExtractor={item => item.place_id}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleSelectCity(item)}>
                    <Text style={{padding: 10, color: 'red'}}>{item.description}</Text>
                  </TouchableOpacity>
                )}
                style={{maxHeight: 150}} // Limit dropdown height
              />
            </View>
          );
        } else if (field.type === 'text') {
          return (
            <View>
              <TextInputWithLabelComponent
                key={index}
                label={field.name}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={field.name}
                formErrors={formErrors}
              />
            </View>
          );
        } else if (field.type === 'buttonIcon') {
          return (
            <View>
              {(() => {
                switch (field.name) {
                  case 'FRONT':
                    return <></>;
                  case 'BACK':
                    return <></>;
                  default:
                    return (
                      <View>
                        {/* Button to add more images */}
                        <Modal isVisible={isModalVisible1} onBackdropPress={() => setIsModalVisible1(false)}>
                          <View style={styles.modalContentContainer}>
                            <CustomText text={'Why a Selfie Photo is Required?'} style={styles.contactUsHeading} />
                            <Text style={styles.contactUsDesscription}>
                              To verify your identity and match it with your government-issued ID.
                            </Text>
                            <CustomText text={'Photo Requirements:'} style={styles.contactUsHeading} />
                            <Text style={styles.contactUsDesscription}>
                              • Ensure the photo is clear, and without any filters {'\n\n'}• Take the photo in good
                              lighting, avoiding shadows on your face {'\n\n'}• Use a plain background, preferably white
                              or light-colored {'\n\n'}• Make sure your face is fully visible, centered, and directly
                              facing the camera {'\n\n'}• Do not wear sunglasses or hats {'\n\n'}• Accepted formats are
                              JPEG or PNG. {'\n\n'}• The file size should not exceed 5 MB
                            </Text>
                          </View>
                        </Modal>
                        <Modal isVisible={isModalVisible2} onBackdropPress={() => setIsModalVisible2(false)}>
                          <View style={styles.modalContentContainer}>
                            <CustomText text={'Why Uploading an ID is Required?'} style={styles.contactUsHeading} />
                            <Text style={styles.contactUsDesscription}>
                              To verify your identity and ensure the safety and trustworthiness of our platform
                            </Text>
                            <CustomText text={'Photo Requirements for ID:'} style={styles.contactUsHeading} />
                            <Text style={styles.contactUsDesscription}>
                              • Ensure the ID photo is clear, and all text and your photo are easy to read.{'\n\n'}• The
                              entire ID card should be visible in the photo, both front & back. {'\n\n'}• Do not crop or
                              cover any part of the ID. {'\n\n'}• Accepted formats are JPEG or PNG. The file size should
                              not exceed 5 MB.
                            </Text>
                          </View>
                        </Modal>
                        <View style={styles.selfieLabelContainer}>
                          <CustomText text={'Selfie Photo'} style={styles.label} />
                          <ExclamationSVG
                            style={styles.exclamationIconStyles}
                            onPress={() => setIsModalVisible1(true)}
                          />
                        </View>

                        <CustomTouchableOpacity
                          style={[styles.totalWidth, formErrors.personal_photo && styles.inputErrorStyles]}
                          onPress={() => handleOpenCamera('camera', field.name.toLowerCase().split(' ').join('_'))}>
                          {photoLoader ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <>
                              {renderIcon('PHOTO')}
                              <CustomText text={'Upload Photo'} style={styles.textWhite} />
                            </>
                          )}
                        </CustomTouchableOpacity>

                        {/* Iterate over each image in formData.personal_photo */}
                        <View style={{flexDirection: 'row'}}>
                          {Array.isArray(formData[field.name.toLowerCase().split(' ').join('_')]) &&
                            formData[field.name.toLowerCase().split(' ').join('_')].map((image, imageIndex) => (
                              <DeleteCustomImage
                                key={imageIndex}
                                containerStyle={styles.imageContainer}
                                imgSource={image}
                                imageStyle={styles.image}
                                handleDeleteImage={() =>
                                  onHandleDeleteImage(field.name.toLowerCase().split(' ').join('_'), imageIndex)
                                }
                                deleteIconContainerStyle={styles.deleteIconContainer}
                                imageIndex={imageIndex}
                              />
                            ))}
                        </View>
                      </View>
                    );
                }
              })()}
            </View>
          );
        } else if (field.type === 'textArea') {
          return (
            <View>
              <CustomText text={field.name} style={[styles.label, styles.textAreaLabel]} />
              <TextAreaInputComponent
                key={index}
                style={[styles.textArea, {textAlignVertical: 'top'}]}
                value={formData[field.name.toLowerCase().split(' ').join('_')]}
                onChangeText={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                placeholder={field.name}
                numberOfLines={4}
                fieldName={field.name.toLowerCase().split(' ').join('_')}
                formErrors={formErrors}
                multiline
                maxLength={500}
              />
            </View>
          );
        }
        // else if (field.type === 'textt') {
        //   return <CustomText text={field.name} style={styles.infoText} />;
        // }
        else if (field.type === 'picker') {
          return (
            <View key={index}>
              <CustomText text={field.name} style={styles.label} />
              <DropdownSearchComponent
                selectedValue={formData[field.name.toLowerCase().split(' ').join('_')]}
                onHandleChange={handleInputChange}
                fieldName={field.name.toLowerCase().split(' ').join('_')}
                defaultOption={`Select ${field.name}`}
                labelField={'name'}
                valueField={['Account Type', 'ID TYPE', 'Gender'].includes(field.name) ? 'name' : 'isoCode'}
                pickerOptions={
                  field.name === 'Country'
                    ? countries
                    : field.name === 'State'
                    ? states
                    : // : field.name === 'City'
                    // ? cities
                    field.name === 'Account Type'
                    ? accountType
                    : // : field.name === 'ID Category'
                    // ? govDocuments
                    // field.name === 'ID TYPE'
                    // ? (
                    //     govDocuments.find(category => {
                    //       return category.name === formData.id_category;
                    //     })?.documents || []
                    //   ).map(subcategory => {
                    //     return {
                    //       option: subcategory,
                    //       name: subcategory,
                    //       id: subcategory,
                    //     };
                    //   })
                    // : Above is for canada
                    field.name === 'ID TYPE'
                    ? indiaGovDocs
                    : field.name === 'Gender'
                    ? genderOptions
                    : data
                }
                formErrors={formErrors}
                style={styles.select}
              />
            </View>
          );
        } else if (field.type === 'textOnly') {
          return (
            <View style={styles.textOnlyContainer}>
              <CustomText text="Independent Contractor Agreement" style={[styles.label333, styles.tandcLabel]} />
              <ContractorAgreement />
              {/* <CustomText text={field.name} style={styles.tandc} />
              <CustomText text={field.name2} style={styles.tandc} />
              <CustomText text={field.name3} style={styles.tandc} /> */}
            </View>
          );
        } else if (field.type === 'checkbox') {
          return (
            // <View>
            <View style={styles.row}>
              <CheckBox value={toggleCheckBox} onValueChange={handleCheckBoxClick} />
              <CustomText
                text="By submitting, you accept the terms of the Independent Contractor Agreement"
                style={styles.check}
              />
              <Modal
                visible={isModalVisible3}
                // transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible3(false)}>
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible3(false)}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
                <ContractorAgreement />
              </Modal>
            </View>

            // </View>
          );
        } else if (field.type === 'button') {
          const isSubmitDisabled =
            field.name === 'SUBMIT FOR VERIFICATION' && !formData.i_agree_with_terms_and_conditions;
          <ServiceProviderVerificationModal />;
          return (
            <View>
              {categoryData.category === 'BACKGROUND CHECK' ? (
                <>
                  <View style={styles.selfieLabelContainer}>
                    <CustomText text={'Upload ID'} style={styles.label} />
                    <ExclamationSVG style={styles.exclamationIconStyles} onPress={() => setIsModalVisible2(true)} />
                  </View>
                  <View style={[{flexDirection: 'row', gap: 30}]}>
                    <View>
                      <View style={[{alignItems: 'center'}]}>
                        <CustomTouchableOpacity
                          style={[
                            styles.halfWidth,
                            formErrors.front && styles.inputErrorStyles,
                            frontLoader && styles.disableButtonCam,
                          ]}
                          onPress={() => handleOpenCamera('camera', 'front'.toLowerCase().split(' ').join('_'))}
                          disabled={frontLoader}>
                          {frontLoader ? (
                            <>
                              <ActivityIndicator size="small" color="#ffffff" />
                            </>
                          ) : (
                            <>
                              {renderIcon('FRONT')}
                              <CustomText text={'Front'} style={styles.textWhite} />
                            </>
                          )}
                        </CustomTouchableOpacity>

                        {formData['front'.toLowerCase().split(' ').join('_')] ? (
                          <DeleteCustomImage
                            containerStyle={styles.imageContainer}
                            imgSource={formData['front'.toLowerCase().split(' ').join('_')].toString()}
                            imageStyle={styles.image}
                            handleDeleteImage={() => onHandleDeleteImage('front'.toLowerCase().split(' ').join('_'))}
                            deleteIconContainerStyle={styles.deleteIconContainer}
                          />
                        ) : (
                          ''
                        )}
                      </View>
                    </View>
                    <View>
                      <View style={[{alignItems: 'center'}]}>
                        <CustomTouchableOpacity
                          style={[
                            styles.halfWidth,
                            formErrors.back && styles.inputErrorStyles,
                            backLoader && styles.disableButtonCam,
                          ]}
                          onPress={() => handleOpenCamera('camera', 'back'.toLowerCase().split(' ').join('_'))}>
                          {backLoader ? (
                            <>
                              <ActivityIndicator size="small" color="#ffffff" />
                            </>
                          ) : (
                            <>
                              {renderIcon('BACK')}
                              <CustomText text={'Back'} style={styles.textWhite} />
                            </>
                          )}
                        </CustomTouchableOpacity>

                        {formData['back'.toLowerCase().split(' ').join('_')] ? (
                          <DeleteCustomImage
                            containerStyle={styles.imageContainer}
                            imgSource={formData['back'.toLowerCase().split(' ').join('_')].toString()}
                            imageStyle={styles.image}
                            handleDeleteImage={() => onHandleDeleteImage('back'.toLowerCase().split(' ').join('_'))}
                            deleteIconContainerStyle={styles.deleteIconContainer}
                          />
                        ) : (
                          ''
                        )}
                      </View>
                    </View>
                  </View>
                </>
              ) : null}

              {selectedCategory === 'TERMS AND CONDITIONS' ? (
                <CustomButton
                  key={index}
                  title={field.name}
                  style={[!toggleCheckBox ? styles.disableButton : styles.ActiveButton]}
                  textStyle={styles.textButton}
                  onPress={() => {
                    handleSubmit();
                  }}
                  disabled={!toggleCheckBox}
                />
              ) : (
                <CustomButton
                  key={index}
                  title={'SAVE & NEXT'}
                  style={[styles.saveButton]}
                  textStyle={styles.textButton}
                  onPress={() => {
                    handleCategoriesChange(nextCategory);
                  }}
                />
              )}
            </View>
          );
        }
      });
    }

    // return null;
  };

  const renderIcon = icon => {
    switch (icon) {
      case 'PHOTO': {
        return <CameraIcon width={16} height={16} />;
      }
      case 'FRONT': {
        return <FrontIcon width={16} height={16} />;
      }
      case 'BACK': {
        return <Back width={16} height={16} />;
      }
    }
  };

  const renderSvgIcon = (iconName, width, height, style) => {
    // console.log('categoryData.categories',categoryData.category)

    switch (iconName) {
      case 'PERSONAL':
        return <PersonIconComplete />;
      case 'BANK DETAILS':
        return <BankDetailIconCompleted />;

      case 'BACKGROUND CHECK':
        return <BackGroundCheckCompleted />;

      case 'TERMS AND CONDITIONS':
        return <TCIConInProgress />;
      default:
        return null;
    }
  };

  // const renderText = () => {
  //   if (categories.category === 'BANK DETAILS') {
  //     <CustomText text={'BANK'} />;
  //   }
  // };

  const renderCategoryButtons = () => {
    return (
      <View
        style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', paddingHorizontal: heightToDp(5)}}>
        {categoriesData?.map((categories, index) => (
          <React.Fragment key={index}>
            {/* Category Button */}
            <View style={styles.categoryButtonContainer}>
              <CustomTouchableOpacity
                onPress={() => handleCategoriesChangeonTop(categories.category)}
                style={styles.categoryButton}>
                <View
                  style={{
                    alignItems: 'center',
                    width: index === 3 ? 90 : 80,
                    textAlign: 'center',
                    marginRight: widthToDp(2),
                  }}>
                  {/* Green Tick Icon */}
                  <GreenTickIcon style={{marginBottom: 5, opacity: categories.flag ? 1 : 0}} />

                  {/* Category Icon */}
                  <View style={{marginBottom: 2}}>{renderSvgIcon(categories.category)}</View>

                  {/* Category Text */}
                  {categories.category === 'PERSONAL' && (
                    <CustomText
                      text={'Personal Details'}
                      style={{textAlign: 'center', fontFamily: 'Helvetica', color: '#000000'}}
                    />
                  )}
                  {categories.category === 'BANK DETAILS' && (
                    <CustomText
                      text={'Bank  Details'}
                      style={{textAlign: 'center', fontFamily: 'Helvetica', color: '#000000'}}
                    />
                  )}
                  {categories.category === 'BACKGROUND CHECK' && (
                    <CustomText
                      text={'Government Issued ID'}
                      style={{textAlign: 'center', fontFamily: 'Helvetica', color: '#000000'}}
                    />
                  )}
                  {categories.category === 'TERMS AND CONDITIONS' && (
                    <CustomText
                      text={'Terms And Conditions'}
                      style={{textAlign: 'center', fontFamily: 'Helvetica', color: '#000000'}}
                    />
                  )}
                </View>
              </CustomTouchableOpacity>
            </View>

            {index < categoriesData.length - 1 && (
              <View
                style={{
                  height: 2.5,
                  backgroundColor: categoriesData[index].flag ? 'green' : '#ccc',
                  width: index === 0 ? widthToDp(17) : index === 1 ? widthToDp(16) : widthToDp(13),

                  marginTop: heightToDp(6.2),
                }}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const [cities, setCities] = useState([]);
  const fetchCities = async text => {
    if (text.length > 0) {
      const API_KEY = envConfig.GOOGLE_API_KEY; //to be changed to "envConfig.GOOGLE_API_KEY" once quota problem of API resolved
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&sensor=false&types=(cities)&components=country:CA&key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json(); // Parse the response to JSON
        if (data.status === 'OK') {
          const predictions = data.predictions.map(item => ({
            description: item.structured_formatting.main_text, // Extract only the city name
            place_id: item.place_id,
          }));
          setCities(predictions);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error('Error fetching cities: ', error);
      }
    } else {
      setCities([]); // Clear suggestions if less than 3 characters
    }
  };

  const handleSelectCity = city => {
    handleInputChange('city', city.description); // Update the input with the selected city
    setCities([]); // Clear the suggestions after selecting
  };

  return (
    // <SafeAreaView style={[styles.safeArea]}>
    //   {/* <BackgroundCheckIcon /> */}
    //   <StatusBar barStyle="light-content" />
    //   <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1}}>
    //     <View style={styles.container}>
    //       <View style={styles.header}>
    //         <View style={styles.titleContainer}>
    //           <View style={styles.row}>
    //             <BackIcon onPress={() => navigation.navigate('HomeScreen')} style={styles.backIcon} />
    //             <CustomText text="Background Verification" style={styles.verification} />
    //           </View>

    //           <View style={styles.row}>
    //             <CustomText text="for " style={styles.for} />
    //             <CustomText text="Service Provider" style={styles.sp} />
    //           </View>
    //         </View>

    //         {renderCategoryButtons()}
    //       </View>

    //       <View style={styles.form}>{renderInputsForCategory()}</View>
    //       {showVerificationModal && <ServiceProviderVerificationModal />}
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView style={[styles.safeArea]}>
      {/* <BackgroundCheckIcon /> */}
      <HeaderComponent text={'Identity Verification'} />
      <View style={styles.header}>
        {/* <View style={styles.titleContainer}>
              <View style={styles.row}>
                <BackIcon onPress={() => navigation.navigate('HomeScreen')} style={styles.backIcon} />
                <CustomText text="Background Verification" style={styles.verification} />
              </View>
              <View style={styles.row}>
                <CustomText text="for " style={styles.for} />
                <CustomText text="Service Provider" style={styles.sp} />
              </View>
            </View> */}
        {renderCategoryButtons()}
      </View>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.form}>{renderInputsForCategory()}</View>
          {showVerificationModal && <ServiceProviderVerificationModal />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProviderProfile;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Color.pageBgColor,
    flex: 1,
  },
  container: {
    padding: Padding.p_16,
  },
  containerFade: {
    backgroundColor: Color.pageBgFade,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  titleContainer: {
    marginVertical: Margin.m_10,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#464183',
  },
  disableButtonCam: {
    padding: 12,
  },
  verification: {
    FontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    fontSize: FontSize.size_22,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    justifyContent: 'space-between',
  },
  for: {
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_16,
    fontStyle: 'normal',
    fontWight: '700',
    marginLeft: Margin.m_22,
  },
  sp: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  rowOfIcons: {
    flexDirection: 'row',
    marginTop: Margin.m_10,
    justifyContent: 'space-between',
  },
  iconLabel: {
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    // fontSize: FontSize.size_8,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    // marginLeft: Margin.m_4,
  },
  iconSvg: {
    borderRadius: Border.br_20,
    borderStartColor: '#EFEFEF',
    marginBottom: Margin.m_10,
    backgroundColor: '#EFEFEF',
    // marginLeft: Margin.m_6,
  },
  label: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  textInputStyle: {
    marginTop: Margin.m_8,
  },
  textArea: {
    padding: Padding.p_10,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_sm,
    color: Color.colorSilver,
    marginBottom: Margin.m_10,
  },
  textAreaLabel: {
    marginVertical: Margin.m_8,
  },
  saveButton: {
    width: widthToDp(90),
    padding: Padding.p_16,
    backgroundColor: Color.colorYellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_16,
  },
  disableButton: {
    backgroundColor: 'yellow',
  },
  indigo: {
    width: widthToDp(90),
    padding: Padding.p_16,
    backgroundColor: Color.colorIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_16,
  },
  total: {
    padding: Padding.p_10,
    marginBottom: Margin.m_10,
  },
  half: {
    width: widthToDp(40),
    marginBottom: Margin.m_10,
  },
  roww: {
    flexDirection: 'row',
  },
  totalWidth: {
    width: widthToDp(90),
    padding: Padding.p_14,
    backgroundColor: Color.colorIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_16,
    flexDirection: 'row',
  },
  halfWidth: {
    width: widthToDp(40),
    padding: Padding.p_14,
    backgroundColor: Color.colorIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_16,
    flexDirection: 'row',
  },

  textButton: {
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '700',
    letterSpacing: 0.48,
  },
  textWhite: {
    color: Color.colorWhite,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '700',
    letterSpacing: 0.48,
    paddingHorizontal: Padding.p_5,
  },
  infoText: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_10,
    fontWeight: '700',
  },
  header: {
    borderBottomRightRadius: Border.br_16,
    borderBottomLeftRadius: Border.br_16,
    elevation: 5,
    shadowRadius: 5,
    shadowColor: 'rgba(90, 45, 175, 0.1)',
    width: 360,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#FFF',
  },
  form: {
    marginTop: Margin.m_16,
  },
  textOnlyContainer: {
    marginVertical: Margin.m_8,
  },
  tandc: {
    color: Color.colorBlack,
    textAlign: 'justify',
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_16,
    fontWeight: '300',
    marginBottom: Margin.m_8,
  },
  tandcLabel: {
    textAlign: 'center',
    fontSize: FontSize.size_16,
    marginBottom: Margin.m_10,
  },
  check: {
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_14,
    fontWeight: '700',
    paddingVertical: Padding.p_5,
  },
  categoryButtonContainer: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    // position: 'relative',
  },
  categoryButton: {
    marginBottom: 5,
  },
  iconContainer: {
    backgroundColor: 'transparent',
    borderRadius: widthToDp(6),
    // width: widthToDp(12),
    height: widthToDp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategoryIcon: {
    // borderWidth: Border.br_16,
    borderColor: Color.colorIndigo,
  },
  select: {
    padding: Padding.p_8,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.25,
    elevation: 2,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    marginBottom: Margin.m_10,
  },
  greenTickContainer: {
    paddingBottom: 10,
    bottom: 0,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 4 - 10, // Each image takes one-third of the screen width
    height: Dimensions.get('window').width / 4 - 10, // Height for two rows of images
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '95%',
    height: '95%',
    borderRadius: 5,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: Color.colorRed,
    padding: Padding.p_2,
    borderRadius: Border.br_50,
  },
  flexContainer: {
    flexDirection: 'row', // Updated to column
    backgroundColor: 'DodgerBlue',
    alignItems: 'center', // Optional: Align items in the center horizontally
  },
  flexItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  show: {
    opacity: 0,
  },
  hide: {
    opacity: 1,
  },
  inputErrorStyles: {
    borderColor: Color.colorRed,
    borderWidth: 5,
  },
  backIcon: {marginLeft: Margin.m_10},
  safeArea: {
    backgroundColor: Color.pageBgColor,
    flex: 1,
  },
  container: {
    padding: Padding.p_10,
  },
  containerFade: {
    backgroundColor: Color.pageBgFade,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  titleContainer: {
    marginVertical: Margin.m_10,
  },
  verification: {
    FontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    fontSize: FontSize.size_22,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    justifyContent: 'space-between',
  },
  for: {
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_16,
    fontStyle: 'normal',
    fontWight: '700',
    marginLeft: Margin.m_22,
  },
  sp: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  rowOfIcons: {
    flexDirection: 'row',
    marginTop: Margin.m_10,
    justifyContent: 'space-between',
  },
  iconLabel: {
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    // fontSize: FontSize.size_8,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    // marginLeft: Margin.m_4,
  },
  iconSvg: {
    borderRadius: Border.br_20,
    borderStartColor: '#EFEFEF',
    marginBottom: Margin.m_10,
    backgroundColor: '#EFEFEF',
    // marginLeft: Margin.m_6,
  },
  label: {
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_14,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: Margin.m_6,
  },
  label333: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_16,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: Margin.m_8,
  },
  textInputStyle: {
    marginTop: Margin.m_8,
  },
  textArea: {
    padding: Padding.p_10,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_sm,
    color: Color.colorSilver,
    marginBottom: Margin.m_10,
  },
  textAreaLabel: {
    marginVertical: Margin.m_8,
  },
  saveButton: {
    width: widthToDp(90),
    padding: Padding.p_14,
    backgroundColor: Color.colorIndigo2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_8,
  },
  disableButton: {
    width: widthToDp(90),
    padding: Padding.p_16,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_8,
  },
  ActiveButton: {
    width: widthToDp(90),
    padding: Padding.p_16,
    backgroundColor: Color.colorIndigo2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_8,
  },
  indigo: {
    width: widthToDp(90),
    padding: Padding.p_16,
    backgroundColor: Color.colorIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Margin.m_16,
    borderRadius: Border.br_16,
  },
  total: {
    padding: Padding.p_10,
    marginBottom: Margin.m_10,
  },
  half: {
    width: widthToDp(40),
    marginBottom: Margin.m_10,
  },
  roww: {
    flexDirection: 'row',
  },
  selfieLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: widthToDp(5),
  },
  exclamationIconStyles: {
    marginLeft: widthToDp(1),
    marginTop: widthToDp(-1),
  },
  totalWidth: {
    width: widthToDp(90),
    padding: Padding.p_14,
    backgroundColor: Color.colorIndigo2,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: Margin.m_16,
    borderRadius: Border.br_8,
    flexDirection: 'row',
    marginBottom: widthToDp(2),
  },
  halfWidth: {
    width: widthToDp(40),
    padding: Padding.p_14,
    backgroundColor: Color.colorIndigo2,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: Margin.m_16,
    borderRadius: Border.br_16,
    flexDirection: 'row',
  },

  textButton: {
    color: Color.colorWhite,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: 'bold',
    letterSpacing: 0.48,
  },
  textWhite: {
    color: Color.colorWhite,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '700',
    letterSpacing: 0.48,
    paddingHorizontal: Padding.p_5,
  },
  infoText: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_10,
    fontWeight: '700',
  },
  header: {
    borderBottomRightRadius: Border.br_16,
    borderBottomLeftRadius: Border.br_16,
    elevation: 5,
    shadowRadius: 5,
    shadowColor: 'rgba(90, 45, 175, 0.1)',
    // width: 360,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#FFF',
  },
  form: {
    // marginTop: Margin.m_16,
    borderWidth: 1,
    borderColor: Color.colorSilver,
    padding: Padding.p_10,
    paddingTop: Padding.p_30,
    borderRadius: widthToDp(5),
  },
  textOnlyContainer: {
    // marginVertical: Margin.m_6,
  },
  tandc: {
    color: Color.colorBlack,
    textAlign: 'justify',
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '300',
    marginBottom: Margin.m_8,
  },
  tandcLabel: {
    textAlign: 'center',
    fontSize: FontSize.size_16,
    // marginBottom: Margin.m_10,
  },
  check: {
    color: Color.colorBlack,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_14,
    fontWeight: '700',
    paddingVertical: Padding.p_5,
  },
  // categoryButtonContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   // borderWidth: 1,
  // },
  // categoryButton: {
  //   marginBottom: 5,
  // },
  iconContainer: {
    backgroundColor: 'transparent',
    borderRadius: widthToDp(6),
    // width: widthToDp(12),
    height: widthToDp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategoryIcon: {
    // borderWidth: Border.br_16,
    borderColor: Color.colorIndigo,
  },
  select: {
    padding: Padding.p_8,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    marginBottom: Margin.m_10,
  },
  greenTickContainer: {
    paddingBottom: 10,
    bottom: 0,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 4 - 10, // Each image takes one-third of the screen width
    height: Dimensions.get('window').width / 4 - 10, // Height for two rows of images
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '95%',
    height: '95%',
    borderRadius: 5,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: Color.colorRed,
    padding: Padding.p_2,
    borderRadius: Border.br_50,
  },
  flexContainer: {
    flexDirection: 'row', // Updated to column
    backgroundColor: 'DodgerBlue',
    alignItems: 'center', // Optional: Align items in the center horizontally
  },
  flexItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  show: {
    opacity: 0,
  },
  hide: {
    opacity: 1,
  },
  inputErrorStyles: {
    borderColor: Color.colorRed,
    borderWidth: 5,
  },
  backIcon: {marginLeft: Margin.m_10},
  modalContentContainer: {
    backgroundColor: Color.colorWhite,
    borderRadius: widthToDp(3),
    justifyContent: 'center',
    padding: 15,
  },
  contactUsHeading: {
    color: Color.colorIndigo2,
    fontSize: widthToDp(4),
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  contactUsDesCon: {marginVertical: widthToDp(3)},
  contactUsDesscription: {fontSize: widthToDp(3.4), fontWeight: '700', fontFamily: FontFamily.helvetica},
  contactUsBtn: {
    backgroundColor: Color.colorIndigo2,
    borderRadius: widthToDp(2),
    height: widthToDp(10),
    width: '80%',
    marginBottom: widthToDp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Color.colorWhite,
  },
  dropdownStyle: {
    padding: Padding.p_8,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.25,
    elevation: 2,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_16,
    color: Color.colorSilver,
    borderWidth: 0,
    marginBottom: 15,
  },
  dropDownContainer: {
    borderWidth: 0,
    borderColor: 'red',
  },
  badgeTextStyle: {
    color: '#000', // Style for selected badges text
  },
  errorStyle: {
    borderColor: 'red', // Red border to indicate an error
  },
});
