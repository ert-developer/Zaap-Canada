import React from 'react';
import {Picker} from '@react-native-picker/picker';

const CustomPicker = ({selectedValue, onValueChange, defaultOption, pickerOptions}) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      <Picker.Item label={defaultOption} value="" />
      {pickerOptions?.map(options => {
        const {option, name} = options;
        return (
          <Picker.Item label={option ? option : name} value={option ? option : name} key={options.id || options.name} />
        );
      })}
    </Picker>
  );
};

export default CustomPicker;
