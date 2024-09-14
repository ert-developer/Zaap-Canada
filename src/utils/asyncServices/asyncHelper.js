// AsyncStorageHelper.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAsyncData = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    await callback();
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getAsyncData = async (key, callback) => {
  try {
    const data = await AsyncStorage.getItem(key);
    await callback();

    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

export const removeAsyncData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const getAllKeysAndValues = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const keyValuePairPromises = allKeys.map(async key => {
      const value = await AsyncStorage.getItem(key);
      return {key, value};
    });

    const keyValuePairArray = await Promise.all(keyValuePairPromises);
    return keyValuePairArray;
  } catch (error) {
    console.error('Error getting all keys and values:', error);
    throw error;
  }
};

export const clearAllAsyncData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};
