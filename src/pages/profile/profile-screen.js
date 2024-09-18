import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../atoms/button/buttonComponent';
import CustomImage from '../../atoms/image/imageComponent';
import ProfileStyles from './profile-styles';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import {
  CalenderSVG,
  CameraIcon,
  GalleryIcon,
  LocationSVG,
  PersonSVG,
  ProfilePopupSVG,
  StartSVG,
} from '../../assets/svgImage/profile';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import CustomText from '../../atoms/text/textComponent';
import CustomPicker from '../../atoms/picker/picker-component';
import DeleteCustomImage from '../../organisms/deleteImage/deleteImage-component';
import CustomModelComponent from '../../atoms/model/model-component';
import ButtonIconLabelComponent from '../../atoms/buttonIconlabel/buttonIconlabel-component';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import ButtonIconComponent from '../../atoms/buttonIcon/buttonIcon-component';
import {useSelector} from 'react-redux';
import DropdownSearchComponent from '../../organisms/dropDownSearch/dropDownSearch-component';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputWithIconComponent from '../../organisms/textInputWithIcon/textInputWithIcon-component';
import HeaderComponent from '../../atoms/header/headerComponent';
import JobList from '../../organisms/jobList/jobList';
import {BlueCameraIcon} from '../../assets/svgImage/profile';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {envConfig} from '../../assets/helpers/envApi';

