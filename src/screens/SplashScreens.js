import React, {useState, useEffect} from 'react';
import {View, Animated, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreens = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container}>
      {isLoading && (
        <FastImage
          style={styles.logo}
          source={{
            uri: 'src/assets/SplashScreen.gif',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%', // Adjust the width based on your design
    height: '100%', // Adjust the height based on your design
  },
});

export default SplashScreens;
