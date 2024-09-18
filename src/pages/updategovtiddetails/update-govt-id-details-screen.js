import {SafeAreaView, ScrollView} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import {View, Pressable} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import updateGovtDetailsStyles from './update-govt-id-details-styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputWithIconComponent from '../../organisms/textInputWithIcon/textInputWithIcon-component';
import {CalenderSVG} from '../../assets/svgImage/profile';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import DeleteCustomImage from '../../organisms/deleteImage/deleteImage-component';
import {CameraIcon, FrontIcon, Back, ExclamationSVG} from '../../assets/svgImage/providerProfile';
import DropdownSearchComponent from '../../organisms/dropDownSearch/dropDownSearch-component';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import CustomModal from '../../molecules/custommodal';
import {RightPopupSVG} from '../../assets/svgIcons/premiumads/premium-ads-screen-svgs';
import {ActivityIndicator} from 'react-native';

const UpdateGovtIdDetailsScreen = ({
  updateGovtIdDetails,
  showDatePicker,
  toggleDatePicker,
  dob,
  onChangeDate,
  handleInputChange,
  formErrors,
  formData,
  handleOpenCamera,
  handleDeleteImage,
  govDocuments,
  toggleIdExpirationDatePicker,
  onIdExpirationDateChange,
  idExpirationDate,
  showIdExpirationPicker,
  onSubmitGovtIdDetails,
  showPopup,
  onClosePopup,
  indiaGovDocs,
  photoLoader,
  frontLoader,
  backLoader,
}) => {
  const styles = updateGovtDetailsStyles();

  const data = []; // Default value for data

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

  const renderGovtDetailsFields = () => {
    return updateGovtIdDetails[0].inputFields.map((field, index) => {
      if (field.type === 'buttonIcon' && field.name === 'PERSONAL PHOTO') {
        return (
          <View key={index}>
            {/* Button to add more images */}
            <View style={styles.selfieLabelContainer}>
              <CustomText text={'Selfie Ph'} style={styles.label} />
              <ExclamationSVG style={styles.exclamationIconStyles} />
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
                      handleDeleteImage(field.name.toLowerCase().split(' ').join('_'), imageIndex)
                    }
                    deleteIconContainerStyle={styles.deleteIconContainer}
                    imageIndex={imageIndex}
                  />
                ))}
            </View>
          </View>
        );
      } else if (field.type === 'date' && field.name === 'Date of Birth') {
        return (
          <View key={index}>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                maximumDate={new Date()}
                minimumDate={new Date(1950, 0, 1)}
                timeZoneOffsetInMinutes={60}
                timeZoneOffsetInSeconds={3600}
                value={new Date()} // Set the initial value for the date
                onChange={(event, selectedDate) => onChangeDate(selectedDate)}
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
              />
            </Pressable>
          </View>
        );
      } else if (field.type === 'picker') {
        return (
          <View key={index}>
            <CustomText text={field.name} style={styles.label} />
            <DropdownSearchComponent
              selectedValue={formData[field.name.toLowerCase().split(' ').join('_')]}
              onHandleChange={handleInputChange}
              fieldName={field.name.toLowerCase().split(' ').join('_')}
              defaultOption={`Select ${field.name}`}
              labelField={'name'}
              valueField={['ID Category', 'ID Type'].includes(field.name) ? 'name' : 'isoCode'}
              pickerOptions={
                field.name === 'ID Category' ? govDocuments : field.name === 'ID Type' ? indiaGovDocs : data
              }
              formErrors={formErrors}
              style={styles.select}
            />
          </View>
        );
      } else if (field.type === 'text') {
        return (
          <View key={index}>
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
      } else if (field.type === 'date' && field.name === 'ID Expiration Date') {
        return (
          <View key={index}>
            {showIdExpirationPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                minimumDate={new Date(1950, 0, 1)}
                timeZoneOffsetInMinutes={60}
                timeZoneOffsetInSeconds={3600}
                value={new Date()} // Set the initial value for the date
                onChange={(event, selectedDate) => onIdExpirationDateChange(selectedDate)}
              />
            )}
            <Pressable onPress={toggleIdExpirationDatePicker}>
              <TextInputWithIconComponent
                label={field.name}
                value={idExpirationDate}
                onHandleChange={text => handleInputChange(field.name.toLowerCase().split(' ').join('_'), text)}
                field={field.name.toLowerCase().split(' ').join('_')}
                placeholder={field.name}
                formErrors={formErrors}
                editable={false}
                icon={<CalenderSVG />}
              />
            </Pressable>
          </View>
        );
      } else if (field.type === 'buttonIcon' && field.name === 'FRONT') {
        return (
          <View key={index}>
            <View style={styles.selfieLabelContainer}>
              <CustomText text={'Upload ID'} style={styles.label} />
              <ExclamationSVG style={styles.exclamationIconStyles} />
            </View>
            <View style={[{flexDirection: 'row', gap: 10}]}>
              <View>
                <View style={[{alignItems: 'center'}]}>
                  <CustomTouchableOpacity
                    style={[styles.halfWidth, formErrors.front && styles.inputErrorStyles]}
                    onPress={() => handleOpenCamera('camera', 'front'.toLowerCase().split(' ').join('_'))}>
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
                      handleDeleteImage={() => handleDeleteImage('front'.toLowerCase().split(' ').join('_'))}
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
                    style={[styles.halfWidth, formErrors.back && styles.inputErrorStyles]}
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
                      handleDeleteImage={() => handleDeleteImage('back'.toLowerCase().split(' ').join('_'))}
                      deleteIconContainerStyle={styles.deleteIconContainer}
                    />
                  ) : (
                    ''
                  )}
                </View>
              </View>
            </View>
          </View>
        );
      }
    });
  };

  return (
    <SafeAreaView>
      <Modal isVisible={showPopup} style={styles.modalContainer} onBackdropPress={onClosePopup}>
        <View style={styles.modalContent}>
          <RightPopupSVG />
          <View style={styles.popupHeadingCon}>
            <CustomText text={'Government ID'} style={styles.popupHeadText} />
            <CustomText text={'Uploaded Successfully!'} style={styles.popupHeadText} />
          </View>
          <CustomText
            text={'Your account will be temporarily on hold until we verify your updated ID.'}
            style={styles.popupDescriptionText}
          />
        </View>
      </Modal>
      <HeaderComponent text={'Update Government ID'} />
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.updateGovtDetailsMainCon}>
          {renderGovtDetailsFields()}
          <TouchableOpacity style={styles.updateBtn} onPress={onSubmitGovtIdDetails}>
            <CustomText text={'UPDATE'} style={styles.updateBtnText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGovtIdDetailsScreen;
