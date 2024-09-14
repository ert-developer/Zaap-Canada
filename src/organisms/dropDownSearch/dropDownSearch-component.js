import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {FontSize, Border, Padding, Color} from '../../assets/static/globalStyles';

const DropdownSearchComponent = ({
  selectedValue,
  onHandleChange,
  fieldName,
  defaultOption,
  labelField,
  valueField,
  pickerOptions,
  formErrors,
  style,
  disable,
}) => {
  const [value, setValue] = useState(selectedValue);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = text => {
    onHandleChange(fieldName, text[valueField]);
    setValue(text[valueField]);
    setIsFocus(false);
  };

  return (
    <Dropdown
      style={[
        styles.dropdown,
        style,
        isFocus && {borderColor: 'blue'},
        formErrors[fieldName] ? styles.errorContainer : null,
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle}
      data={pickerOptions}
      search
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={!isFocus ? defaultOption : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={handleChange}
      disable={disable}
    />
  );
};

export default DropdownSearchComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 46,
    paddingHorizontal: Padding.p_10,
    color: Color.colorBlack,
  },
  placeholderStyle: {
    fontSize: FontSize.size_14,
  },
  selectedTextStyle: {
    fontSize: FontSize.size_14,
    // fontWeight: 'bold',
    color: Color.colorBlack,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: FontSize.size_14,
  },
  itemTextStyle: {fontSize: FontSize.size_12},
  errorContainer: {
    borderColor: Color.colorRed,
    borderWidth: 1,
    borderRadius: Border.br_8,
  },
});
