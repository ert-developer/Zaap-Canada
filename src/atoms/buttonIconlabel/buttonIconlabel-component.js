import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const ButtonIconLabelComponent = ({handlePress, label, children, style, buttonCenterStyle, textStyle}) => {
  return (
    <Pressable style={[styles.twoButton, style]} onPress={handlePress}>
      <View style={[styles.buttonCenter, buttonCenterStyle]}>
        {children}
        <Text style={[styles.textStyle, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  twoButton: {
    height: 70,
    width: 80,
    margin: 10,
    borderRadius: 18,
    padding: 8,
    elevation: 2,
    backgroundColor: '#e8e8e8',
    textAlign: 'center',
  },
  buttonCenter: {
    alignItems: 'center',
  },
  textStyle: {
    color: '#a1a1a1',
    fontWeight: '500',
  },
});

export default ButtonIconLabelComponent;
