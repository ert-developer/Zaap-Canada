import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MyEarningsDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>!</Text>
        </View>
        <Text style={styles.infoText}>
          Find information about services fee deductions in our FAQ’s located in the Help Center
        </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('FAQ')}>
          <Text style={styles.buttonText}>Check FAQ's</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: Dimensions.get('window').width * 0.8,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFAFB0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#464183',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    backgroundColor: '#464183',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MyEarningsDetails;
