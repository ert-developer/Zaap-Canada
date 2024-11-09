import React, {useCallback, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../atoms/button/buttonComponent';
import CustomImage from '../../atoms/image/imageComponent';
import {BlueCameraIcon, CameraIcon, GalleryIcon} from '../../assets/svgImage/profile';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import CustomText from '../../atoms/text/textComponent';
import DeleteCustomImage from '../../organisms/deleteImage/deleteImage-component';
import CustomModelComponent from '../../atoms/model/model-component';
import ButtonIconLabelComponent from '../../atoms/buttonIconlabel/buttonIconlabel-component';
import DropdownSearchComponent from '../../organisms/dropDownSearch/dropDownSearch-component';
import ServiceProviderProfileStyles from './service-provider-profile-styles';
import HeaderComponent from '../../atoms/header/headerComponent';
import {Color} from '../../assets/static/globalStyles';
import {SmallExclamationSVG} from '../../assets/svgImage/providerProfile';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import {envConfig} from '../../assets/helpers/envApi';

const SeriveProviderProfileScreen = ({
  formData,
  saveProfile,
  updateField,
  modalVisible,
  setModalVisible,
  uploadImage,
  formErrors,
  navigation,
  editMode,
  setEditMode,
  genderOptions,
  handleGenderChange,
  handleProvinceChange,
  user,
  loader,
  updateSuccessPopup,
  onPressOnBackdrop,
  serviceProviderDetails,
  canadaProvincesOptions,
  tooltipVisible,
  setTooltipVisible,
  imageLoader,
}) => {
  // const styles = useMemo(() => ServiceProviderProfileStyles(), []);
  const styles = ServiceProviderProfileStyles();

  // const [text, setText] = useState('');
  // const [enteredTexts, setEnteredTexts] = useState(formData.languagesKnown ? formData.languagesKnown : []);

  // const handleTextChange = inputText => {
  //   setText(inputText);
  // };

  // const handleAddText = () => {
  //   if (text.trim() !== '') {
  //     const updatedTexts = [...enteredTexts, text];
  //     setEnteredTexts(updatedTexts);
  //     setText('');
  //     updateField('languagesKnown', updatedTexts); // Update the field here with the latest texts
  //   }
  // };

  // const handleDeleteText = index => {
  //   const updatedTexts = [...enteredTexts];
  //   updatedTexts.splice(index, 1);
  //   setEnteredTexts(updatedTexts);
  //   updateField('languagesKnown', updatedTexts); // Update the field here with the latest texts
  // };

  // const handleDeleteText = index => {
  //   const updatedLanguages = [...selectedLanguages];
  //   updatedLanguages.splice(index, 1);
  //   setSelectedLanguages(updatedLanguages);
  //   updateField('languagesKnown', updatedLanguages); // Update the field here with the latest texts
  // };

  // const handleTextInputSubmit = () => {
  //   handleAddText();
  // };

  const [open, setOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(formData.languagesKnown || []);
  const [items, setItems] = useState(
    [
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
      {label: 'Bengali', value: 'Bengali'},
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
      {label: 'Innu', value: 'Innu'},
      {label: "Mi'kmaq", value: 'Mikmaq'},
      {label: 'Pashto', value: 'Pashto'},
      {label: 'Japanese', value: 'Japanese'},
      {label: 'Burmese', value: 'Burmese'},
      {label: 'Malay', value: 'Malay'},
      {label: 'Thai', value: 'Thai'},
      {label: 'Swahili', value: 'Swahili'},
      {label: 'Armenian', value: 'Armenian'},
      {label: 'Lithuanian', value: 'Lithuanian'},
      {label: 'Hungarian', value: 'Hungarian'},
      {label: 'Finnish', value: 'Finnish'},
      {label: 'Norwegian', value: 'Norwegian'},
      {label: 'Icelandic', value: 'Icelandic'},
      {label: 'Swedish', value: 'Swedish'},
      {label: 'Danish', value: 'Danish'},
      {label: 'Czech', value: 'Czech'},
      {label: 'Bulgarian', value: 'Bulgarian'},
      {label: 'Irish', value: 'Irish'},
      {label: 'Welsh', value: 'Welsh'},
      {label: 'Estonian', value: 'Estonian'},
    ].sort((a, b) => a.label.localeCompare(b.label)),
  );

  const renderItem = useCallback(({item, index}) => {
    return (
      <DeleteCustomImage
        containerStyle={styles.imageContainer}
        imgSource={item.toString()}
        imageStyle={styles.image}
        handleDeleteImage={() => deleteImage(index)}
        deleteIconContainerStyle={styles.deleteIconContainer}
      />
    );
  }, []);

  const [cities, setCities] = useState([]);
  const fetchCities = async text => {
    if (text.length > 0) {
      const API_KEY = envConfig.GOOGLE_API_KEY; //to be changed to "envConfig.GOOGLE_API_KEY" once quota problem of API resolved
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&sensor=false&types=(cities)&components=country:CA&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json(); // Parse the response to JSON
        console.log(data, text);
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
    updateField('city', city.description); // Update the input with the selected city
    setCities([]); // Clear the suggestions after selecting
  };

  return (
    <SafeAreaView style={[styles.safeArea, modalVisible && styles.containerFade]}>
      <StatusBar barStyle="light-content" />
      <HeaderComponent text={'My Profile'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <>
            <View styles={styles.row}>
              <CustomModelComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <CustomText text={'Upload Photo'} style={styles.selectPhotoTitle} />
                    <View style={styles.row}>
                      <ButtonIconLabelComponent handlePress={() => uploadImage('camera')} label={'Camera'}>
                        <CameraIcon width="35" height="35" />
                      </ButtonIconLabelComponent>
                      <ButtonIconLabelComponent handlePress={() => uploadImage('gallery')} label={'gallery'}>
                        <GalleryIcon width="35" height="35" />
                      </ButtonIconLabelComponent>
                    </View>
                    <CustomButton
                      title="Cancel"
                      onPress={() => setModalVisible(!modalVisible)}
                      style={styles.cancelButton}
                      textStyle={styles.cancelTextStyle}
                    />
                  </View>
                </View>
              </CustomModelComponent>
              {/* To Display the job post images */}
              <View style={styles.profileContainer}>
                <View style={styles.profileImageCon}>
                  {imageLoader ? (
                    <ActivityIndicator size="large" color="red" style={styles.profileImage} /> // Add margin for spacing
                  ) : (
                    <CustomImage style={styles.profileImage} source={{uri: formData.images}} />
                  )}

                  <View style={styles.cameraIconStyles}>
                    <BlueCameraIcon onPress={() => setModalVisible(true)} />
                  </View>
                </View>
                {tooltipVisible && (
                  <View style={styles.exclamationStyles}>
                    <View style={styles.exclamationIcon}>
                      <SmallExclamationSVG />
                    </View>

                    <View style={styles.tooltipTextContainer}>
                      <CustomText style={styles.tooltipText} text={'For any chanes'} />
                      <CustomText style={styles.tooltipText} text={'contact customer care'} />
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.inputContainer} onTouchEnd={() => setTooltipVisible(!tooltipVisible)}>
              <TextInputWithLabelComponent
                label="Full Name"
                value={formData.name}
                field={'name'}
                placeholder={'Full Name'}
                formErrors={formErrors}
                labeStyle={styles.label}
                editable={false}
                selectTextOnFocus={false}
                style={styles.disabledStyle}
              />
            </View>
            <View style={[styles.dobAndGenderCon]}>
              <View
                style={[styles.donAndInputContainer, {marginRight: 14}]}
                onTouchEnd={() => setTooltipVisible(!tooltipVisible)}>
                <TextInputWithLabelComponent
                  label="Date of Birth"
                  value={formData.dob}
                  input={styles.disableTextColor}
                  placeholder={'Date of Birth'}
                  formErrors={formErrors}
                  labeStyle={styles.label}
                  editable={false}
                  style={styles.disabledStyle}
                />
              </View>

              <View style={styles.column} onTouchEnd={() => setTooltipVisible(!tooltipVisible)}>
                <CustomText text="Gender" style={styles.label} />
                <View style={[styles.input1, styles.inputWrapper, styles.firstPicker]}>
                  <DropdownSearchComponent
                    selectedValue={formData.gender}
                    onHandleChange={(fieldName, value) => handleGenderChange(value)}
                    fieldName="gender"
                    defaultOption="Select Gender"
                    labelField="label"
                    valueField="value"
                    pickerOptions={genderOptions}
                    formErrors={formErrors}
                    disable={true}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInputWithLabelComponent
                label="Phone Number"
                value={formData.phone}
                onHandleChange={text => updateField('phone', text)}
                field={'phone'}
                placeholder={'Edit Phone number'}
                formErrors={formErrors}
                labeStyle={styles.label}
                editable
              />
            </View>
            <View style={styles.inputContainer} onTouchEnd={() => setTooltipVisible(!tooltipVisible)}>
              <TextInputWithLabelComponent
                label="Email ID"
                value={formData.email}
                placeholder={'abc@gmail.com'}
                formErrors={formErrors}
                labeStyle={styles.label}
                editable={false}
                style={styles.disabledStyle}
                selectTextOnFocus={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomText text="State" style={styles.label} />
              <View style={[styles.input1, styles.provinceDropDown]}>
                <DropdownSearchComponent
                  selectedValue={`${formData.state}` || 'Select State'}
                  onHandleChange={(fieldName, value) => handleProvinceChange(value)}
                  fieldName="state"
                  defaultOption="Select State"
                  labelField="label"
                  valueField="value"
                  pickerOptions={canadaProvincesOptions}
                  formErrors={formErrors}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInputWithLabelComponent
                label="City"
                value={formData.city}
                onHandleChange={text => {
                  updateField('city', text);
                  fetchCities(text);
                }}
                field={'city'}
                placeholder={'Update your City'}
                formErrors={formErrors}
                labeStyle={styles.label}
                // editable={false}
                // selectTextOnFocus={false}
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
            <View style={styles.inputContainer}>
              <CustomText text={'Address'} style={styles.label} />
              <TextAreaInputComponent
                style={{...styles.input, textAlignVertical: 'top'}}
                onChangeText={value => updateField('address', value)}
                value={formData.address}
                placeholder="Update your address"
                editable
                multiline
                numberOfLines={4}
                fieldName={'address'}
                formErrors={formErrors}
                maxLength={300}
                placeholderTextColor={'silver'}
              />
            </View>
            <View>
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
                  formData.languagesKnown = value; // Update formData with selected languages
                }}
                placeholder="Select languages"
                mode="BADGE" // Display selected languages as badges
                badgeTextStyle={styles.badgeTextStyle} // Custom text style
                tickIconStyle={{tintColor: Color.colorIndigo}} // Change the color of the tick for selected languages
                style={[
                  styles.dropdownStyle,
                  formErrors.languagesKnown ? styles.errorStyle : null, // Apply error style if there are formErrors
                ]} // Custom dropdown border style
                dropDownContainerStyle={styles.dropDownContainer} // Style for the dropdown container
                listMode="MODAL"
                maxHeight={250}
              />
            </View>

            <View style={styles.inputContainer}>
              <CustomText text={'Professional Bio'} style={styles.label} />
              <TextAreaInputComponent
                style={{...styles.input, textAlignVertical: 'top'}}
                onChangeText={value => updateField('professionBio', value)}
                value={formData.professionBio}
                placeholder="Update your Professional expertise"
                editable
                multiline
                numberOfLines={4}
                fieldName={'address'}
                formErrors={formErrors}
                maxLength={500}
                placeholderTextColor={'silver'}
              />
              <CustomText
                text={`${500 - formData.professionBio.toString().length} Characters left`}
                style={styles.charLeftText}
              />
            </View>

            <View style={[styles.row1]}>
              <CustomButton
                title={
                  loader ? (
                    <ActivityIndicator
                      size={30}
                      color={'white'}
                      style={{justifyContent: 'center', alignItems: 'center'}}
                    />
                  ) : (
                    'UPDATE'
                  )
                }
                onPress={saveProfile}
                style={styles.nextButton}
                textStyle={styles.nextText}
              />
            </View>
          </>
          <Modal isVisible={updateSuccessPopup} onBackdropPress={onPressOnBackdrop}>
            <View style={styles.popupContainer}>
              {/* <ProfilePopupSVG /> */}
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/Profileupdatesuccess.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View>
                <CustomText text={'Your profile has been'} style={styles.popupText} />
                <CustomText text={'updated successfully.'} style={styles.popupText} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeriveProviderProfileScreen;

const ImageCompo = () => {
  const imageUrl = 'https://lh3.googleusercontent.com/a/ACg8ocKTuf6cWezS-DHewWMfqdXVpesO7HJOhlhgtPSyhopaoO0Y=s96-c';

  return (
    <View style={styles.imageContainer1}>
      <Image source={{uri: imageUrl}} style={styles.imageStyle} />
    </View>
  );
};
