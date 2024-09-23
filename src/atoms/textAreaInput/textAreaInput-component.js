import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Color, FontSize} from '../../assets/static/globalStyles';

const TextAreaInputComponent = (
  {
    style,
    onChangeText,
    value,
    placeholder,
    numberOfLines,
    fieldName,
    formErrors,
    maxLength,
    placeholderTextColor,
    fontSize = FontSize.size_14,
    paddingLeft = 10,
    paddingTop = 10,
  },
  props,
) => {
  const errorStyle = formErrors && formErrors[fieldName] ? styles.errorContainer : null;
  return (
    <TextInput
      // style={[style, formErrors[fieldName] && styles.errorContainer]}
      style={[
        style,
        errorStyle,
        {
          color: Color.colorBlack,
          minHeight: numberOfLines * 20,
          fontSize: fontSize,
          textAlignVertical: 'center',
          paddingLeft: paddingLeft, // Adjust left padding
          paddingTop: paddingTop, // Adjust top padding
          textAlignVertical: 'top',
        }, // Ensures text starts from the top}, // Adjust minHeight
      ]}
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
