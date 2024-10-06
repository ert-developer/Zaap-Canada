import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Color, FontSize, Padding} from '../../assets/static/globalStyles';

const TextInputComponent = ({
  style,
  onChange,
  value,
  placeholder,
  placeholderTextColor,
  editable,
  onSubmitEditing,
  maxLength,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Color.colorSilver}
      editable={editable}
      onSubmitEditing={onSubmitEditing}
      maxLength={maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: Padding.p_10,
    fontSize: FontSize.size_14,
    color: Color.colorBlack,
  },
});

export default TextInputComponent;
