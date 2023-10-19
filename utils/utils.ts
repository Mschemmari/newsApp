import AsyncStorage from '@react-native-async-storage/async-storage';
import {type Hit} from '../types';

export const getDate = (created_at_i: number) => {
  const date = new Date(created_at_i * 1000);
  const currentDate = new Date();
  const timeDifference = (currentDate.getTime() - date.getTime()) / (1000 * 60);

  return timeDifference < 60
    ? `${Math.floor(timeDifference)} m`
    : `${Math.floor(timeDifference / 60)} h`;
};

export const getSavedData = async (savedData: string) => {
  try {
    const savedItems = await AsyncStorage.getItem(savedData);
    if (savedItems !== null) {
      return JSON.parse(savedItems);
    } else {
      // No data found with the specified key
      console.log('No data found with the specified key.');
    }
  } catch (error) {
    // Error retrieving data
    console.error('Error:', error);
  }
};

export const saveData = async (value: Hit[], key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
