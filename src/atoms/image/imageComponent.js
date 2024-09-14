import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const CustomImage = props => {
  const {source, style} = props;

  return (
    // <View>
    <Image source={source} style={[styles.image, style]} />
    // </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  // },
  image: {
    width: 100, // Set the default width as needed
    height: 100, // Set the default height as needed
  },
});

export default CustomImage;