const ProfileScreen = ({
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
  DobChange,
  user,
  DobPicker,
  // handleLogout,
  // datePicker,
  // selectDatePicker,
  // onChangeSelectedDate,
  // toggleDatePicker,
  // showPicker,
  loader,
  customerPreJobsList,
  canadaProvincesOptions,
  updateSuccessPopup,
  onPressOnBackdrop,
  imageLoader,
}) => {
  // const styles = useMemo(() => ProfileStyles(), []);
  const styles = ProfileStyles();
  // console.log('usetDetailsusetDetails', userDetails);
  // console.log('user', user);
  const [selectDatePicker, setSelectDatePicker] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeSelectedDate = selectedDate => {
    // console.log('selectedDateselectedDate', selectedDate);
    toggleDatePicker();
    // Assuming selectedDate is a string in the format '2024-01-22T06:41:00.000Z'
    var selectedDatePickers = selectedDate;

    // Convert the date string to a Date object
    var dateObject = new Date(selectedDatePickers);

    // Get the individual components of the date
    var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    var day = dateObject.getDate().toString().padStart(2, '0');
    var year = dateObject.getFullYear();

    // Format the date as 'MM-DD-YYYY'
    var formattedDate = month + '-' + day + '-' + year;
    updateField('dob', formattedDate);
    setSelectDatePicker(formattedDate);
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const defaultUrl = 'https://lh3.googleusercontent.com/a/ACg8ocIDVDP-KbOdvf5Y1yeFyP-W9X8lvSXwBsM-AqFYsqFq=s96-c';
  const timestamp = formData.dob && formData.dob.seconds ? formData.dob : null;
  const dateFromTimestamp = timestamp ? new Date(timestamp.seconds * 1000) : new Date();

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
    updateField('city', city.description); // Update the input with the selected city
    setCities([]); // Clear the suggestions after selecting
  };

  return (
    <SafeAreaView style={[styles.safeArea, modalVisible && styles.containerFade]}>
      <StatusBar barStyle="light-content" />
      <Modal isVisible={updateSuccessPopup} onBackdropPress={onPressOnBackdrop}>
        <View style={styles.popupContainer}>
          {/* <ProfilePopupSVG /> */}
          <FastImage
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
      <HeaderComponent text={'My Profile'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* <View style={[styles.row, styles.backtNtitle]}>
            <BackIcon onPress={() => navigation.navigate('HomeScreen')} />
            <CustomText style={styles.pageTitle} text="My Profile" />
          </View> */}
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

            <View style={styles.profileContainer}>
              <View style={styles.profileImageCon}>
                {imageLoader ? (
                  <ActivityIndicator size="large" color="red" style={styles.profileImage} /> // Add margin for spacing
                ) : formData.images ? (
                  <CustomImage style={styles.profileImage} source={{uri: formData.images}} />
                ) : (
                  <CustomImage style={styles.profileImage} source={require('../../assets/default-profile.png')} />
                )}
                <View style={styles.cameraIconStyles}>
                  <BlueCameraIcon onPress={() => setModalVisible(true)} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInputWithLabelComponent
              label="Full Name"
              value={formData.name}
              onHandleChange={text => {
                updateField('name', text);
              }}
              field={'name'}
              placeholder={'Full Name'}
              formErrors={formErrors}
            />
          </View>
          {/* {loader && <ActivityIndicator size={30} color={'red'} style={{ justifyContent: 'center', alignItems: 'center' }} />} */}
          <View style={[styles.dobAndGenderCon]}>
            <View style={styles.selectDOB}>
              <Pressable onPress={toggleDatePicker}>
                <TextInputWithIconComponent
                  label={'Date of Birth'}
                  value={formData.dob}
                  onHandleChange={text => updateField('dob', text)}
                  field={'dob'}
                  placeholder={'Select Date'}
                  formErrors={formErrors}
                  editable={false}
                  onPress={toggleDatePicker}
                  icon={<CalenderSVG />}
                />
              </Pressable>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={dateFromTimestamp}
                  // onChange={setDate}
                  maximumDate={maxDate}
                  minimumDate={new Date(1920, 0, 1)}
                  timeZoneOffsetInMinutes={60}
                  timeZoneOffsetInSeconds={3600}
                  onChange={(event, selectedDate) => onChangeSelectedDate(selectedDate)}
                />
              )}
            </View>
            {/* <View style={styles.column}>
              <CustomText text="Gender" style={styles.label} />
              <View style={[styles.input1, styles.inputWrapper, styles.firstPicker]}>
                <DropdownSearchComponent
                  selectedValue={formData.gender ? formData.gender : ''}
                  onHandleChange={(fieldName, value) => handleGenderChange(value)}
                  fieldName="gender"
                  defaultOption={formData.gender ? formData.gender : 'Select Gender'}
                  labelField="label"
                  valueField="value"
                  pickerOptions={genderOptions}
                  formErrors={formErrors}
                />
              </View>
            </View> */}
          </View>
          <View style={styles.inputContainer}>
            <TextInputWithLabelComponent
              label="Phone"
              value={formData.phone}
              onHandleChange={text => updateField('phone', text)}
              field={'phone'}
              placeholder={'Phone Number'}
              formErrors={formErrors}
              labeStyle={styles.label}
              // editable={editMode}
              // selectTextOnFocus={editMode}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInputWithLabelComponent
              label="Email ID"
              value={formData.email}
              onHandleChange={text => updateField('email', text)}
              field={'email'}
              placeholder={'abc@gmail.com'}
              formErrors={formErrors}
              labeStyle={styles.label}
              // editable={false}
              selectTextOnFocus={false}
            />
            {/* <CustomText text="EMAIL " style={styles.label} /> */}
            {/* <CustomText text={user?.email} style={styles.value} /> */}
          </View>
          <View style={styles.inputContainer}>
            <CustomText text="Province" style={styles.provinceText} />
            <View style={[styles.input1, styles.provinceDropDown]}>
              <DropdownSearchComponent
                selectedValue={formData.provinces || ''}
                onHandleChange={(fieldName, value) => handleProvinceChange(value)}
                fieldName="provinces"
                defaultOption={formData.provinces ? formData.provinces : 'Select Province'}
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
              placeholder={'City'}
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

          <View style={{...styles.inputContainer, marginTop: 20}}>
            <CustomText text={'Address'} style={styles.label} />
            <TextAreaInputComponent
              style={{...styles.input, textAlignVertical: 'top'}}
              onChangeText={value => updateField('address', value)}
              value={formData.address}
              placeholder="Address"
              editable
              multiline
              numberOfLines={4}
              fieldName={'address'}
              formErrors={formErrors}
            />
          </View>
          {/* <View style={{...styles.inputContainer, marginTop: 25}}>
            <CustomText text="Bio" style={styles.label} />
            <TextAreaInputComponent
              style={{...styles.input, textAlignVertical: 'top'}}
              onChangeText={text => updateField('bio', text)}
              value={formData.bio}
              placeholder="Enter your Bio"
              multiline
              numberOfLines={4}
              fieldName={'bio'}
              formErrors={formErrors}
              editable
            />
          </View> */}

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const ImageCompo = () => {
  const imageUrl = 'https://lh3.googleusercontent.com/a/ACg8ocIDVDP-KbOdvf5Y1yeFyP-W9X8lvSXwBsM-AqFYsqFq=s96-c';

  return (
    <View style={myStyles.imageContainer1}>
      <Image source={{uri: imageUrl}} style={myStyles.imageStyle} />
    </View>
  );
};

const myStyles = StyleSheet.create({
  imageContainer1: {
    height: 100,
    width: 100,
    borderWidth: 1.8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 4,
    position: 'relative',
    borderColor: 'transparent',
    borderRadius: 70,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 13.5, // Adjust the border radius to match the parent container's borderRadius minus borderWidth
  },
});
