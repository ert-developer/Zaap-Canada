import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CommonOtpInput = ({ handleChange, numberOfInputs, inputStyles, containerStyles }) => {
  const [codes, setCodes] = useState(Array.from({ length: numberOfInputs }, () => ''));
  const inputRefs = useRef(Array.from({ length: numberOfInputs }, () => React.createRef()));

  const handleInput = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    handleChange(newCodes.join(''));

    if (value && index < numberOfInputs - 1) {
      // Move focus to the next input if a digit is entered
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      // Move focus to the previous input if a digit is removed
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {Array.from({ length: numberOfInputs }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={codes[index]}
          onChangeText={(value) => handleInput(index, value)}
          style={[styles.input, inputStyles]}
          maxLength={1}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    gap:20
   
  },
  input: {
    // backgroundColor: '#DEE2E6',
    borderRadius: 5,
    margin: 5,
    width: 60,
    height: 60,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default CommonOtpInput;
