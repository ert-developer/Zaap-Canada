import {StyleSheet} from 'react-native';
import React from 'react';
import {Color, Border, FontSize, Padding, Margin, FontFamily} from '../../assets/static/globalStyles';
import CustomText from '../../atoms/text/textComponent';
import TextInputComponent from '../../atoms/textInput/textInput-component';

const TextInputWithLabelComponent = ({
  label,
  value,
  onHandleChange,
  field,
  placeholder,
  formErrors,
  firstPicker,
  editable,
  onSubmitEditing,
  maxLength,
}) => {
  const hasError = formErrors && formErrors[field];
  const inputStyle = hasError ? [styles.input, styles.inputErrorStyles] : [styles.input, firstPicker];
  return (
    <>
      <CustomText text={label} style={styles.label} />
      <TextInputComponent
        style={[inputStyle, !editable && styles.disabledStyle, {color: Color.colorBlack}]}
        onChange={onHandleChange}
        value={value}
        placeholder={placeholder}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={Color.colorSilver}
        maxLength={maxLength} // Ensures the placeholder text color remains consistent
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
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
    color: Color.colorBlack,
    marginBottom: Margin.m_10,
    height: 42,
    paddingVertical: 10,
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
    letterSpacing: 1.2,
  },
  disabledStyle: {
    padding: Padding.p_10,
    shadowColor: Color.colorBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    elevation: 2,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8,
    fontSize: FontSize.size_sm,
    color: Color.colorSilver,
    marginBottom: Margin.m_10,
  },
});

export default TextInputWithLabelComponent;
