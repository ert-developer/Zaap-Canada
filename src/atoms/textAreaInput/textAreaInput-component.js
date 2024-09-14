import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Color} from '../../assets/static/globalStyles';

const TextAreaInputComponent = (
  {style, onChangeText, value, placeholder, numberOfLines, fieldName, formErrors, maxLength, placeholderTextColor},
  props,
) => {
  const errorStyle = formErrors && formErrors[fieldName] ? styles.errorContainer : null;
  return (
    <TextInput
      // style={[style, formErrors[fieldName] && styles.errorContainer]}
      style={[style, errorStyle, {color: Color.colorBlack}]}
      onChangeText={onChangeText}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      numberOfLines={numberOfLines}
      placeholderTextColor={placeholderTextColor}
      multiline={true}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
export default TextAreaInputComponent;
