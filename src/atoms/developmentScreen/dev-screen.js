import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './styles'; // Import the stylesheet

const DevelopmentScreen = ({text}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DevelopmentScreen;
