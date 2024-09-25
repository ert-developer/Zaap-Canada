import React, {useMemo, useCallback, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
  // Modal,
} from 'react-native';
import Modal from 'react-native-modal';
import PostJobStyles from './postJob-styles';
import {AddIcon, CameraIcon, FilledAddIconSVG, GalleryIcon} from '../../assets/svgIcons/postJob/index';
import CustomText from '../../atoms/text/textComponent';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import CustomModelComponent from '../../atoms/model/model-component';
import ButtonIconLabelComponent from '../../atoms/buttonIconlabel/buttonIconlabel-component';
import CustomButton from '../../atoms/button/buttonComponent';
import DeleteCustomImage from '../../organisms/deleteImage/deleteImage-component';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import GooglePlacesInput from '../../organisms/googlePlacesInput/googlePlacesInput-component';
import CardImageListComponent from '../../organisms/cardImageList/cardImageList-component';
import CheckboxListComponent from '../../organisms/checkboxList/checkboxList-component';
import DropDownComponent from '../../organisms/dropDown/dropDown-component';
import DropdownSearchComponent from '../../organisms/dropDownSearch/dropDownSearch-component';
import {JobListCard} from '../../assets/skelton/postJob/index';
import CustomLoader from '../../organisms/customLoader';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import FastImage from 'react-native-fast-image';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import HeaderComponent from '../../atoms/header/headerComponent';
import TextInputWithIconComponent from '../../organisms/textInputWithIcon/textInputWithIcon-component';
import {CalenderSVG, FreeGreenTickSVG, PremiumAdsSVG} from '../../assets/svgImage/profile';
import {PlaceholderClockSVG} from '../../assets/svgImage/clock/clock-svg';
import {Color, FontFamily} from '../../assets/static/globalStyles';
import {envConfig} from '../../assets/helpers/envApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PostJobScreen = ({
  GetFeaturePaymentAmount,
  GetSpotlightPaymentAmount,
  showTags,
  handleTags,
  categories,
  formData,
  formErrors,
  modalVisible,
  setModalVisible,
  advertisementOptions,
  onUploadImage,
  deleteImage,
  handleChange,
  onHandleSubmitJob,
  screenType,
  jobPostScreen,
  exposureValue,
  currentAddress,
  setExposureValue,
  postPaymentMode,
  isPostingJobs,
  isPaymenting,
  toggle,
  isModal,
  closeModal,
  jobModal,
  availableBalance,
  setAvailableBalance,
  adType,
  setAdType,
  usedCheckBox,
  setUsedCheckBox,
  available,
  setAvailable,
  popUps,
  closepopup,
  paymentAmount,
  setPaymentAmount,
  paymentLoader,
  imagesLoader,
  setScreenType,
  loader,
  editablestatus,
  updateJobDetails,
  cancelUpdatedJob,
  // onClosePopup,
}) => {
  // const styles = useMemo(() => PostJobStyles(), []);
  const styles = PostJobStyles();
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [checked, setChecked] = useState(formData.starttime === 'AnyTime');

  const toggleCheckbox = () => {
    setChecked(!checked);
    // Set starttime to "Anytime" when checked

    formData.starttime = !checked ? 'Anytime' : '';
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    onChangeDate(date);
    hideDatePicker();
  };

  const onChangeDate = selectedDate => {
    onChangeDatePicker();
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      handleChange('startdate', formattedDate);
    }
  };

  const onChangeDatePicker = () => {
    setshowDatePicker(!showDatePicker);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = time => {
    const formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    (formData.starttime = formattedTime), hideTimePicker();
  };

  const sortedCategories = categories.slice().sort((a, b) => a.name.localeCompare(b.name));

  const onLocationHandleChange = value => {
    handleChange('location', value);
  };

  const renderItemImages = useCallback(({item, index}) => {
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

  return loader ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={32} />
    </View>
  ) : (
    <>
      {popUps && (
        <Modal isVisible={true} style={styless.modalContainer} onBackdropPress={closepopup}>
          <View style={styless.modalContent}>
            <View style={styless.premiumAdsIcons}>
              {formData.advertisement.type === 'FEATURED' || formData.advertisement.type === 'SPOTLIGHT' ? (
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/Featured.gif')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/Success.gif')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}
            </View>
            <CustomText text={'Congratulations!'} style={styles.congratulationsText} />
            {formData.advertisement.type === 'FEATURED' || formData.advertisement.type === 'SPOTLIGHT' ? (
              <CustomText
                text={`Your ${formData.advertisement.type.toLowerCase()} Ad is now live.`}
                style={styles.adText}
              />
            ) : (
              <CustomText text={'Your Ad is now live.'} style={styles.adText} />
            )}
            <Text style={styless.reviewText}>Review the applicants in your profile</Text>
          </View>
        </Modal>
      )}

      <SafeAreaView style={[styles.safeArea]}>
        <StatusBar barStyle="light-content" />
        <HeaderComponent text={'Post Your Ad'} setScreenType={setScreenType} screenType={screenType} />
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            {/* <CustomText text={`POST YOUR AD${screenType === 'job-form' ? '(1/2)' : '(2/2)'}`} style={styles.pageTitle} /> */}
            {screenType === 'job-form' ? (
              <View>
                {/* JOB TITLE */}
                <View style={styles.inputContainer}>
                  <TextInputWithLabelComponent
                    label={'Title'}
                    value={formData.jobTitle}
                    onHandleChange={text => handleChange('jobTitle', text)}
                    field={'jobTitle'}
                    placeholder={'Looking for... or Wanted....'}
                    formErrors={formErrors}
                    maxLength={50}
                    // firstPicker={{color: '#000'}}
                  />
                  <CustomText text={`${50 - formData.jobTitle.length} Characters left`} style={styles.charLeftText} />
                </View>
                {/* JOB CATEGORY & SUB CATEGORY */}
                <View style={[styles.row, styles.inputContainer]}>
                  <View style={styles.column}>
                    <CustomText text={'Category'} style={styles.label} />
                    <View style={[styles.input, styles.inputWrapper, styles.firstPicker]}>
                      <DropdownSearchComponent
                        selectedValue={`${formData.categories}`}
                        onHandleChange={handleChange}
                        fieldName={'categories'}
                        defaultOption={'Category'}
                        labelField={'name'}
                        valueField={'name'}
                        pickerOptions={sortedCategories}
                        formErrors={formErrors}
                      />
                    </View>
                  </View>

                  <View style={styles.column}>
                    <CustomText text={'Subcategory'} style={styles.label} />
                    <View style={[styles.input, styles.inputWrapper]}>
                      <DropdownSearchComponent
                        selectedValue={formData.subCategory}
                        onHandleChange={handleChange}
                        fieldName={'subCategory'}
                        defaultOption={'Sub-Category'}
                        labelField={'name'}
                        valueField={'name'}
                        pickerOptions={(
                          categories.find(category => category.name === formData.categories)?.SubCategories || []
                        )
                          .slice() // Create a copy of the array
                          .sort((a, b) => a.localeCompare(b)) // Sort the subcategories alphabetically
                          .map(subcategory => ({
                            option: subcategory,
                            name: subcategory,
                            id: subcategory,
                          }))}
                        formErrors={formErrors}
                      />
                    </View>
                  </View>
                </View>

                {/* Salary & Phone Number */}
                <View style={[styles.row, styles.inputContainer]}>
                  <View style={styles.column}>
                    <TextInputWithLabelComponent
                      label={'Budget'}
                      value={formData.salary.toString()}
                      onHandleChange={text => handleChange('salary', text)}
                      field={'salary'}
                      placeholder={'eg: $100'}
                      formErrors={formErrors}
                      firstPicker={styles.firstPicker}
                    />
                  </View>

                  <View style={styles.column}>
                    <TextInputWithLabelComponent
                      label={'Phone Number'}
                      value={formData.phone}
                      onHandleChange={text => handleChange('phone', text)}
                      field={'phone'}
                      placeholder={'+1'}
                      formErrors={formErrors}
                    />
                  </View>
                </View>

                {/* Date */}

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: '51%'}}>
                    <Pressable onPress={showDatePicker1}>
                      <TextInputWithIconComponent
                        label={'Date'}
                        editable={false}
                        placeholder={'Select Date'}
                        value={formData.startdate}
                        placeholderTextColor={Color.colorSilver}
                        firstPicker={styles.firstPicker}
                        field={'startdate'}
                        formErrors={formErrors}
                        icon={<CalenderSVG />}
                      />
                    </Pressable>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirmDate}
                      onCancel={hideDatePicker}
                      minimumDate={new Date()}
                    />
                  </View>

                  <View style={{width: '51%'}}>
                    <Pressable onPress={checked ? null : showTimePicker} style={{flex: 1}}>
                      <TextInputWithIconComponent
                        label={'Time'}
                        editable={false}
                        placeholder={'Select Time'}
                        value={formData.starttime}
                        firstPicker={styles.firstPicker}
                        formErrors={formErrors}
                        field={'starttime'}
                        placeholderTextColor={Color.colorSilver}
                        icon={<PlaceholderClockSVG />}
                      />

                      <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        is24Hour={false}
                      />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.checkboxContainer}>
                  <CustomText text="Anytime" style={styles.checkboxLabel} />
                  <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
                    <Icon
                      name={checked ? 'check-box' : 'check-box-outline-blank'}
                      size={24} // Adjust size as needed
                      color={checked ? '#007AFF' : '#B0B0B0'} // Adjust colors as needed
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <CustomText text={'Location'} style={styles.label} />
                  <GooglePlacesInput
                    value={formData.location}
                    onHandleChange={onLocationHandleChange}
                    field={'location'}
                    placeholder={'Enter Address'}
                    formErrors={formErrors}
                  />
                </View>
                {/* AREA */}
                <View style={styles.inputContainer}>
                  <CustomText text={'Area'} style={styles.label} />
                  <GooglePlacesInput
                    value={formData.area}
                    // onHandleChange={text => handleChange('area', text.location)}
                    onHandleChange={text => handleChange('area', text.location)}
                    field={'area'}
                    placeholder={'Enter Area'}
                    formErrors={formErrors}
                  />
                </View>
                <View style={styles.column}>
                  <CustomText text={'Address'} style={styles.label} />
                  <TextAreaInputComponent
                    style={{...styles.input, textAlignVertical: 'top'}}
                    onChangeText={value => handleChange('address', value)}
                    value={formData.address}
                    placeholder={'Enter Address'}
                    placeholderTextColor={'silver'}
                    editable
                    multiline
                    numberOfLines={4}
                    fieldName={'address'}
                    formErrors={formErrors}
                    maxLength={200}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <CustomText text={'Description'} style={styles.label} />
                  <TextAreaInputComponent
                    style={{...styles.input, textAlignVertical: 'top'}}
                    onChangeText={value => handleChange('description', value)}
                    value={formData.description}
                    placeholder={'Give complete information of job'}
                    placeholderTextColor={'silver'}
                    editable
                    multiline
                    numberOfLines={10}
                    fieldName={'description'}
                    formErrors={formErrors}
                    maxLength={3000}
                  />
                  <CustomText
                    text={`${3000 - formData.description.length} Characters left`}
                    style={{...styles.charLeftText, marginTop: 10}}
                  />
                </View>

                <View styles={styles.row}>
                  <CustomModelComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <CustomText text={'Upload Photo'} style={styles.selectPhotoTitle} />
                        <View style={styles.row}>
                          <ButtonIconLabelComponent handlePress={() => onUploadImage('camera')} label={'Camera'}>
                            <CameraIcon width="35px" height="35px" />
                          </ButtonIconLabelComponent>

                          <ButtonIconLabelComponent handlePress={() => onUploadImage('gallery')} label={'gallery'}>
                            <GalleryIcon width="35px" height="35px" />
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
                  <FlatList
                    data={formData.images}
                    renderItem={renderItemImages}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    contentContainerStyle={styles.grid}
                    extraData={imagesLoader} // Trigger re-render when imagesLoader state changes
                  />

                  {/* <CustomButton style={styles.addPhotoButton} onPress={() => setModalVisible(true)}> */}
                  <TouchableOpacity
                    style={[
                      styles.addPhotoButton,
                      imagesLoader && styles.disabledButton, // Optional style when loading
                    ]}
                    onPress={() => !imagesLoader && setModalVisible(true)} // Disable button if loading
                    disabled={imagesLoader} // Disable interaction
                  >
                    {imagesLoader ? (
                      <ActivityIndicator size="small" color="#ffffff" /> // Add margin for spacing
                    ) : (
                      <>
                        <FilledAddIconSVG style={styles.icon} />
                        <CustomText text={'Add Photos'} style={styles.addPhotosText} />
                      </>
                    )}
                  </TouchableOpacity>

                  {/* <View style={styles.icon}>
                      <FilledAddIconSVG style={styles.addIcon} />
                    </View>
                    <CustomText text={'Add Photos'} style={styles.addPhotosText} /> */}
                  {/* </CustomButton> */}
                </View>
              </View>
            ) : screenType === 'preview-form' ? (
              <View>
                {isPostingJobs | isPaymenting ? (
                  <JobListCard />
                ) : (
                  <>
                    <CardImageListComponent formData={formData} jobPostScreen={jobPostScreen} />

                    <View style={[styles.row, styles.inputContainer]}>
                      <View style={styles.column}>
                        <CustomText text={'Make your Ad Premium (Optional)'} style={styles.label} />
                        <CheckboxListComponent
                          setExposureValue={setExposureValue}
                          exposureValue={exposureValue}
                          postPaymentMode={postPaymentMode}
                        />
                        {/* <View style={styles.tagContainer}>
                          <FlatList
                            data={showTags}
                            renderItem={renderTags}
                            keyExtractor={(item, index) => index.toString()}
                          />
                        </View> */}

                        {exposureValue === 'paid' ? (
                          <>
                            <DropDownComponent
                              data={advertisementOptions}
                              handleChange={handleChange}
                              formData={formData}
                              formErrors={formErrors}
                              GetFeaturePaymentAmount={GetFeaturePaymentAmount}
                              GetSpotlightPaymentAmount={GetSpotlightPaymentAmount}
                              adType={adType}
                              setAdType={setAdType}
                              usedCheckBox={usedCheckBox}
                              setUsedCheckBox={setUsedCheckBox}
                              setAvailable={setAvailable}
                              available={available}
                              setPaymentAmount={setPaymentAmount}
                              paymentAmount={paymentAmount}
                              // handleTags={handleTags}
                            />
                            {/* <View style={styles.amountButtonCon}>
                              <TouchableOpacity style={styles.balanceBtn}>
                                <CustomText
                                  text={'AVAILABLE BALANCE'}
                                  onPress={setAvailableBalance('AVAILABLE BALANCE')}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.balanceBtn} onPress={setAvailableBalance('BUY')}>
                                <CustomText text={'BUY'} />
                              </TouchableOpacity>
                            </View> */}
                          </>
                        ) : null}

                        {/* <DropDownComponent
                          data={advertisementOptions}
                          handleChange={handleChange}
                          formData={formData}
                          formErrors={formErrors}
                          GetFeaturePaymentAmount={GetFeaturePaymentAmount}
                          // handleTags={handleTags}
                          // style={styles.premiumAdInput}
                        /> */}
                      </View>
                    </View>
                  </>
                )}
              </View>
            ) : null}
            {editablestatus.editJobStatus === true ? (
              <View style={styles.updateBtnContainer}>
                <CustomButton
                  title={'Cancel'}
                  style={styles.cancelBtn}
                  textStyle={styles.nextText}
                  onPress={() => cancelUpdatedJob()}
                />
                <CustomButton
                  title={'Update'}
                  style={styles.updateBtn}
                  textStyle={styles.nextText}
                  onPress={() => updateJobDetails(editablestatus.jobId)}
                />
              </View>
            ) : (
              <View style={[styles.row]}>
                {screenType === 'preview-form' ? (
                  isPostingJobs | isPaymenting ? (
                    <CustomLoader visible={isPostingJobs} />
                  ) : available === 'AVAILABLE' && usedCheckBox === true ? (
                    <CustomButton
                      title={'Use & Submit Ad'}
                      style={styles.nextButton}
                      textStyle={styles.nextText}
                      // onPress={() => onHandleSubmitJob(formData.advertisement.pay > 0 ? true : false)}
                      onPress={() => onHandleSubmitJob('used')}
                    />
                  ) : (
                    <CustomButton
                      title={
                        formData.advertisement.pay > 0 ? (
                          paymentLoader ? (
                            <ActivityIndicator
                              size={30}
                              color={'white'}
                              style={{justifyContent: 'center', alignItems: 'center'}}
                            />
                          ) : (
                            'Pay & Submit Ad'
                          )
                        ) : (
                          'Submit Ad'
                        )
                      }
                      // onPress={() => onHandleSubmitJob(formData.advertisement.pay > 0 ? false : true)}
                      onPress={() => onHandleSubmitJob(true)}
                      style={styles.nextButton}
                      textStyle={styles.nextText}
                    />
                  )
                ) : (
                  <CustomButton
                    title={'Next'}
                    onPress={() => onHandleSubmitJob(false)}
                    style={styles.nextButton}
                    textStyle={styles.nextText}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PostJobScreen;

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: heightToDp(2),
    alignItems: 'center',
    width: widthToDp(83),
    height: heightToDp(30),
    justifyContent: 'center',
    elevation: 5,
  },
  premiumAdsIcons: {
    marginVertical: widthToDp(1),
  },
  reviewText: {
    marginTop: widthToDp(4),
    fontFamily: 'Roboto',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
});
