// AsyncStorageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageService = {
  async setItem(key:string, value:string) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('AsyncStorage setItem error:', error);
    }
  },

  async getItem(key:string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('AsyncStorage getItem error:', error);
      return null;
    }
  },

  async removeItem(key:string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage removeItem error:', error);
    }
  },
};

export default AsyncStorageService;
