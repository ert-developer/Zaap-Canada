import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Color} from '../../assets/static/globalStyles';

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={Color.colorIndigo2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
