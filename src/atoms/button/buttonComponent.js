import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import CustomText from '../text/textComponent';
import {Color} from '../../assets/static/globalStyles';

const CustomButton = props => {
  const {onPress, title, style, textStyle, children, disabled} = props;

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      <CustomText style={[styles.text, textStyle]} text={title || children} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.colorIndigo2,
    
    // padding: 10,
    // borderRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: 'bold',
  },
});

export default CustomButton;
