import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Padding} from '../../assets/static/globalStyles';

const CustomTouchableOpacity = props => {
  const {onPress, style, children} = props;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'lightblue',
    padding: Padding.p_8,
    borderRadius: 5,
  },
});

export default CustomTouchableOpacity;
