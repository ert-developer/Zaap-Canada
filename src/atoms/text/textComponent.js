import React from 'react';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';

const CustomText = props => {
  const {text, style, numberOfLines, ellipsizeMode} = props;
  if ([undefined].includes(text)) {
    return (
      <Text style={{fontWeight: 'bold'}}>
        {text} <ActivityIndicator />
      </Text>
    );
  }

  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 700,
  },
});

export default CustomText;
