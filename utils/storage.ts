import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (data: any) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(data));
  } catch (e) {
    console.log('Error saving', e);
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('tasks');
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log('Error reading', e);
    return null;
  }
};
