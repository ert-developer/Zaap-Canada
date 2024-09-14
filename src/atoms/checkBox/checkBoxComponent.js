import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CustomText from '../text/textComponent';

const CustomCheckBox = props => {
  const {label, value, onValueChange, style} = props;

  return (
    <View>
      <CheckBox value={value} onValueChange={onValueChange} style={[styles.checkbox, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 16, // Set the font size as needed
  },
});

export default CustomCheckBox;
