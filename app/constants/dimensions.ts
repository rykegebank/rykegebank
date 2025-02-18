import { Dimensions as dimensions } from 'react-native';

export const windowHeight = dimensions.get('window').height;
export const windowWidth = dimensions.get('window').width;

const Dimensions = {
  windowHeight,
  windowWidth,
  appLogoHeight: 110.00,
  appLogoWidth: 110.00,

  //font
  fontExtraSmall: 9.00,
  fontSmall: 11.00,
  fontDefault: 13,
  fontLarge: 15,
  font16: 16,
  large: 18,
  extraLarge: 20,

  //white space
  space5: 5,
  space10: 10,
  space12: 12,
  space15: 15,
  space16: 16,
  space17: 17,
  space20: 20,
  space25: 25,

  //sizes
  size10: 10,
  size15: 15,
  size20: 20,
  size23: 23,
  size25: 25,
  size30: 30,
  size35: 35,
  size40: 40,
  size45: 45,
  size60: 60,
  size65: 65,
  size80: 80,
};

export default Dimensions;