import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async () => await AsyncStorage.getItem('driverData');

const numOnly = (value) => value && `${value}`.replace(/[^0-9.]/g, '');

const numFormat = (value) =>
  value ? numOnly(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : 0;

export const currencyFormat = (value, fixed = 2) =>
  `$${numFormat(parseFloat(value).toFixed(value > 0 ? fixed : 0))}`;
