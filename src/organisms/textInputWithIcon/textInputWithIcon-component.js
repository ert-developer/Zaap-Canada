import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Color, Border, FontSize, Padding, Margin, FontFamily} from '../../assets/static/globalStyles';
import CustomText from '../../atoms/text/textComponent';
// import TextInputIconComponent from '../../atoms/textInputIcon/textInput-icon-component';
import TextInputComponent from '../../atoms/textInput/textInput-component';
import {CalenderSVG} from '../../assets/svgImage/profile';

const TextInputWithIconComponent = ({
  label,
  value,
  onHandleChange,
  field,
  placeholder,
  formErrors,
  firstPicker,
  editable,
  onSubmitEditing,
  icon,
}) => {
  const hasError = formErrors && formErrors[field];
  const inputStyle = hasError ? [styles.input, styles.inputErrorStyles] : [styles.input, firstPicker];
  return (
    <>
      <CustomText text={label} style={styles.label} />
      <View style={inputStyle}>
        <TextInputComponent
          onChange={onHandleChange}
          value={value}
          placeholder={placeholder}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
        />
        <View style={{marginLeft: 'auto', marginRight: 10}}>{icon}</View>
        {/* <CalenderSVG /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 42, // Adjust height as needed
  },
  placeholderTextColor: {
    color: Color.colorSilver,
  },
  inputErrorStyles: {
    borderColor: 'red',
    borderWidth: 1,
  },
  label: {
    color: Color.colorBlack,
    fontWeight: '700',
    fontSize: FontSize.size_14,
    marginBottom: Margin.m_10,
    fontFamily: FontFamily.helvetica,
  },
});
export default TextInputWithIconComponent;
