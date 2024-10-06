import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const CustomTextInput = props => {
  const {placeholder, value, onChangeText, style, maxLength} = props;

  return (
    // <View>
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      maxLength={maxLength}
      placeholderTextColor={Color.colorSilver}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    width: widthToDp(20),
    height: widthToDp(15),
    borderColor: Color.colorSilver,
    borderWidth: 1,
  },
});

export default CustomTextInput;
