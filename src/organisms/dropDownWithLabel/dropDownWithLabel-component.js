import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import CustomText from '../../atoms/text/textComponent';

const DropdownWithLabelComponent = ({label, data}, style) => {
  return (
    <View style={style}>
      <CustomText text={label} style={styles.label} />
      <Dropdown
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        style={styles.select}
      />
    </View>
  );
};

export default DropdownWithLabelComponent;

const styles = StyleSheet.create({
  label: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: Margin.m_8,
  },
  select: {
    padding: Padding.p_8,
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
  },
  placeholderTextColor: {
    color: Color.colorSilver,
  },
});
