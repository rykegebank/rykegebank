import AsyncStorage from '@react-native-async-storage/async-storage';

const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem('access_token', token);
    console.log('Access token saved successfully');
  } catch (error) {
    console.error('Failed to save access token', error);
  }
};

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (token !== null) {
      console.log('Access token retrieved successfully');
      return token;
    } else {
      console.log('No access token found');
      return null;
    }
  } catch (error) {
    console.error('Failed to get access token', error);
    return null;
  }
};

const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    console.log('Access token removed successfully');
  } catch (error) {
    console.error('Failed to remove access token', error);
  }
};


const insertData = async (key, value) => {
  try {
    const stringifiedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const fetchData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value.startsWith('{') || value.startsWith('[') ? JSON.parse(value) : value;
    }
    return null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};




export { setAccessToken, getAccessToken, removeAccessToken, insertData, removeData, fetchData };
